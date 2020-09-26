
const inputElement = document.querySelector('#search');
const bntElement = document.querySelector('.btn');
const mapa = document.querySelector('.mapa');

const ip = document.getElementById('ip');
const locationCity = document.getElementById('location');
const timeZone = document.getElementById('timezone');
const ispHost = document.getElementById('isp');

const mapId = document.getElementById('map');
const searching = document.getElementById('searching');
const searchContainer = document.getElementById('search-container');
const address = document.getElementById('address');

const errorIp = document.getElementById('error-ip');


// async function fetchApi(url) {
//     let resp = '';

//     try {
//         await fetch(url, {
//             method: 'GET',
//             mode: 'no-cors',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(function (response) {
//             console.log("ok: ", response)

//             // commit('setProducts', response.data)
//             return response;
//         })
//     } catch (error) {
//         console.log("error: ", error)
//     }
// }

// async function getData() {
//     let response = await fetch(`https://ip-address-tracker-project.herokuapp.com/api/ip-location?host=fsaf`);
//     let data = await response.json()
//     return data;
// }

// getLocation = async function (host) {
async function getLocation(host) {

    const api = `/api/ip-location?host=${host}`;
    let data;
    let todo = {
        item: host
    };

    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            //body: JSON.stringify(todo)
        });
        data = await response.json()

        //return (data);
    } catch (error) {
        console.log(error);
    }
    // return data.data;
    return (data);

}


async function getIP() {
    const api = `https://geo.ipify.org/api/v1?apiKey=at_XZ2V1IG3PPKxLr6Cfpda2e30d0lVY`;
    let data;
    try {
        const response = await fetch(api);
        data = await response.json()

        //return (data);
    } catch (error) {
        console.log(error);
    }
    // return data.data;
    return (data.ip);
}
function validateIPAddress(ipaddress) {

    return ((/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)))
}
async function findIpInMap(ipAddress) {

   
    let data = await getLocation(ipAddress);
    // data = await rsp.json();

    const {host,country_name,region_code,region_name,timezone,isp,latitude,longitude}= data;


    ip.innerHTML = host;
    locationCity.innerHTML = region_name;
    timeZone.innerHTML = timezone;
    ispHost.innerHTML = isp;
    

    var location = '';

    location += region_code + ', ' + region_name + '-' + country_name;


    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9nZXJnY2MiLCJhIjoiY2swNjBxZjdoMDB4OTNkbzdwZDRyd3Y2cCJ9.IAhPr1E2_-V8CqMc-zILDg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 15
    });

    // create the popup
    var popup = new mapboxgl.Popup({ offset: 25 })
        // .setText('Construction on the Washington Monument began in 1848.')
        .setHTML('<h2>Aqui estas!</h2>')
        ;

    // var popup = new mapboxgl.Popup({ closeOnClick: false })
    //     .setLngLat([-96, 37.8])
    //     .setHTML('<h1>Hello World!</h1>')
    //     .addTo(map);

    var el = document.createElement('div');
    el.id = 'marker';
    // el.className = 'marker';

    var marker = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);

}

document.addEventListener("DOMContentLoaded", async function (e) {
    //do work
    errorIp.style.display = "none";
    let ipAddress = inputElement.value;
    ipAddress = ipAddress.trim();
    //ipAddress = await getIP();

    findIpInMap(ipAddress);
});


inputElement.addEventListener("keydown", function (e) {

    var key = e.which && e.which || e.keyCode();

    if (key === 13) {
        e.preventDefault();
        findIp();
    }


})
async function findIp() {

    //192.241.244.201
    //8.8.8.8
    let ipAddress = inputElement.value;
    ipAddress = ipAddress.trim();

    let validIp = false;

    if (ipAddress.length == 0) {
       
        validIp = true;//my ip
    } else if (!validateIPAddress(ipAddress)) {

        // errorIp.remove();
        errorIp.style.display = "inline-block";

        // alert("You have entered an invalid IP address!")
        return;
    }
    errorIp.style.display = "none";
    
    findIpInMap(ipAddress);
}
searching.addEventListener('click', function (e) {
    e.preventDefault();
 

    findIp();
});


