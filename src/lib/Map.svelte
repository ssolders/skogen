<script lang="ts">
  import { onMount } from 'svelte';
  import { createOpenLayerMap } from './utils/openLayer';

  onMount(async () => {
    createOpenLayerMap()
	});

</script>


<div class="full-screen" id="map" />

<div id="info" style="display: none;"></div>
<label for="track">
  track position
  <input id="track" type="checkbox"/>
</label>


<style>
  .full-screen {
    width: 100vw;
    height: 100vh;
  }
</style>