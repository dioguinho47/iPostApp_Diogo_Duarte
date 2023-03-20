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

//Creates a new post
server.post('/api/posts/', (req, res) => {

});

//Gets multiple posts to present to the user
server.get('/api/posts/', (req, res) => {

});

//Gets a specific post to present to the user by looking up the 'ID' parameter
server.get('/api/posts/<id>/', (req, res) => {

});

//Adds a reaction to a specific post by looking up the 'ID' parameter
server.put('/api/posts/<id>/react/', (req, res) => {

});

//Deletes a specific post by looking up the 'ID' parameter
server.delete('/api/posts/<id>/', (req, res) => {

});

//Removes a specific reaction from a specific post with an ID
server.delete('/api/posts/<id>/react/', (req, res) => {

});

//If the user tries to visit a page in our application that doesnt exist, an error(404) will display
server.use((req, res) => {
    res.status(404);
    res.send('<h1> Error 404: The Route or Resource you are looking for could not be found... </h1>');
}); 

server.listen(server.get('port'), function() {
    console.log('The server is running on port:', server.get('port'));
});

