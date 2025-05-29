const request = require('supertest');
const assert = require('assert');
const sinon = require('sinon');
const app = require('../index');
const User = require('../models/userModel');
const Password = require('../models/passwordModel'); 
const { generateToken } = require('../middleware/authMiddleware');

describe('GET /passwords/:appid', () => {
    let token;

    // Before all tests, authenticate a test user
    before(async () => {
        const user = await User.findByPk(1);
        token = await generateToken(user);
    });

    // Restore stubs after each test
    afterEach(() => {
        sinon.restore();
    });

    it("Test 1: DB call succeeds (then path)", async () => {
        // Stub Password.findAll to simulate successful DB response
        const mockData = [{ id: 1, password: 'secret123', appid: '1' }];
        sinon.stub(Password, 'findAll').resolves(mockData);

        const res = await request(app)
            .get('/passwords/1')
            .set('Authorization', `Bearer ${token}`);
        

        // Expect successful response
        assert.strictEqual(res.status, 200);                     
        assert.strictEqual(res.body.success, true);              
        assert.deepStrictEqual(res.body.data, mockData);         
    });

    it("Test 2: DB call fails (catch path)", async () => {
        // Stub Password.findAll to simulate failure
        sinon.stub(Password, 'findAll').rejects(new Error('DB failure'));

        const res = await request(app)
            .get('/passwords/1')
            .set('Authorization', `Bearer ${token}`);

        assert.strictEqual(res.body.success, false);           

    });

    it("Test 3: Unauthorized request (no token)", async () => {
        const res = await request(app)
            .get('/passwords/1'); // no Authorization header

        assert.strictEqual(res.status, 401);                     // HTTP 401 Unauthorized
    });
});


describe('POST /passwords/:appid', () => {
    let token;

    // Generate a token before running tests
    before(async () => {
        const user = await User.findByPk(1);
        token = await generateToken(user);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("Test 1: Password is empty (if condition is true)", async () => {
        // This tests: if (password == "") → TRUE
        const res = await request(app)
            .post('/passwords/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ password: "" });

        assert.strictEqual(res.status, 400); // Should return 400 for bad request
        assert.strictEqual(res.body.success, false);
        assert.strictEqual(res.body.message, "No password inserted");
    });

    it("Test 2: Password is valid, DB insert succeeds (then path)", async () => {
        // This tests: if (password == "") → FALSE and .then() path
        const mockData = { id: 1, password: 'mypassword123', appid: '1' };
        sinon.stub(Password, 'create').resolves(mockData);

        const res = await request(app)
            .post('/passwords/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ password: "mypassword123" });

        assert.strictEqual(res.status, 201);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.message, "Password created");
        assert.deepStrictEqual(res.body.data, mockData);
    });

    it("Test 3: Password is valid, DB insert fails (catch path)", async () => {
        // This tests: if (password == "") → FALSE and .catch() path
        const error = new Error("DB insert failed");
        sinon.stub(Password, 'create').rejects(error);

        const res = await request(app)
            .post('/passwords/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ password: "somepassword" });

        assert.strictEqual(res.body.success, false); // success = false due to catch
    });

    it("Test 4: Unauthorized request (no token)", async () => {
        const res = await request(app)
            .post('/passwords/1')
            .send({ password: "mypassword123" });

        assert.strictEqual(res.status, 401); // Middleware should block it
    });
});

describe('PUT /passwords/:appid', () => {
    let token;

    before(async () => {
        const user = await User.findByPk(1);
        token = await generateToken(user);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("Test 1: Empty password triggers if condition", async () => {
        // Test: if (password == "") → TRUE
        const res = await request(app)
            .put('/passwords/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ password: "" });

        assert.strictEqual(res.status, 400);
        assert.strictEqual(res.body.success, false);
        assert.strictEqual(res.body.message, "No password inserted");
    });

    it("Test 2: Password is valid, update succeeds (then path)", async () => {
        // Test: if (password == "") → FALSE, .then() path
        const mockResponse = [1]; // Sequelize returns [number of affected rows]
        sinon.stub(Password, 'update').resolves(mockResponse);

        const res = await request(app)
            .put('/passwords/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ password: "newsecurepass" });

        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.message, "Updated successfully");
        assert.deepStrictEqual(res.body.data, mockResponse);
    });

    it("Test 3: Password is valid, DB update fails (catch path)", async () => {
        // Test: if (password == "") → FALSE, .catch() Path
        const error = new Error("DB update failed");
        sinon.stub(Password, 'update').rejects(error);

        const res = await request(app)
            .put('/passwords/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ password: "anotherpass" });

        assert.strictEqual(res.body.success, false);

    });

    it("Test 4: Unauthorized request (no token)", async () => {
        const res = await request(app)
            .put('/passwords/1')
            .send({ password: "willfail" });

        assert.strictEqual(res.status, 401); 
    });
});

