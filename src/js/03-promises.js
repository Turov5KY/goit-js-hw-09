import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayEl: document.querySelector('input[name=delay]'),
  stepEl: document.querySelector('input[name=step]'),
  amountEl: document.querySelector('input[name=amount]'),
};

const { form, delayEl, stepEl, amountEl } = refs;

form.addEventListener('submit', optionForPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function optionForPromise(e) {
  e.preventDefault();

  const position = Number(amountEl.value);
  let delay = Number(delayEl.value);
  const step = Number(stepEl.value);

  for (let i = 1; i <= position; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay = delay + step;
  }
}
