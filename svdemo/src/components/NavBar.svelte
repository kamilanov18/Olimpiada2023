<script lang="ts">
    import {
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      NavItem,
      NavLink,
      Dropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
      Styles
    } from 'sveltestrap/src';
  
    let isOpen = false;
  
    function handleUpdate(event:any) {
      isOpen = event.detail.isOpen;
    }
  </script>

<style>
    *{
        box-sizing: border-box;
        color:aliceblue;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
    </Collapse>
  </Navbar>