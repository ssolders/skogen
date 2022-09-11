<script lang="ts">
	import Map from '$lib/Map.svelte';
	import { mapView } from '../../stores/context'
	import { fromLonLat } from 'ol/proj';
	import { mapSettings } from '../../lib/blyberg'

		const centerMap = () => {
			$mapView.setCenter(fromLonLat([mapSettings.lon, mapSettings.lat]));
			$mapView.setZoom(mapSettings.zoom);
		}
</script>

<svelte:head>
	<title>Skiften</title>
	<meta name="description" content="Sålders skiften" />

	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&v=weekly"
		defer
	></script>
</svelte:head>

<div class="content">
	<Map />

	<button class="button" on:click={centerMap}>Centrera skiften</button>
</div>

<style>
	.content {
		width: 100vw;
	}
</style>
