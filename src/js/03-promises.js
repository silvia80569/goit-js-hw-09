import Notiflix from 'notiflix';

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
      notiflix.Notify.Success(`Fulfilled promise ${result.position} in ${result.delay}ms`);
    } catch (error) {
      console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
      notiflix.Notify.Failure(`Rejected promise ${error.position} in ${error.delay}ms`);
    }
  }
});
