function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let colorInterval = null;

startButton.addEventListener('click', () => {
  if (colorInterval) return;  
  startButton.disabled = true;
  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  if (!colorInterval) return;  
  clearInterval(colorInterval);
  colorInterval = null;
  startButton.disabled = false;
});

