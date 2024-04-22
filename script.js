var mapa;
var directionsService;
var directionsRenderer;

function initMap() {
    mapa = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: -12.043180, lng: -77.028240} 
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(mapa);
}

document.getElementById('travelForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var origen = document.getElementById('origen').value;
    var destino = document.getElementById('destino').value;
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = `Calculando ruta desde ${origen} hasta ${destino}...`;

    var solicitud = {
        origin: origen,
        destination: destino,
        travelMode: 'DRIVING'
    };

    directionsService.route(solicitud, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            var distancia = response.routes[0].legs[0].distance.text;

            // Crear elementos HTML para mostrar la información de la ruta y la distancia
            var infoRuta = document.createElement('p');
            infoRuta.textContent = `La distancia entre ${origen} y ${destino} es de ${distancia}.`;
            resultado.innerHTML = ''; // Limpiar contenido anterior
            resultado.appendChild(infoRuta);
        } else {
            resultado.innerHTML = `No se pudo calcular la ruta. Error: ${status}`;
        }
    });
});