import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(container, prev, next, activeClass, animate, autoPlay) {
    super(container, prev, next, activeClass, animate, autoPlay);
  }

  decorationSlides() {
    Array.from(this.slides).forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide() {
    if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
      this.container.appendChild(this.slides[2]); // Btn
      this.container.appendChild(this.slides[1]); // Btn
      this.container.appendChild(this.slides[0]); // Slide
      this.decorationSlides();
    } else if (this.slides[1].tagName == 'BUTTON') {
      this.container.appendChild(this.slides[1]); // Btn
      this.container.appendChild(this.slides[0]); // Slide
      this.decorationSlides();
    } else {
      this.container.appendChild(this.slides[0]);
      this.decorationSlides();
    }
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());

    this.prev.addEventListener('click', () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== 'BUTTON') {
          let active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decorationSlides();
          break;
        }
      }
    });
  }

  init() {
    try {
			this.container.style.cssText = `
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;
				align-items: flex-start;
			`;

			this.bindTriggers();
			this.decorationSlides();

			if (this.autoPlay) {
				setInterval(() => this.nextSlide(), 5000);
			}
		} catch (e) {}
  }
}
