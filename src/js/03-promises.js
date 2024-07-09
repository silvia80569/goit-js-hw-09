import Notiflix from 'notiflix';

// Importă module individuale
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const firstDelay = parseInt(formData.get('delay'));
    const stepDelay = parseInt(formData.get('step'));
    const amount = parseInt(formData.get('amount'));

    for (let i = 0; i < amount; i++) {
      const delay = firstDelay + i * stepDelay;
      try {
        const result = await createPromise(i + 1, delay);
        console.log(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
        Notify.success(`Fulfilled promise ${result.position} in ${result.delay}ms`);
      } catch (error) {
        console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
        Notify.failure(`Rejected promise ${error.position} in ${error.delay}ms`);
      }
    }
  });
});
