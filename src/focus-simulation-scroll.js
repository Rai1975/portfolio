const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Configuration
let focusDistance = 300;
const blurIntensity = 10;
const text = "Scroll to change the focus";

// Draw function to render text with varying blur
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the blur amount based on the focus distance
    const textDistance = 300;
    const distanceDifference = Math.abs(textDistance - focusDistance);
    const blurAmount = Math.min(blurIntensity, (distanceDifference / focusDistance) * blurIntensity);

    // Apply blur and draw text
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
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
draw();