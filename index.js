const tmi = require('tmi.js');
const express = require('express')
const app = express()
const http = require('http')
const Enmap = require('enmap');
const axios = require('axios');

// Twitch API
const client = new tmi.Client({
	channels: [ 'AlexDevUwU' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	console.log(`${tags['display-name']}: ${message}`);
});

// Página web
app.set('port', process.env.PORT || 80)

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.set("view engine", "ejs")

app.use('/static', express.static(__dirname + '/files'));

app.set("views", require("path").join(__dirname, "views"))

app.db = new Enmap({
    name: 'database'
})

app.db.set("parametros", "null")

app.get('*', function (req, res) {
    const parameters = app.db.get("parametros")
    if (parameters === "null") {
        res.render("index", {
            params: parameters
        })
    } else {
        res.render("index", {
            params: parameters
        })
    }
});

const httpServer = http.createServer(app);
httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});