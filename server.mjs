import * as url from 'url';
import express from 'express'
import path from 'path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const server = express();
const port = (process.env.PORT || 4000);

server.set('port', port);

server.use("/static", express.static(path.resolve(__dirname, "public", "static")));

//Homepage endpoint to our index.html
server.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//Endpoints for the posts
server.get('/api/posts', (req, res) => {

});

server.get('/api/posts/id', (req, res) => {

});

server.put('/api/posts/id/react/', (req, res) => {

});

server.delete('/api/posts/id', (req, res) => {

});

server.delete('/api/posts/<id>/react/', (req, res) => {

});

//If the user tries to visit a page in our application that doesnt exist, an error(404) will display
server.use((req, res) => {
    res.status(404);
    res.send('<h1> Error 404: Resource not found... </h1>');
}); 

server.listen(server.get('port'), function() {
    console.log('The server is running on port:', server.get('port'));
});

