import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import swal from 'sweetalert';

const refs = {
  timerEl: document.querySelector('.timer'),
  textFieldEl: document.querySelectorAll('.field'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let dates;
let startBtnIdInterval = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      swal('Sorry!', 'Please choose a date in the future', 'error');
      refs.startBtn.setAttribute('disabled', '');
      return;
    }
    dates = selectedDates[0].getTime();
    refs.startBtn.removeAttribute('disabled');
  },
};

refs.startBtn.setAttribute('disabled', '');
refs.timerEl.style = `display: flex;  justify-content: center; gap: 50px; margin-top: 80px;`;
refs.textFieldEl.forEach(
  elem =>
    (elem.style = `display: flex;flex-direction: column; align-items: center; font-weight: 600; font-size: 42px; `)
);

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', () => {
  startBtnIdInterval = setInterval(() => {
    if (dates - Date.now() <= 0) {
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
      swal('Good job!', 'Time is over! ;) ', 'success');

      clearInterval(startBtnIdInterval);
      refs.startBtn.setAttribute('disabled', '');
      return;
    }
    let textContent = convertMs(dates - Date.now());
    refs.days.textContent = textContent.days;
    refs.hours.textContent = textContent.hours;
    refs.minutes.textContent = textContent.minutes;
    refs.seconds.textContent = textContent.seconds;
  }, 1000);
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = dowbleNumbers(Math.floor(ms / day));
  // Remaining hours
  const hours = dowbleNumbers(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = dowbleNumbers(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = dowbleNumbers(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function dowbleNumbers(value) {
  return String(value).padStart(2, '0');
}
