<script lang="ts">
  import { onMount } from 'svelte';
  import { createOpenLayerMap } from './utils/openLayer';

  onMount(createOpenLayerMap);

</script>

<div class="full-screen" id="map" />

<style>
  .full-screen {
    width: 100vw;
    height: 80vh;
  }

</style>