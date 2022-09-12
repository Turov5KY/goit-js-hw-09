import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  timerText: document.querySelector('.timer'),
  field: document.querySelectorAll('.field'),
};

const {
  startBtn,
  input,
  daysEl,
  hoursEl,
  minutesEl,
  secondsEl,
  timerText,
  field,
} = refs;

let selectedTime = null;
let currentTime = null;
let timerId = null;

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkTimeAvailable(selectedDates);
  },
};
flatpickr('#datetime-picker', options);

function checkTimeAvailable(currentDate) {
  selectedTime = currentDate[0].getTime();
  currentTime = Date.now();
  if (selectedTime > currentTime) {
    startBtn.removeAttribute('disabled');
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
    const checkDisableBtn = startBtn.hasAttribute('disabled');
    if (!checkDisableBtn) {
      startBtn.setAttribute('disabled', true);
    }
  }
}

function onStartClick() {
  input.setAttribute('disabled', true);
  startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    currentTime = Date.now();
    const countDownTime = selectedTime - currentTime;
    if (selectedTime <= currentTime) {
      clearInterval(timerId);
      alert('You time is up!');
      return;
    }
    const time = convertMs(countDownTime);
    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

///////////

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

timerText.style.display = 'flex';
timerText.style.justifyContent = 'center';

FieldMargin();
function FieldMargin() {
  field.forEach(element => {
    element.style.marginLeft = '20px';
  });
}

const dataValue = document.querySelectorAll('.value');

valueFontSize();
function valueFontSize() {
  dataValue.forEach(element => {
    element.style.fontSize = '20px';
  });
}
