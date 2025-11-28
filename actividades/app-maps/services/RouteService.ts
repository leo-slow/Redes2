import { SavedRoute, LocationData } from './ActivityModel';
import StorageService from './StorageService';

class RouteService {

  // Guardar la sesión actual finalizada
  async saveSession(routeData: SavedRoute) {
    // Aquí podrías procesar los datos antes de guardarlos 
    // (ej. simplificar la polilínea si es muy larga)
    await StorageService.saveRoute(routeData);
    await StorageService.updateGlobalStats(routeData.stats);
  }

  async getAllRoutes() {
    return await StorageService.getRoutes();
  }

  // Generar HTML para Leaflet
  // Este string se puede inyectar en un <WebView> de React Native
  generateMapHTML(route: SavedRoute): string {
    // Convertir datos a formato array simple [lat, lon]
    const pathCoordinates = route.path.map(p => [p.latitude, p.longitude]);
    
    // Centro del mapa (punto inicial o medio)
    const center = pathCoordinates.length > 0 
      ? pathCoordinates[0] 
      : [0, 0];

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // Inicializar mapa
          var map = L.map('map').setView([${center[0]}, ${center[1]}], 15);

          // Capa de OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Datos de la ruta
          var latlngs = ${JSON.stringify(pathCoordinates)};

          // Dibujar Polilínea
          var polyline = L.polyline(latlngs, {color: 'blue', weight: 5}).addTo(map);

          // Ajustar zoom para ver toda la ruta
          if (latlngs.length > 0) {
            map.fitBounds(polyline.getBounds());
          }

          // Agregar marcadores de inicio y fin
          if (latlngs.length > 0) {
            L.marker(latlngs[0]).addTo(map).bindPopup('Inicio');
            L.marker(latlngs[latlngs.length - 1]).addTo(map).bindPopup('Fin');
          }
        </script>
      </body>
      </html>
    `;
  }
}

export default new RouteService();
