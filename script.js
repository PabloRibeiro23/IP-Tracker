const inputForm = document.querySelector('.inputForm');
const inputButton = document.querySelector('.ipSubmit');
const api_key = "at_aof9OGs3wPUg81adiLGKB5vKj9cog";
let ipDisplay = document.querySelector('.mainInfo-data.ip');
let cityDisplay = document.querySelector('.mainInfo-data.city');
let regionDisplay = document.querySelector('.mainInfo-data.region');
let postalCodeDisplay = document.querySelector('.mainInfo-data.postalCode');
let timezoneDisplay = document.querySelector('.mainInfo-data.timezone');
let ispDisplay = document.querySelector('.mainInfo-data.isp');
let map = null; // Variable para almacenar el mapa Leaflet
const customIcon = L.icon({
    iconUrl: './images/icon-location.svg', // Ruta de la imagen del marcador en el color deseado
    iconSize: [36, 41], // Tamaño del icono
    iconAnchor: [12, 41], // Punto de anclaje del icono
});
  

function inputValue() {
  let ipNumber = inputForm.value;
  return ipNumber;
}

function fetchData(ip) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://geo.ipify.org/api/v1",
      data: { apiKey: api_key, ipAddress: ip },
      success: function(data) {
        resolve(data); // Resuelve la promesa con los datos recibidos
      },
      error: function(error) {
        reject(error); // Rechaza la promesa si hay algún error
      }
    });
  });
}

inputButton.addEventListener('click', function() {
  const ip = inputValue();
  fetchData(ip)
    .then(data => {
      // Acceder a los datos aquí
      const latitud = data.location.lat;
      const longitud = data.location.lng;
      const pais = data.location.country;
      const ciudad = data.location.city;
      const region = data.location.region;
      const zonaHoraria = data.location.timezone;
      const postalCode = data.location.postalCode;
      const isp = data.isp;
      const ipNumberData = data.ip;

      console.log(ipNumberData);
      console.log(latitud);
      console.log(longitud);
      console.log(pais);
      console.log(zonaHoraria);
      console.log(ciudad);
      console.log(postalCode);
      console.log(isp);

      ipDisplay.textContent = ipNumberData;
      timezoneDisplay.textContent = `UTC ${zonaHoraria}`;
      ispDisplay.textContent = isp;
      cityDisplay.textContent = ciudad;
      regionDisplay.textContent = region;
      postalCodeDisplay.textContent = postalCode;


      // Crear o actualizar el mapa con los nuevos valores de latitud y longitud
      if (map === null) {
        map = L.map('map').setView([latitud, longitud], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([latitud, longitud], {icon: customIcon}).addTo(map);
      } else {
        map.setView([latitud, longitud], 15);
        var marker = L.marker([latitud, longitud], {icon: customIcon}).addTo(map);
      }

      // Crear o actualizar el marcador en el mapa
      // Utilizar los datos como desees
    })
    .catch(error => {
      // Manejar el error si la solicitud AJAX falla
      console.error(error);
    });
});

// Establecer las coordenadas iniciales del mapa Leaflet
const initialLat = 51.505;
const initialLng = -0.09;
const initialZoom = 13;

map = L.map('map').setView([initialLat, initialLng], initialZoom);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([initialLat, initialLng]).addTo(map);