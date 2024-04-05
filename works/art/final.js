let socket = io.connect('https://showy-sedate-run.glitch.me');

socket.on('connect', () => {
    console.log(socket.id); // Now it should be defined
    socket.emit('getCanvas', {id: socket.id});
});

socket.onAny((event, ...args) => {
    if (event != "timerEnded") {
        console.log(`Received event: ${event}`, args);
    }
});

socket.on('sentCanvas', (data) => {
    console.log(data);
    if (data.id === socket.id) {
        console.log("Got a canvas");
        const img = new Image();
        img.src = data.canvas;
        
        // Style the image to be centered
        img.style.position = 'absolute';
        img.style.left = '50%';
        img.style.top = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.maxWidth = '90%'; // Limits image size to not overflow the viewport
        img.style.maxHeight = '90%';
        img.style.objectFit = 'contain';
        
        // Append the image to the body of the document
        document.body.appendChild(img);
    }
});

console.log("ok");
