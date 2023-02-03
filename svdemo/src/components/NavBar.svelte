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

	export let open = false;

	const toggle = () => {
		open = !open;
	};

	let isOpen = false;
	let isLoggedIn = false;

	function handleUpdate(event: any) {
		isOpen = event.detail.isOpen;
	}

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
				<div>
					<Button color="light" outline on:click={toggle}>Login</Button>
					<Modal isOpen={open} {toggle}>
						<ModalHeader {toggle}>Login form</ModalHeader>
						<ModalBody>
							<Form>
								<InputGroup>
									<InputGroupText>📧</InputGroupText>
									<Input type="email" name="email" id="exampleEmail" placeholder="Email" />
								</InputGroup>
								<br />
								<InputGroup>
									<InputGroupText>@</InputGroupText>
									<Input type="text" placeholder="Username" />
								</InputGroup>
                <br />
								<InputGroup>
									<InputGroupText>🔒</InputGroupText>
									<Input
										type="password"
										name="password"
										id="examplePassword"
										placeholder="Password"
									/>
								</InputGroup>
                <br/>
                <InputGroup>
                  
									<Input style="border-radius: 5px;" type="text" placeholder="First Name" />
                  <div style="width: 5%;"></div>
                  <Input style="border-radius: 5px;" type="text" placeholder="Last Name" />
                </InputGroup>
							</Form>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" on:click={toggleLogin}>Submit</Button>
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

<style>
	:global(*) {
		color: aliceblue;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
	:global(div.modal-content) {
		background-color: rgb(42, 46, 53) !important;
	}
</style>
