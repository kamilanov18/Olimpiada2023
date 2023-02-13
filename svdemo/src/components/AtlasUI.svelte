<script lang='ts'>

  import { enhance } from "$app/forms";
	import { currentConstellation, isConstellationsVisible, isMakingConstellation, targetStar } from "../stores";
  import { Button, Card, Col, Container, Input, Offcanvas, Row, Tooltip } from "sveltestrap";
	import type { ActionData } from "../routes/atlas/$types";
	import type { ConstellationData, StarData } from "src/types";
	import StarInfo from "./StarInfo.svelte";

  export let form: ActionData;
  
  function centerSun() {
    targetStar.set({id:0, rightAscencion:0, declination:0, parallax:0,pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0},scientificName:'Sol',givenName:'Sun',discoverer:'Humanity'});
  }

  let displayConstellations = false;
  let isInConstellationCreationMode = false;
  let constellation: ConstellationData;
  let targetedStar: StarData;

  targetStar.subscribe((val:StarData)=>{
    targetedStar=val;
  });

  currentConstellation.subscribe((val:ConstellationData)=>{
    constellation=val;
  }) 

  function toggleConstellations() {
    displayConstellations=!displayConstellations;
    isConstellationsVisible.set(displayConstellations);
  }

  function toggleConstellationMode() {
    isInConstellationCreationMode=!isInConstellationCreationMode
    isMakingConstellation.set(isInConstellationCreationMode);
  }

  function generateConstellation() {
    console.log(constellation);
  }

  function resetConstellation() {
    currentConstellation.set({name:'',discoverer:'',connections:[],viewedFromStarId:0});
  }

  let open=false;
  function toggle() {open=!open;}
</script>

<style>
  .UIcontainer {
    width: 150px;
  }
</style>
  <Row>a</Row>
  <Row>a</Row>
  <Row>a</Row>
  <Row><Col ><Button on:click={toggle}>Open/Close</Button></Col></Row>
  
  <Offcanvas style="background: linear-gradient(176deg, rgb(18, 24, 27) 50%, rgb(32, 39, 55) 100%);" backdrop={false} isOpen={open} {toggle} header="Start" placement="start">
  
  <Row><Col><Card>
    <form use:enhance method='POST' action='/atlas?/find'>
      <Input name="ra" id="ra" placeholder="Right Ascension" required />
      <Input name="dec" id="dec" placeholder="Declination" required />
      <Row><Col><Button type="submit">Find Star</Button></Col></Row>
      {#if form?.success}
        {console.log(form.star)}
        {targetStar.set(form.star)}
        <p>success</p>
      {:else if !form?.success}
        <p>fail</p>
      {/if}
    </form>
  </Card></Col></Row>
  <Row><Col><Button on:click={centerSun}>Center Sun</Button></Col></Row>
  <Row>
    <Col><Button on:click={toggleConstellations}> 
      {#if displayConstellations==true}
        Hide 
      {:else}
        Show
      {/if}
      Constellations
    </Button></Col>
  </Row>
  <Row>
    <Button on:click={toggleConstellationMode}>
      {#if isInConstellationCreationMode==true}
        Leave creation 
      {:else}
        Enter creation
      {/if}
      Mode
    </Button>
    <Card>
      <form use:enhance method="POST" action="/atlas?/constellation" >
        <Input hidden id='const-connections' name='const-connections' value={JSON.stringify(constellation)} />
        <Input required id='const-name' name='const-name' />
        <Button type='submit' color='success'  on:click={generateConstellation} >Submit</Button>
        <Button color='danger' on:click={resetConstellation} >Reset</Button>
      </form>
    </Card>
  </Row>
  <Row>
    <span id='tutorial'>?</span>
    <Tooltip target={`tutorial`} >
      <p>
        <span>Use the mouse to look around.</span>
        <span>Scroll / hold scroll button and drag to zoom in or out.</span>
        <span>Click on stars to navigate towards them.</span>
        <span>Name stars which have never been clicked on before.</span>
        <span>Upload images to claim stars in order to make constellations.</span>
        <span>Claimed stars will appear in different colors.</span>
        <span>Constellations can be viewed only from the star which they were created from</span>
      </p>
    </Tooltip>
  </Row>
  <StarInfo starData={targetedStar} />
</Offcanvas>