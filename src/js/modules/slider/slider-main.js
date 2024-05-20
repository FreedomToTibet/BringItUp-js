import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(buttons) {
    super(buttons);
  }

  showSlides(n) {
      if (n >= this.slides.length) {
        this.slideIndex = 0;
      }
      if (n < 0) {
        this.slideIndex = this.slides.length - 1;
      }

    try {
      this.hanson.style.opacity = '0';
      if (this.slideIndex === 2) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 2000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {}

    Array.from(this.slides).forEach((slide) => {
      slide.style.display = 'none';
      slide.classList.remove('animated', 'fadeIn');
    });

    this.slides[this.slideIndex].style.display = 'block';
    this.slides[this.slideIndex].classList.add('animated', 'fadeIn');
  }

	bindTriggers() {
		this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        try {this.slides[this.slideIndex].classList.remove('animated', 'fadeIn');} catch (e) {}
        this.showSlides((this.slideIndex += 1));
      });

      button.parentNode.previousElementSibling.addEventListener('click', (event) => {
        event.preventDefault();
        this.slides[this.slideIndex].classList.remove('animated', 'fadeIn');
        // this.slideIndex = 0;
        this.showSlides(this.slideIndex);
      });
    });

		document.querySelectorAll('.prevmodule').forEach((button) => {
			button.addEventListener('click', (event) => {
				event.stopPropagation();
				event.preventDefault();
				this.slides[this.slideIndex].classList.remove('animated', 'fadeIn');
				this.showSlides((this.slideIndex -= 1));
			});
		});

		document.querySelectorAll('.nextmodule').forEach((button) => {
			button.addEventListener('click', (event) => {
				event.stopPropagation();
				event.preventDefault();
				this.slides[this.slideIndex].classList.remove('animated', 'fadeIn');
				this.showSlides((this.slideIndex += 1));
			});
		});
	}

  render = () => {
    try {
      this.hanson = document.querySelector('.hanson');
    } catch (e) {}
		
    this.showSlides(this.slideIndex);
		this.bindTriggers();
  };
}
