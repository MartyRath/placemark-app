<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap } from "leaflet";
  import { browser } from "$app/environment";
  import type { UserTree } from "$lib/types/placemark-types";

  export let id = "home-map-id";
  export let height = 80;
  export let location = { latitude: 53.2734, longitude: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "Terrain";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;

  // Key pair object storing available categories.
  let categoryMarkers: { [key: string]: Array<leaflet.marker> }  = {"All trees": [], "Leinster": [], "Ulster": [], "Munster": [], "Connacht": []};


  let categories = Object.keys(categoryMarkers);
  let selectedCategory = "All trees";

  onMount(async () => {
    if (browser) {
      const leaflet = await import("leaflet");
      // Define map base layers, terrain and satellite
      baseLayers = {
        Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Satellite: leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      })
      };
      let defaultLayer = baseLayers[activeLayer];
     
      // Create leaflet map
      imap = leaflet.map(id, {
        center: [location.latitude, location.longitude],
        zoom: zoom,
        minZoom: minZoom,
        layers: [defaultLayer]
      });
      
      // Add the layer control (options to switch layers)
      control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
    }
  });

  // Takes userTree and adds to appropriate province category and "All trees" category
  export async function addMarker(userTree: UserTree) {
    const leaflet = await import("leaflet");
    const { latitude, longitude, province, species, height, girth } = userTree;
    const marker = leaflet.marker([latitude, longitude]);

    // Set userTree POI popup options and message
    const popup = leaflet.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(`Species: ${species} | Height: ${height} | Girth: ${girth}
                      Coordinates: ${latitude}, ${longitude}`);
    marker.bindPopup(popup); // Adds popup to marker

    // Add userTree to the appropriate province and to "All Trees"
    categoryMarkers[province].push(marker);
    categoryMarkers["All trees"].push(marker);

    // Add the marker to the map
    marker.addTo(imap);
  }

  // Updates selected category, with province or All trees
  function updateMapLayer(category: string) {
    // Remove all markers from the map
    Object.values(categoryMarkers).forEach(markers => {
      markers.forEach(marker => marker.remove());
    });

     // Add markers for the selected category: province and "All trees"
     let markers;
     if (category === "All trees") {
      markers = categoryMarkers["All trees"]
     } else {
      markers = categoryMarkers[category]; // userTrees assigned to their province
     }
    
     // Add markers to map
    markers.forEach(marker => marker.addTo(imap));
  }

  export function moveTo(latitude: number, longitude: number) {
    imap.flyTo({ lat: latitude, lng: longitude });
  }
</script>

<select
  bind:value={selectedCategory}
  on:change={() => updateMapLayer(selectedCategory)}>
  {#each categories as category}
    <option value={category}>{category}</option>
  {/each}
</select>

<div {id} class="box" style="height: {height}vh" />
