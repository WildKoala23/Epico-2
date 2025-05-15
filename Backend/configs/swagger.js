const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Epico 2 API',
        version: '1.0.0',
        description: 'API documentation',
    },
    servers: [{ url: 'http://localhost:8000' }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
};
  

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/*.js')],
};


module.exports = swaggerJSDoc(options);
