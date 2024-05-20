export default class ShowInfo {
  constructor(triggers) {
    this.buttons = document.querySelectorAll(triggers);
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const sibling = button.closest('.module__info-show').nextElementSibling;
        sibling.classList.add('animated', 'slideInUp');
        sibling.classList.toggle('msg');
        sibling.style.marginTop = '20px';

        if (button.classList.contains('open')) {
          button.classList.remove('open');
          button.style.animation = 'rotateback 0.5s ease-in-out forwards';
        } else {
          button.classList.add('open');
          button.style.animation = 'rotate 0.5s ease-in-out forwards';
        }
      });
    });
  }
}
