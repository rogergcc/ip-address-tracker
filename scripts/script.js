
const inputElement = document.querySelector('#search');
const bntElement = document.querySelector('.btn');
const mapa = document.querySelector('.mapa');

const ip = document.getElementById('ip');
const locationCity = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

const mapId = document.getElementById('map');
const searching = document.getElementById('searching');

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

async function getData() {
    let response = await fetch(`http://192.168.0.23:3002/api/ip-location?host=fsaf`);
    let data = await response.json()
    return data;
}

getLocation = async function (host) {

    const api = `http://localhost:3002/api/ip-location?host=${host}`;
    let data;
    try {
        const response = await fetch(api);
        data = await response.json()

        //return (data);
    } catch (error) {
        console.log(error);
    }
    return data.data;
    //return (data);

}

function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    alert("You have entered an invalid IP address!")
    return (false)
}

function validateIPAddress(ipaddress) {

    return ((/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)))
}
async function BuscarMapa() {

    var ipAddress = inputElement.value;

    if (!validateIPAddress(ipAddress)) {
        alert("You have entered an invalid IP address!")
        return;
    }
    // const api = 'https://geo.ipify.org/api/v1?apiKey=at_kkV0RSKzsozxyqc3oIFGd6H5GY5ex&ipAddress=' + ipAddress;
    // const api = 'https://tools.keycdn.com/geo.json?host=' + ipAddress;
    // const api = "https://tools.keycdn.com/geo.json?host=''";
    //http://ip-api.com/json/
    const api = "http://localhost:3002/api/ip-location";
    let data = await getLocation(ipAddress);
    // data = await rsp.json();

    ip.innerHTML = data.geo.host;
    locationCity.innerHTML = data.geo.region_name;
    timezone.innerHTML = data.geo.timezone;
    isp.innerHTML = data.geo.isp;
    const geoData = data.geo;

    var location = '';

    location += geoData.region_code + ', ' + geoData.region_name + '-' + geoData.country_name;

    $('#ip').html(geoData.host);
    $('#location').html(location);
    $('#isp').html(geoData.isp);
    $('#timezone').html(geoData.timezone);


    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9nZXJnY2MiLCJhIjoiY2swNjBxZjdoMDB4OTNkbzdwZDRyd3Y2cCJ9.IAhPr1E2_-V8CqMc-zILDg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [geoData.longitude, geoData.latitude],
        zoom: 15
    });

    var marker = new mapboxgl.Marker()
        .setLngLat([geoData.longitude, geoData.latitude])
        .addTo(map);


    // if (L.DomUtil.get(mapa) !== undefined) {
    //     L.DomUtil.get(mapa)._leaflet_id = null;
    // }

    // var mymap = L.map(mapa).setView([geoData.latitude, geoData.longitude], 10);
    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9nZXJnY2MiLCJhIjoiY2swNjBxZjdoMDB4OTNkbzdwZDRyd3Y2cCJ9.IAhPr1E2_-V8CqMc-zILDg', {
    //     maxZoom: 18,
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    //         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1
    // }).addTo(mymap);

    // var icon = L.icon({
    //     iconUrl: '../images/icon-location.svg',
    //     iconAnchor: [22, 54],
    //     popupAnchor: [-3, -76]
    // });
    // L.marker([geoData.latitude, geoData.longitude], { icon: icon }).addTo(mymap);



}

document.addEventListener("DOMContentLoaded", function (e) {
    //do work


    BuscarMapa();
});

searching.addEventListener('click', function (e) {
    e.preventDefault();
    BuscarMapa();
});


