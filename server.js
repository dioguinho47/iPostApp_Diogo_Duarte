const express = require('express');
const path = require('path');
const {Client} = require('pg');
//import { endianness } from 'os';

const server = express();
const port = (process.env.PORT || 4000);

server.set('port', port);

server.use(express.json());
server.use("/static", express.static(path.resolve(__dirname, "public", "static")));

//Homepage endpoint to our index.html
server.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//Client
const client = new Client ({
    host: "localhost",
    user: "diogoduarte",
    port: 5432,
    password: "mydatabase123",
    database: "ipostapplication"
})

client.connect();

//Authorization for the users Middleware
server.use("/api/*", (req, res, next) => {

    let authHeader = req.getHeader("authorization");

    if (authHeader === null){

        next();

        return;
    }

    const split = authHeader.split(" ");
    let userID = authHeader[1];
    userID = parseInt(userID);

    if (isNaN(userID)){

        res.statusCode(400);
        res.end();

        return;
    }

    let userPassword = authHeader[2];
    const my_query = "Select * from users WHERE userID = $1 AND password = $2"; 
    
    client.query(my_query, [userID, userPassword], (error, response) => {
        //TODO handle results
        if(error !== null){
            req.statusCode(500);
            req.end();

            return;
        }

        if(response.rows.length !== 1){
            req.statusCode(401);
            req.end();

            return;
        }
    }); 

});

//ENDPOINTS

//Creates a new post
server.post('/api/posts/', (req, res) => {

    const body = req.body;
    const postedMessage = body.message;

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

