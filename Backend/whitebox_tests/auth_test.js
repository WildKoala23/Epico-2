const sinon = require('sinon');
const assert = require('assert');
const app = require('../index'); 
const request = require('supertest');

describe('Credential validation logging', () => {
    let consoleLogStub;


    beforeEach(() => {
        consoleLogStub = sinon.stub(console, 'log');
    });

    afterEach(() => {
        consoleLogStub.restore();
    });

    it('should log a message when validating credentials', async () => {

        const res = await request(app).post('/import/apps');

        console.log("INSIDE");

        //assert(consoleLogStub.calledWith('Validating user credentials.'));
    });
});
