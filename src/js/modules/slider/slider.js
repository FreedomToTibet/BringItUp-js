export default class Slider {
	constructor({
		container = null,
		buttons = null,
		next = null,
		prev = null,
		activeClass = '',
		animate = false,
		autoPlay = false
	} = {}) {
		this.container = document.querySelector(container);
		try {
			this.slides = this.container.children;
		} catch (e) {}
		this.buttons = document.querySelectorAll(buttons);
		this.prev = document.querySelector(prev);
		this.next = document.querySelector(next);
		this.activeClass = activeClass;
		this.animate = animate;
		this.autoPlay = autoPlay;
		this.slideIndex = 0;
	}
}