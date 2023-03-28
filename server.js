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

    res.locals.user = null;
    let authHeader = req.headers["authorization"];
    console.log(`Authorization header: ${authHeader}`);

    if (authHeader || authHeader == null || authHeader === "null" || authHeader === "undefined"){
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

        res.locals.user = response.rows[0];
        console.log("Tagged request");

        next();

    }); 

});

//API POST ENDPOINTS
//Creates a new post
server.post('/api/posts/', (req, res) => {

    const body = req.body;
    const postedmessage = body.message;
    let userID = res.locals.user.userid;
    let timeposted = new Date();

    client.query('INSERT INTO posts (userid, postedmessage, timeposted) VALUES ($1, $2, $3)', [userID, postedmessage, timeposted], (error, response) =>{

        if(error !== null){
            res.statusCode = 500;
            res.end();
            console.log(error);

            return;
        }

        //console.log(response);
        console.log(userID);
        console.log(postedmessage);

        res.end();

    });

});

//Gets multiple posts to present to the user
server.get('/api/posts/', (req, res) => {

    client.query('SELECT posts.messageid, posts.userid, posts.postedmessage, posts.timeposted, users.username FROM posts JOIN users ON posts.userid = users.userid ORDER BY posts.messageid DESC LIMIT 10', (error, response) => {

        if(error !== null){
            res.statusCode = 500;
            res.end();
            console.log(error);

            return;
        }

        res.json(response.rows);
      
    });
});

//Gets a specific post to present to the user by looking up the 'ID' parameter
server.get('/api/posts/:id', (req, res) => {

});

//Adds a reaction to a specific post by looking up the 'ID' parameter
server.put('/api/posts/:id/:react/', (req, res) => {

});

//Deletes a specific post by looking up the 'ID' parameter
server.delete('/api/posts/:id', (req, res) => {

    const id_to_delete = req.params.id;

    client.query('DELETE FROM posts WHERE messageid= $1', [id_to_delete], (error, response) => {

        if(error !== null){

            res.statusCode = 500;
            res.end();
            console.log(error);

            return;

        }

        res.end();

    });

});

//Removes a specific reaction from a specific post with an ID
server.delete('/api/posts/<id>/react/', (req, res) => {

});

//API LOGIN / REGISTRATION ENDPOINTS

//Login form
server.post('/api/login/', (req, res) => {

    let loginUsername = req.body.username;
    let loginPassword = req.body.password;

    client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [loginUsername, loginPassword], (error, response) => {

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

        res.json({

            id: response.rows[0].userid 

        });
    });

});

//Registration form
server.post('/api/register/', (req, res) => {

    let registerUsername = req.body.username;
    let registerCountry = req.body.country;
    let registerPassword = req.body.password;

    client.query('SELECT * FROM users WHERE username = $1', [registerUsername], (error, response) => {

        if (response.rows.length !== 0){
            res.statusCode = 400;
            res.end();

            return;
        }

        if(error !== null){
            res.statusCode = 500;
            res.end();
            console.log(error);

            return;
        }
       
        client.query('INSERT INTO users (username, country, password) VALUES ($1, $2, $3) RETURNING *',[registerUsername, registerCountry, registerPassword], (error, response) => {

            if(error !== null){
                res.statusCode = 500;
                res.end();
                console.log(error);
    
                return;
            }

            res.json({

                id: response.rows[0].userid

            });

        });
        
    });

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
