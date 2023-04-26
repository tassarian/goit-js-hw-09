import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let TIME_DIFF = 0;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future')
            startBtn.disabled = true;
        } else {
            TIME_DIFF = selectedDates[0];
            startBtn.disabled = false;
        }
    },
  };

flatpickr('#datetime-picker', options);
  
startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
          startCounter(TIME_DIFF)
      }, 1000)
  })

  function startCounter(TIME_DIFF) {
      let ms = TIME_DIFF - new Date();
      if (ms > 0) {
          changeTextContent(convertMs(ms))
      } else {
          clearInterval(timerId)
      }
        
    
  } 

  function addLeadingZero(value) {
    if (value < 10) {
        return String(value).padStart(2, '0')
      }
      return value
  }

  function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day))
  // Remaining hours
      const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function changeTextContent({days, hours, minutes, seconds}) {
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    daysEl.textContent = days;
}