<script lang="ts">
	import { Button } from 'sveltestrap/src';
	let isSubmitClicked = false;

	const changeState = () => {
		isSubmitClicked = true;
	};
	const sendFileToImgur = (file: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			if (typeof reader.result === 'string') {
				const base64Data = reader.result.split(',')[1];
                const formData = new FormData();
                formData.append('image', base64Data);
                formData.append('type', 'base64');
                formData.append('client_id', '4617dcdecfebf68');
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: 'Bearer c04a2c01ee2951ba49117b9ce192312171402a2b',
                    },
                    body: formData
                };
                fetch('https://api.imgur.com/3/upload', options)
                    .then(response => response.json())
                    .then(response => console.log(response.data.link))
                    .catch(err => console.error(err));
			}
		};
	};

	const dropHandler = (ev: Event | undefined) => {
		if (ev) {
			console.log('File(s) dropped');

			// Prevent default behavior (Prevent file from being opened)
			(ev as DragEvent).preventDefault();

			if ((ev as DragEvent).dataTransfer.items) {
				// Use DataTransferItemList interface to access the file(s)
				[...(ev as DragEvent).dataTransfer.items].forEach((item, i) => {
					// If dropped items aren't files, reject them
					if (item.kind === 'file') {
						const file = item.getAsFile();
						if (file) {
							console.log(`… file[${i}].name = ${file.name}`);
							sendFileToImgur(file);
						}
					}
				});
			} else {
				// Use DataTransfer interface to access the file(s)
				[...(ev as DragEvent).dataTransfer.files].forEach((file, i) => {
					console.log(` file[${i}].name = ${file.name}`);
				});
			}
		}
	};

	const dragOverHandler = (ev: DragEvent) => {
		console.log('File(s) in drop zone');

		// Prevent default behavior (Prevent file from being opened)
		ev.preventDefault();
	};
</script>

<div class="center-items" style="top:10%;position:absolute">
	<h1>Upload Photo</h1>
	<br />
	<p>Here you can upload a picture of the night sky and identify the stars you have captured.</p>
	<p>
		After submiting a picture via the drag-and-drop or by selecting a picture, wait for the map to
		load in order to see the stars
	</p>

	<br />
	<div id="form" style="top: 15%;width:auto;height:max-content;">
		<div id="drop_zone" on:drop={dropHandler} on:dragover={dragOverHandler}>
			<label for="img">Select image:</label>
			<input type="file" id="img" name="img" accept="image/*" />
			<div style="padding-left:80%">
				<Button color="primary" on:click={() => dropHandler(event)}>Submit</Button>
			</div>

			<p>Drag one file to this <i>drop zone</i>.</p>
		</div>
	</div>
</div>

<style>
	#drop_zone {
		border: 5px solid blue;
		width: 99%;
		height: 40%;
	}

	@media screen and (max-width: 600px) {
		p {
			padding-left: 10%;
			padding-right: 10%;
			text-align: center;

			letter-spacing: 0.8px;
		}
	}
	#form {
		top: 15%;
		width: 90%;
		height: max-content;
	}
</style>
