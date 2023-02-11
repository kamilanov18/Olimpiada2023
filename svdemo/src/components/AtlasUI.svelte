<script>

  import { enhance } from "$app/forms";
import { Button, Card, Col, Form, Input, Row } from "sveltestrap";
  function centerSun() {

  }

  // async function findStar() {
  //   const ra = document.getElementById('ra')?.textContent;
  //   const dec = document.getElementById('dec')?.textContent;
  //   const res = await fetch(`http://localhost:5173?isInitial=false&ra=${ra}&dec=${dec}&p=${0}`,{method:'find'});
  //   const stars = await res.json();
  //   starList.set(stars);
  // }
</script>

<Row><Col><Button>AAA</Button></Col></Row>

<Card>
  <!-- `http://localhost:5173?isInitial=false&ra=${targetedStar.rightAscencion}&dec=${targetedStar.declination}&p=${targetedStar.parallax}` -->
  <Form method='POST' action='?/find'>
    <Input name="ra" id="ra" placeholder="Right Ascension" required />
    <Input name="dec" id="dec" placeholder="Declination" required />
    <Row><Col><Button type="submit">Find Star</Button></Col></Row>
  </Form>
</Card>
<Row><Col><Button on:click={centerSun}>Center Sun</Button></Col></Row>
<Row><Col><Button>Show / Hide Constellations</Button></Col></Row>