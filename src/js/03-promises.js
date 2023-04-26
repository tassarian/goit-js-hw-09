import Notiflix from "notiflix";

const submitBtn = document.querySelector('[type="submit"]');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let position = 1; 
  let delay = parseInt(document.querySelector('[name="delay"]').value);
  const step = parseInt(document.querySelector('[name="step"]').value);
  const amount = parseInt(document.querySelector('[name="amount"]').value);

  for (let i = 0; i < amount; i++) {
    createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    position += 1; 
    delay += step;
  }
})

  function createPromise(position, delay) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          rejected({ position, delay });
        }
    }, delay)
  })
}

