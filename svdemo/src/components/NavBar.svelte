<script lang="ts">
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Styles,
    Button,
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader
  } from 'sveltestrap/src';

  export let open = false;
    
    const toggle = () => {
      open = !open;
    };

  let isOpen = false;
  let isLoggedIn = false;

  function handleUpdate(event:any) {
    isOpen = event.detail.isOpen;
  }

  function toggleLogin() {
    isLoggedIn = !isLoggedIn;
  }
</script>
<style>
  :global(*){
      color:aliceblue;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  :global(div.modal-content){
    background-color: black !important;
  }
  </style>
<Styles />
<Navbar color="dark" dark expand="md">
  <NavbarBrand href="/index">StarIndex</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="https://github.com/kamilanov18/Olimpiada2023">GitHub</NavLink>
      </NavItem>
    </Nav>
    <Nav navbar class="ml-auto">
      {#if !isLoggedIn}


        <div>
          <Button color="light" outline on:click={toggle}>Login</Button>
          <Modal isOpen={open} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" on:click={toggleLogin}>Do Something</Button>
              <Button color="secondary" on:click={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>


      {:else}
        <NavItem>
          <NavLink href="#" on:click={toggleLogin}>Logout</NavLink>
        </NavItem>
      {/if}
    </Nav>
  </Collapse>
</Navbar>
