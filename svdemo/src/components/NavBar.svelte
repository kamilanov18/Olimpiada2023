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
		ModalHeader,
		InputGroup,
		InputGroupText,
		Input,
		Form
	} from 'sveltestrap/src';

  //register
	 let isRegisterOpen = false;

	const toggleRegister = () => {
		isRegisterOpen = !isRegisterOpen;
	};


//login
  let isLoginOpen = false;

	const toggleIsLoged = () => {
		isLoginOpen = !isLoginOpen;
	};

  //isHamburger
	let isOpen = false;
	function handleUpdate(event: any) {
		isOpen = event.detail.isOpen;
	}

  //logout
	let isLoggedIn = false;
	function toggleLogin() {
		isLoggedIn = !isLoggedIn;
	}
</script>

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

      <!-------------REGISTER------------->
      <div class="d-grid gap-2 d-md-flex">
				<div>
					<Button  class="me-md-2" color="light" outline on:click={toggleRegister}>Register</Button>
					<Modal isOpen={isRegisterOpen} toggle={toggleRegister}>
            <Form method="post" action="/register">
						<ModalHeader toggle={toggleRegister}>Register form</ModalHeader>
						<ModalBody>
							
								<InputGroup>
									<InputGroupText>📧</InputGroupText>
									<Input type="email" name="email" id="exampleEmail" placeholder="Email" required />
								</InputGroup>
								<br />
								<InputGroup>
									<InputGroupText>@</InputGroupText>
									<Input type="text" name="username" placeholder="Username" required />
								</InputGroup>
                <br />
								<InputGroup>
									<InputGroupText>🔒</InputGroupText>
									<Input
										type="password"
										name="password"
										id="examplePassword"
										placeholder="Password"
                    required
									/>
								</InputGroup>
                <br/>
                <InputGroup>
                  
									<Input style="border-radius: 5px;" type="text" name="firstName" placeholder="First Name" required />
                  <div style="width: 5%;"></div>
                  <Input style="border-radius: 5px;" type="text" name="lastName" placeholder="Last Name" required />
                </InputGroup>
							
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit" >Submit</Button>
							<Button color="secondary" on:click={toggleRegister}>Cancel</Button>
						</ModalFooter>
          </Form>
					</Modal>
				</div>
      </div>

        <!-------------/REGISTER------------->
<!-------------LOGIN------------->
        <div>
					<Button color="light" outline on:click={toggleIsLoged}>Login</Button>
					<Modal isOpen={isLoginOpen} toggle={toggleIsLoged}>
            <Form method="post" action="/login">
						<ModalHeader toggle={toggleIsLoged}>Login form</ModalHeader>
						<ModalBody>
								<InputGroup>
									<InputGroupText>@</InputGroupText>
									<Input type="text" name="username" placeholder="Username" required />
								</InputGroup>
                <br />
								<InputGroup>
									<InputGroupText>🔒</InputGroupText>
									<Input
										type="password"
										name="password"
										id="examplePassword"
										placeholder="Password"
                    required
									/>
								</InputGroup>
							
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit" >Submit</Button>
							<Button color="secondary" on:click={toggleIsLoged}>Cancel</Button>
						</ModalFooter>
          </Form>
					</Modal>
				</div>

        <!-------------/LOGIN------------->
			{:else}
				<NavItem>
					<NavLink href="#" on:click={toggleLogin}>Logout</NavLink>
				</NavItem>
			{/if}
		</Nav>
	</Collapse>
</Navbar>

<style>
	:global(*) {
		color: aliceblue;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
	:global(div.modal-content) {
		background-color: rgb(42, 46, 53) !important;
	}
</style>
