import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { formatPharmacy } from '../libs/utils';
import { PharmaciesOnDutyResource } from '../types/resources/PharmaciesOnDutyResource';
import { PharmacyResource } from '../types/resources/PharmacyResource';

type Props = {
  data: PharmaciesOnDutyResource | PharmacyResource | null;
};
const Map: React.FC<Props> = ({ data }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <!-- Import Leaflet CSS -->
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
      <style>
        #map {
          width: 100%;
          height: 100vh;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>

      <!-- Import Leaflet JS -->
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        // Créer la carte
        var map = L.map('map').setView([${formatPharmacy(
          data,
          'latitude',
        )}, ${formatPharmacy(data, 'longitude')}], 13); // Abidjan

        // Ajouter une couche OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Ajouter un marker
        L.marker([${formatPharmacy(data, 'latitude')}, ${formatPharmacy(
    data,
    'longitude',
  )}]).addTo(map)
          .bindPopup('${formatPharmacy(data, 'name')}')
          .openPopup();
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
