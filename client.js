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

            // Convert the canvas to a Blob and upload it
            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('image', blob, 'capture.png');

                fetch('/upload', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    alert(data.message);
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                });
            }, 'image/png');
        });
    </script>
</body>
</html>
