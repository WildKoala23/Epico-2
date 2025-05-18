//*************************************
// GET /password/:appid
//*************************************/

/**
 * Test correct behaviour
 */
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});

pm.test("Content-Type equal to 'application/json'"), function () {
    pm.expect(pm.response.headers.get("Content-type")).to.eql("application/json")
}

const schema = {
    type: "object",
    properties: {
        success: { type: "boolean" },
        data: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    password: { type: "string" },
                    appid: { type: "number" }
                }
            },
            required: ["id", "password", "appid"]
        },

    },
    required: ["success", "data"]
}

pm.test("Response to schema is valid", function () {
    pm.response.to.have.jsonSchema(schema)
})


/**
 * Test for non existing app
 */
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});

pm.test("Content-Type equal to 'application/json'"), function () {
    pm.expect(pm.response.headers.get("Content-type")).to.eql("application/json")
}

pm.test("Application none existent", function () {
    const json = pm.response.json()
    pm.expect(json).to.have.property("error")
    pm.expect(json.error).to.eql("App does not exist")
})