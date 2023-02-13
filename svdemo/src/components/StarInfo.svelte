<script lang='ts'>
	import type { StarData } from "src/types";
	import { Button, Card, Input } from "sveltestrap";

    export let starData: StarData
</script>
    
<style>
    .infotext {
        color:black
    }
</style>

<Card>
    {#if starData.discoverer===undefined}
        <form method="POST">
            <Input required name='star-name' id='star-name' />
            <Button color='info'>Discover Star!</Button>
         </form>
    {:else}
        <p class='infotext' >Given Name: {starData.givenName}</p>
        <p class='infotext' >Discovered By: {starData.discoverer}</p>
    {/if}
    <p class='infotext' >Scientific Name: {starData.scientificName}</p>
    <p class='infotext' >Right Ascension: {starData.rightAscencion}</p>
    <p class='infotext' >Declination: {starData.declination}</p>
    <p class='infotext'>Parallax: {starData.parallax}</p>
    <p class='infotext'>Apparent magnitude: {starData.mag}</p>
</Card>