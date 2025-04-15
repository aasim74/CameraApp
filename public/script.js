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