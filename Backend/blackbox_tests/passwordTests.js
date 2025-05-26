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

pm.test("Content-Type equal to 'application/json'", function () {
    pm.test("Content-Type equal to 'application/json'", function () {
        pm.expect(pm.response.headers.get("Content-type")).to.include("application/json")
    })
    
})

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
                },
                required: ["id", "password", "appid"]
            },
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
pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});

pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});

pm.test("Content-Type equal to 'application/json'", function () {
    pm.test("Content-Type equal to 'application/json'", function () {
        pm.expect(pm.response.headers.get("Content-type")).to.include("application/json")
    })

})

pm.test("Application none existent", function () {
    const json = pm.response.json()
    pm.expect(json).to.have.property("error")
    pm.expect(json.error).to.eql("App does not exist")
})

/**
 * Test for insufficient permissions
 */
pm.test("Status code is 403", function () {
    pm.response.to.have.status(403);
});

pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});

pm.test("Content-Type equal to 'application/json'", function () {
    pm.test("Content-Type equal to 'application/json'", function () {
        pm.expect(pm.response.headers.get("Content-type")).to.include("application/json")
    })

})
pm.test("Application none existent", function () {
    const json = pm.response.json()
    pm.expect(json).to.have.property("error")
    pm.expect(json.error).to.eql("Forbidden: insufficient permissions")
})



//*************************************
// POST /password/:appid
//*************************************/

//Test correct usage
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});

pm.test("Content-Type includes 'application/json'", function () {
    pm.response.to.have.header("Content-Type");
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

const schema2 = {
    type: "object",
    properties: {
        success: { type: "boolean" },
        data: {
            type: "object",
            properties: {
                appid: { type: "number" },
                password: { type: "string" },
                id: { type: "number" }
            },
            required: ["appid", "password", "id"]
        }
    }
};


pm.test("Response to schema is valid", function () {
    pm.response.to.have.jsonSchema(schema2)
})

// Missing passsword in body
pm.test("Should return 400 when password is missing", function () {
    pm.response.to.have.status(400);

    const res = pm.response.json();

    pm.expect(res).to.have.property("success", false);
    pm.expect(res).to.have.property("message");
    pm.expect(res.message.toLowerCase()).to.include("password");
});


// App does not exist
pm.test("Should return 400 for non-existent appid", function () {
    pm.response.to.have.status(400);

    const res = pm.response.json();

    pm.expect(res).to.have.property("error");
    pm.expect(res.error).to.eql("App does not exist")
});

//Appid is NaN
pm.test("Should return 400 for non-numeric appid", function () {
    pm.response.to.have.status(400);


    const res = pm.response.json();

    pm.expect(res).to.have.property("success", false);
    pm.expect(res).to.have.property("message");
    pm.expect(res.message).to.eql("Invalid appid")
});


//*************************************
// PUT /password/:appid
//*************************************/

// Correct usage
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});

pm.test("Content-Type includes 'application/json'", function () {
    pm.response.to.have.header("Content-Type");
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});



// Missing passsword in body
pm.test("Should return 400 when password is missing", function () {
    pm.response.to.have.status(400);

    const res = pm.response.json();

    pm.expect(res).to.have.property("success", false);
    pm.expect(res).to.have.property("message");
    pm.expect(res.message.toLowerCase()).to.include("password");
});


// App does not exist
pm.test("Should return 400 for non-existent appid", function () {
    pm.response.to.have.status(400);

    const res = pm.response.json();

    pm.expect(res).to.have.property("error");
    pm.expect(res.error).to.eql("App does not exist")
});

//Appid is NaN
pm.test("Should return 400 for non-numeric appid", function () {
    pm.response.to.have.status(400);


    const res = pm.response.json();

    pm.expect(res).to.have.property("success", false);
    pm.expect(res).to.have.property("message");
    pm.expect(res.message).to.eql("Invalid appid")
});