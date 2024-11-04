const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Configuration
let focusDistance = 300;
const blurIntensity = 10;

// Load the image
const image = new Image();
image.src = '../assets/DSC_1970.jpg';
image.onload = draw;

// Function to calculate the aspect ratio and scale the image to fit the canvas
function getScaledDimensions(img, maxWidth, maxHeight) {
    const widthRatio = maxWidth / img.width;
    const heightRatio = maxHeight / img.height;
    const scale = Math.min(widthRatio, heightRatio);
    return {
        width: img.width * scale,
        height: img.height * scale
    };
}

// Draw function to render the image with varying blur
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the blur amount based on the focus distance
    const imageDistance = 300;
    const distanceDifference = Math.abs(imageDistance - focusDistance);
    const blurAmount = Math.min(blurIntensity, (distanceDifference / focusDistance) * blurIntensity);

    // Get the scaled dimensions to fit the canvas
    const { width, height } = getScaledDimensions(image, canvas.width, canvas.height);

    // Apply blur and draw the scaled image centered on the canvas
    ctx.filter = `blur(${blurAmount}px)`;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;
    ctx.drawImage(image, x, y, width, height);

    // Reset filter
    ctx.filter = 'none';
}

// Update focus distance based on scroll position
window.addEventListener('scroll', () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollRatio = window.scrollY / maxScroll;

    // Map scroll position to focus distance range (e.g., 100 to 500)
    focusDistance = 100 + scrollRatio * 900;
    draw();
});

// Initial draw
image.onload = draw;
