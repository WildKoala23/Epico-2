const request = require('supertest');
const assert = require('assert');
const sinon = require('sinon');
const app = require('../index');
const User = require('../models/userModel');
const App = require('../models/appModel'); 
const { generateToken } = require('../middleware/authMiddleware');

describe('GET /app', () => {
    let token;

    // Before all tests, get a valid token for authentication
    before(async () => {
        const user = await User.findByPk(1);
        token = await generateToken(user);
    });

    // After each test, restore any Sinon stubs to their original behavior
    afterEach(() => {
        sinon.restore();
    });

    it("Test 1: DB call succeeds (then path)", async () => {
        // Make an authenticated GET request to /app
        const res = await request(app)
            .get('/app')
            .set('Authorization', `Bearer ${token}`);

        // Assert that the status is 200 (OK)
        assert.strictEqual(res.status, 200);

        // Assert that the response body success flag is true
        assert.strictEqual(res.body.success, true);

        // Assert that the 'data' property is an array of apps
        assert.ok(Array.isArray(res.body.data));
    });

    it("Test 2: DB call fails (catch path)", async () => {
        // Stub the App.findAll method to simulate a database error
        sinon.stub(App, 'findAll').rejects(new Error('DB failure'));

        // Make the same authenticated GET request
        const res = await request(app)
            .get('/app')
            .set('Authorization', `Bearer ${token}`);

        // Assert that the response status is 500 (Internal Server Error)
        assert.strictEqual(res.status, 500);

        // Assert that success flag is false due to the error
        assert.strictEqual(res.body.success, false);

        // Assert that a meaningful error message is returned
        assert.strictEqual(res.body.message, 'DB error');

        // Assert the error detail includes the simulated error message
        assert.ok(res.body.error.includes('DB failure'));
    });

    it("Test 3: Unauthorized request (no token)", async () => {
        // Send a request without an Authorization header
        const res = await request(app)
            .get('/app');

        // Assert that status code is 401 Unauthorized
        assert.strictEqual(res.status, 401);

    });
});

describe('POST /app', () => {
    let token;

    // Generate a valid token before running the tests
    before(async () => {
        const user = await User.findByPk(1);
        token = await generateToken(user);
    });

    // Restore stubs after each test to avoid interference
    afterEach(() => {
        sinon.restore();
    });

    it('Case 1: Should return 400 if name is empty', async () => {
        // Send POST with empty 'name' field
        const res = await request(app)
            .post('/app')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: "" });

        // Expect 400 Bad Request status
        assert.strictEqual(res.status, 400);

        // success should be false due to invalid input
        assert.strictEqual(res.body.success, false);

        // Expect the error message about missing app name
        assert.strictEqual(res.body.message, "No app name provided");
    });

    it('Case 1b: Should return 400 if name is missing', async () => {
        // Send POST with no 'name' field at all
        const res = await request(app)
            .post('/app')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        // Same expectations as empty name case
        assert.strictEqual(res.status, 400);
        assert.strictEqual(res.body.success, false);
        assert.strictEqual(res.body.message, "No app name provided");
    });

    it('Case 2: Should create app and return 201 if name is valid', async () => {
        // Send POST with a valid app name
        const res = await request(app)
            .post('/app')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: "WhiteBoxApp" });

        // Expect 201 Created status
        assert.strictEqual(res.status, 201);

        // success flag should be true
        assert.strictEqual(res.body.success, true);

        // Data should exist and have the same name as sent
        assert.ok(res.body.data);
        assert.strictEqual(res.body.data.name, "WhiteBoxApp");
    });

    it("Test 3: DB failure when creating app", async () => {
        // Stub App.create to simulate a database error
        sinon.stub(App, 'create').rejects(new Error('DB failure on create'));

        // Attempt to create an app which will trigger the stubbed error
        const res = await request(app)
            .post('/app')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: "FailApp" });

        // Expect 500 Internal Server Error due to DB failure
        assert.strictEqual(res.status, 500);

        // success flag should be false because of the failure
        assert.strictEqual(res.body.success, false);


        // Error details should include the stubbed error message
        assert.ok(res.body.error.includes('DB failure on create'));
    });

    it("Test 4: Unauthorized request (no token)", async () => {
        // Send POST without Authorization header
        const res = await request(app)
            .post('/app')
            .send({ name: "UnauthorizedApp" });

        // Expect 401 Unauthorized status
        assert.strictEqual(res.status, 401);

    });
});
