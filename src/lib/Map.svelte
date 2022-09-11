<script lang="ts">
  import { onMount } from 'svelte';
  import { createOpenLayerMap } from './utils/openLayer';

  onMount(async () => {
    createOpenLayerMap()
	});

</script>


<div class="full-screen" id="map" />

<div id="location" class="marker">HERE</div>

<style>
  .full-screen {
    width: 100vw;
    height: 80vh;
  }

</style>