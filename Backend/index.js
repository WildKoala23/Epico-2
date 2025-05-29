// index.js
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./configs/swagger');
const initDB = require('./models/initDB');
const { validateCredentials } = require('./middleware/authMiddleware');

const appRoute = require('./routes/appRoute');
const passRoute = require('./routes/passRoute');

app.set('port', process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

function fetchExternalApps() {
    return [
        { id: 1, name: 'App One' },
        { id: 2, name: 'App Two' }
    ];
}

app.post('/import/apps', validateCredentials(), (req, res) => {
    console.log("INSIDE ROUTE");
    const apps = fetchExternalApps();
    res.status(200).json({ success: true, data: apps });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/passwords', passRoute);
app.use('/app', appRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Only initialize DB — no server start
(async () => {
    await initDB();
})();

module.exports = app;
