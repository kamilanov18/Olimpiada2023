<script lang="ts">
    
    const sendFileToImgur = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        if(typeof reader.result==='string'){
            const base64Data = reader.result?.split(',')[1];
        const formData = new URLSearchParams();
        formData.append('image', base64Data);
        formData.append('type', 'base64');

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: '3498911fc19e050b7f7bf264387c85aa3dff96f0',
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

const dropHandler = (ev: DragEvent) => {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
if(ev.dataTransfer){
    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if(file){
                    console.log(`… file[${i}].name = ${file.name}`);
                sendFileToImgur(file);
                }
                
            }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...ev.dataTransfer.files].forEach((file, i) => {
            console.log(` file[${i}].name = ${file.name}`);
            sendFileToImgur(file);
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
    <style>
        #drop_zone {
            border: 5px solid blue;
            width: 100%;
            height: 40%;
        }
    </style>




  <form  action="/uploadPhoto" style="top: 15%;width:max-content;height:max-content;">
    <div id="drop_zone" on:drop={dropHandler} on:dragover={dragOverHandler}>
    <label for="img">Select image:</label>
    <input type="file" id="img" name="img" accept="image/*">
    <input type="submit" style="color:black">
    
        <p>Drag one or more files to this <i>drop zone</i>.</p>
      </div>
  </form>