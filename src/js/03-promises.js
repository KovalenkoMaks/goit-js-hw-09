import Notiflix from 'notiflix';
const refs = {
  formEl: document.querySelector('form'),
  delayInput: document.querySelector('input[name=delay]'),
  stepInput: document.querySelector('input[name=step]'),
  amountInput: document.querySelector('input[name=amount]'),
  formBtn: document.querySelector('button'),
};

refs.formEl.addEventListener('submit', event => {
  event.preventDefault();
  refs.formBtn.setAttribute('disabled', '');
  let delay = Number(refs.delayInput.value);
  let step = Number(refs.stepInput.value);
  let amount = Number(refs.amountInput.value);
  let firstDelay = 0;
  let total = delay + amount * step;

  for (let position = 0; position < amount; position += 1) {
    firstDelay = delay + step * position;
    createPromise(position + 1, firstDelay)
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
  }

  // position = 0;
  setTimeout(() => {
    refs.formBtn.removeAttribute('disabled', '');
  }, total);
});

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
