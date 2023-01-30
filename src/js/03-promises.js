import Notiflix from 'notiflix';
const refs = {
  formEl: document.querySelector('form'),
};

refs.formEl.addEventListener('submit', event => {
  event.preventDefault();

  let delay = Number(refs.formEl.elements['delay'].value);
  let step = Number(refs.formEl.elements['step'].value);
  let amount = Number(refs.formEl.elements['amount'].value);
  let firstDelay = 0;
  let total = delay + amount * step;
  let formBtn = event.target.querySelector('button');

  formBtn.setAttribute('disabled', '');

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

  setTimeout(() => {
    formBtn.removeAttribute('disabled', '');
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
