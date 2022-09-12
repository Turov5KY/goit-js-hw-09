function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

const { body, start, stop } = refs;

start.addEventListener('click', onStartColorSwitcher);
stop.addEventListener('click', onStopColorSwitcher);
stop.setAttribute('disabled', true);

function onStartColorSwitcher() {
  intervalId = setInterval(() => {
    start.setAttribute('disabled', true);
    stop.removeAttribute('disabled');
    body.style.background = getRandomHexColor();
  }, 1000);
}

function onStopColorSwitcher() {
  start.removeAttribute('disabled');
  stop.setAttribute('disabled', true);

  clearInterval(intervalId);
}
