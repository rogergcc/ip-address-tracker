const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require("axios");
// const bodyParser = require('body-parser');
var apiLocation = require('./api/location');

// "body-parser": "^1.19.0",
dotenv.config();
const app = express();

const middleware = (req, res, next) => {
    console.log('Her wasaaaa');
    next();
};

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
// app.use(middleware);

app.get('/api/ip-location', async(req, res, next) => {
    // getIpLocation();
    let host = req.query.host;
    // let limit = req.query.limit;
    // console.log("HOST: ", host);
    
    // res.send(getIpLocation());
    // res.send("HOLA from Node server.")
    var datos = await apiLocation.getLocation(host);
    res.send(datos)
});

async function getIpLocation(req, res) {
    // const api = 'https://geo.ipify.org/api/v1?apiKey=at_kkV0RSKzsozxyqc3oIFGd6H5GY5ex&ipAddress=' + ipAddress;
    // const api = 'https://tools.keycdn.com/geo.json?host=' + ipAddress;
    // const api = "https://tools.keycdn.com/geo.json?host=''";

    const api = "https://tools.keycdn.com/geo.json";
    let data;
    try {
        const response = await axios.get(api);
        data = response;

        console.log(data);

        // res.send(data);
        return (data);
    } catch (error) {
        console.log(error);
    }
    return (data);
}

const PORT = process.env.PORT;


app.listen(PORT, () => {

    console.log(`Server listening on port ${PORT}`);
    console.log(`localhost:${PORT}`);
});