const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const events = [];

app.use(bodyParser.json())

const BASE_URL = "http://localhost:";
const EVENTS_ENDPOINT = '/events';

app.post('/events', async (req, res) => {
    
    const event = req.body;

    console.log(event);
    events.push(event)

    await axios.post("http://posts-clusterip-srv:4000/events", event).catch(err => {
        console.log(err.message);
    });
    await axios.post("http://comments-srv:4001/events", event).catch(err => {
        console.log(err.message);
    });
    await axios.post("http://query-srv:4002/events", event).catch(err => {
        console.log(err.message);
    });
    await axios.post("http://moderation-srv:4003/events", event).catch(err => {
        console.log(err.message);
    });

    res.status(200).send({"status": "OK"});
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log("Listening on port 4005");
});