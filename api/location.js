const express = require('express');
const axios = require("axios");

module.exports = {
    getLocation: async function (req, res, next) {
        // var id = req.query.id;
        var host = req;

        var searchIp = (host!='')?`?host=${host}`:'';
        console.log("RECIBI: ", host);
        // const api = 'https://geo.ipify.org/api/v1?apiKey=at_kkV0RSKzsozxyqc3oIFGd6H5GY5ex&ipAddress=' + ipAddress;
    // const api = 'https://tools.keycdn.com/geo.json?host=' + ipAddress;
    // const api = "https://tools.keycdn.com/geo.json?host=''";
    //http://ip-api.com/json/

        const api = `https://tools.keycdn.com/geo.json${searchIp}`;

        let data={};
        try {

            const response = await axios.get(api);
            data = response.data.data.geo;
            const {host,country_name,region_code,region_name,timezone,isp,latitude,longitude}= data;
            
            data = {
                "host": host,
                "country_name": country_name,
                "region_code": region_code,
                "region_name": region_name,
                "timezone": timezone,
                "isp": isp,
                "latitude": latitude,
                "longitude": longitude
            }
            
            // console.log(data);

            
            //return (data);
        } catch (error) {
            console.log(error);
        }
        return data;
        //return (data);

    }
};