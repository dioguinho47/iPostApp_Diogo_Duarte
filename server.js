const express = require('express');
const path = require('path');
//const bodyParser = require('body-parser');

const server = express();
const port = (process.env.PORT || 4000);

server.set('port', port);

//Defining the path on which the website is being server in 
//server.use('/homepage', express.static(path.join(__dirname,'public' ))); 

//Using body-parser in my application
//server.use(bodyParser.urlencoded({extended: false}));
server.use("/static", express.static(path.resolve(__dirname, "public", "static")));

//Homepage Route to our index.html
server.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//If the user tries to visit a page in our application that doesnt exist, an error(404) will display
//server.use((req, res) => {
    //res.status(404);
    //res.send('<h1> Error 404: Resource not found... </h1>');
//}); 

server.listen(server.get('port'), function() {
    console.log('The server is running on port:', server.get('port'));
});

