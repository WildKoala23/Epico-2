//*************************************
// Get all apps Test (GET /app)
//*************************************/
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
                    appid: { type: "number" },
                    name: { type: "string" }
                },
                required: ["appid", "name"]
            }
        }
    },
    required: ["success", "data"]
};

pm.test("Response schema is valid", function () {
    pm.response.to.have.jsonSchema(schema)
})

//*************************************
// Create new app test (POST /app)
//*************************************/
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
})

pm.test("Response contains new appid", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property("appid");
    pm.expect(json.appid).to.be.a("number");
});

pm.test("Response contains the correct name", function () {
    const json = pm.response.json();
    pm.expect(json.name).to.eql("Avengers Network");
});
