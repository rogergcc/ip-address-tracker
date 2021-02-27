const express = require('express');
const axios = require("axios");

module.exports = {
    getLocation: async function (req, res, next) {
        // var id = req.query.id;
        var host = req;
        console.log('-------------------------------')
        console.log('LOCATION.JS')
        var searchIp = (host!='')?`?host=${host}`:'';
        console.log("RECIBI: ", host);
        // const api = 'https://geo.ipify.org/api/v1?apiKey=at_kkV0RSKzsozxyqc3oIFGd6H5GY5ex&ipAddress=' + ipAddress;
  
        //http://ip-api.com/json/

        // const api = `https://tools.keycdn.com/geo.json${searchIp}`;
        // let api='';
        // if (host=='') {
        //     api = 'https://ipapi.co/json/'
        // } else {
        //     api = `https://ipapi.co/${host}/json/`;
        // }
        
        // const api = `https://ipapi.co/${host}/json/`;
        const api = `http://ip-api.com/json/${host}`;

        console.log("RECIBI LINK: ", api);
        let data={};
        try {

            const response = await axios.get(api);

            // data = response.data.data.geo; //https://tools.keycdn.com/geo.json${searchIp}
            data = response.data;
           

            // const {host,country_name,region_code,region_name,timezone,isp,latitude,longitude}= data;
            
            // {
            //     status: "success",
            //     country: "United States",
            //     countryCode: "US",
            //     region: "VA",
            //     regionName: "Virginia",
            //     city: "Ashburn",
            //     zip: "20149",
            //     lat: 39.03,
            //     lon: -77.5,
            //     timezone: "America/New_York",
            //     isp: "Google LLC",
            //     org: "Google Public DNS",
            //     as: "AS15169 Google LLC",
            //     query: "8.8.8.8"
            //     }
            
            data = {
                "host": data.ip,
                "country_name": data.country,
                "region_code": data.countryCode,
                "region_name": data.regionName,
                "timezone": data.timezone,
                "isp": data.isp,
                "latitude": data.lat,
                "longitude": data.lon
            }
            console.log("data from ip", response);
            //console.log("data from ip", data);

            
            //return (data);
        } catch (error) {
            console.log('error: get data',error);
        }
        
        return data;
        //return (data);

    }
};