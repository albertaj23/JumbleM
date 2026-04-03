import { useEffect } from 'react';

function useBrandAnimation() {
  useEffect(() => {
    const body = document.body;
    const beams = document.querySelectorAll('.beam');
    const cards = document.querySelectorAll('.card');

    body.classList.add('is-jumbled');

    const unjumbleTimer = window.setTimeout(() => {
      body.classList.remove('is-jumbled');
    }, 50);

    const beamTimer = window.setTimeout(() => {
      if (beams.length >= 3) {
        beams[0].classList.add('grow-b1');
        beams[1].classList.add('grow-b2');
        beams[2].classList.add('grow-b3');
      }
    }, 300);

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${0.5 + index * 0.08}s`;
    });

    return () => {
      window.clearTimeout(unjumbleTimer);
      window.clearTimeout(beamTimer);
      body.classList.remove('is-jumbled');
      beams.forEach((beam) => beam.classList.remove('grow-b1', 'grow-b2', 'grow-b3'));
      cards.forEach((card) => {
        card.style.transitionDelay = '';
      });
    };
  }, []);
}

export default useBrandAnimation;
