import express from 'express'
import http from 'http'

export default function server() {
    const app = express();
    const server = http.createServer(app);

    app.get('/', (req, res) => {
        res.sendStatus(200);
    });

    server.listen(3000);
}