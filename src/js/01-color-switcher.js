const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let startIntervalId = null;

refs.startBtn.addEventListener('click', bodyChangeColor);
refs.stopBtn.addEventListener('click', stopbodycolor);

function bodyChangeColor() {
  startIntervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.setAttribute('disabled', 'disabled');
}
function stopbodycolor() {
  clearInterval(startIntervalId);
  refs.startBtn.removeAttribute('disabled');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
