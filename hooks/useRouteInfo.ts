import { useEffect, useRef, useState } from 'react';
import WebView from 'react-native-webview';
import { GeolocationResponse } from '@react-native-community/geolocation';

export const useRouteInfo = (
  userLat: number,
  userLng: number,
  pharmacyLat: number,
  pharmacyLng: number,
  pharmacyName: string,
  currentPosition?: GeolocationResponse | null,
) => {
  const webviewRef = useRef<WebView>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const html = `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css" />
          <style>
            #map {
              width: 100%;
              height: 100vh;
            }
            .leaflet-routing-container {
              display: none !important;
            }
          </style>
        </head>
        <body>
          <div id="map"></div>

          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>

          <script>
            var map, userMarker, pharmacyMarker, routingControl;

            var pharmacyIcon = L.icon({
              iconUrl: "file:///android_asset/marker/marker-pharmacy.png",
              iconSize: [20, 35],
              iconAnchor: [10, 35],
              popupAnchor: [0, -35],
              shadowUrl: "file:///android_asset/marker/marker-shadow.png",
              shadowSize: [30, 35],
              shadowAnchor: [10, 35],
            });

            var userIcon = L.icon({
              iconUrl: "file:///android_asset/marker/marker-blue.png",
              iconSize: [20, 35], // largeur 20px, hauteur 35px
              iconAnchor: [10, 35], // le "pied" de l'icône (centré en bas)
              popupAnchor: [0, -35], // décalage du popup au-dessus du marqueur
              shadowUrl: "file:///android_asset/marker/marker-shadow.png",
              shadowSize: [30, 35], // ombre adaptée
              shadowAnchor: [10, 35], // alignement de l’ombre
            });

            function initMap(userLat, userLng, pharmacyLat, pharmacyLng, pharmacyName) {
              map = L.map("map", {
              zoomControl: false,
              }).setView([userLat, userLng], 9);

              L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
              }).addTo(map);

              routingControl = L.Routing.control({
                waypoints: [L.latLng(userLat, userLng), L.latLng(pharmacyLat, pharmacyLng)],
                routeWhileDragging: false,
                addWaypoints: false,
                showAlternatives: false,
                show: false,
                // <-- ici on override la création des marqueurs pour éviter les duplications
                createMarker: function (i, wp, nWps) {
                  // i === 0 => départ (utilisateur)
                  // i === nWps-1 => arrivée (pharmacie)
                  var icon = i === 0 ? userIcon : pharmacyIcon;
                  var m = L.marker(wp.latLng, { icon: icon });

                  if (i === 0) {
                    m.bindPopup("Vous êtes ici").openPopup();
                    userMarker = m; // garder la référence
                  } else {
                    m.bindPopup(pharmacyName).openPopup();
                    pharmacyMarker = m;
                  }
                  return m;
                },
              }).addTo(map);

              routingControl.on('routesfound', function(e) {
                const route = e.routes[0];
                
                const durationSec = route.summary.totalTime; // en secondes
                  
                  // distance en mètres
                  const distanceMeters = route.summary.totalDistance; 

                const tempsMin = Math.round(durationSec / 60);
                window.ReactNativeWebView.postMessage(JSON.stringify({ duration: tempsMin, distance: distanceMeters }));
              });
            }

            // fonction appelée depuis RN pour update la position
            function updateUserLocation(newLat, newLng, pharmacyLat, pharmacyLng) {
              if (userMarker) {
                userMarker.setLatLng([newLat, newLng]);
              }
              if (routingControl) {
                routingControl.setWaypoints([L.latLng(newLat, newLng), L.latLng(pharmacyLat, pharmacyLng)]);
              } else {
                // fallback : recentrer si pas encore de routingControl
                map && map.setView([newLat, newLng], 13);
              }
            }
              
          </script>
        </body>
      </html>
    `;

  const onMessage = (event: any) => {
    try {
      const d = JSON.parse(event.nativeEvent.data);
      if (d.duration !== undefined) setDuration(d.duration);
      if (d.distance !== undefined) setDistance(d.distance);
    } catch (err) {
      console.warn('Invalid message from WebView', err);
    }
  };
  // Initialiser la carte quand la WebView est chargée
  const onMapLoad = () => {
    webviewRef.current?.injectJavaScript(`
      initMap(${userLat}, ${userLng}, ${pharmacyLat}, ${pharmacyLng}, "${pharmacyName}");
      true;
    `);
  };

  // Mettre à jour la position de l’utilisateur
  useEffect(() => {
    if (currentPosition && webviewRef.current) {
      webviewRef.current.injectJavaScript(`
        updateUserLocation(
          ${currentPosition.coords.latitude},
          ${currentPosition.coords.longitude},
          ${pharmacyLat},
          ${pharmacyLng}
        );
        true;
      `);
    }
  }, [currentPosition, pharmacyLat, pharmacyLng]);

  return {
    webviewRef,
    html,
    duration,
    distance,
    onMessage,
    onMapLoad,
  };
};
