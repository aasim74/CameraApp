<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Camera App</title>
    <style>
        video, canvas {
            display: block;
            margin: auto;
            width: 100%;
            max-width: 400px;
        }
        #capture {
            display: block;
            margin: 20px auto;
        }
    </style>
</head>
<body>
    <h1>Camera App</h1>
    <video id="cameraStream" autoplay></video>
    <button id="capture">Capture Photo</button>
    <canvas id="snapshot"></canvas>

    <script>
        const video = document.getElementById('cameraStream');
        const canvas = document.getElementById('snapshot');
        const captureButton = document.getElementById('capture');

        // Access the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
                alert('Unable to access the camera.');
            });

        // Capture the photo
        captureButton.addEventListener('click', () => {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert the canvas to a data URL
            const imageData = canvas.toDataURL('image/png');

            // Upload the image
            uploadImage(imageData);
        });

        // Function to upload the image
        function uploadImage(imageData) {
            fetch('YOUR_CLOUD_SERVER_API_ENDPOINT', {
                method: 'POST',
                body: JSON.stringify({ image: imageData }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Image uploaded successfully:', data);
                alert('Image uploaded!');
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
        }
    </script>
</body>
</html>
