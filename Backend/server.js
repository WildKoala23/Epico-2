const app = require('./index');

const PORT = app.get('port') || 8000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});