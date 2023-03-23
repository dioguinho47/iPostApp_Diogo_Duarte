const express = require('express');
const path = require('path');
const client = require('./database.js');

const server = express();
const port = (process.env.PORT || 4000);

server.set('port', port);

server.use(express.json());
server.use("/static", express.static(path.resolve(__dirname, "public", "static")));

//User Authorization Middleware
server.use((req, res, next) => {
    console.log(`Middleware launched under ${req.method} ${req.url}`);

    req.user = null;
    let authHeader = req.headers["authorization"];
    console.log(`Authorization header: ${authHeader}`);

    if (authHeader === undefined){
        console.log(`Advancing away`);
        next();

        return;
    }

    const split = authHeader.split(" ");
    console.log(split);
    let userID = split[1];
    userID = parseInt(userID);

    if (isNaN(userID)){

        res.statusCode = 400;
        res.end();

        return;
    }

    let userPassword = split[2];
    const my_query = "Select * from users WHERE userID = $1 AND password = $2"; 
    
    console.log(`Making query ${my_query} with ID ${userID} and password ${userPassword}`);
    client.query(my_query, [userID, userPassword], (error, response) => {
        console.log(`Query finished succeeded`);
        
        //TODO handle results
        if(error !== null){
            res.statusCode = 500;
            res.end();
            console.log(error);

            return;
        }

        if(response.rows.length !== 1){
            res.statusCode = 401;
            res.end();

            return;
        }
        
        console.log(response);
        console.log(response.rows);

        req.user = response.rows[0];
        console.log("Tagged request");

        next();

    }); 

});

//API ENDPOINTS
//Creates a new post
server.post('/api/posts/', (req, res) => {

    const body = req.body;
    const postedMessage = body.message;
    let userID = req.user.userID;

});

//Gets multiple posts to present to the user
server.get('/api/posts/', (req, res) => {
    
    console.log(`Endpoint launched under ${req.method} ${req.url}`);
    console.log(req.user);
    res.statusCode = req.user !== null ? 200 : 418;
    res.end("req.user is" + JSON.stringify(req.user));

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

//Homepage endpoint to our index.html
server.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//If the user tries to visit a page in our application that doesnt exist, an error(404) will display
server.use((req, res) => {
    res.status(404);
    res.send('<h1> Error 404: The Route or Resource you are looking for could not be found... </h1>');
}); 

server.listen(server.get('port'), function() {
    console.log('The server is running on port:', server.get('port'));
});

client.connect();
