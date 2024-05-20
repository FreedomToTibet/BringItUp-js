export default class Difference {
	constructor(oldOffice, newOffice, points) {
		try {
			this.oldOffice = document.querySelector(oldOffice);
			this.newOffice = document.querySelector(newOffice);
			this.oldPoints = this.oldOffice.querySelectorAll(points);
			this.newPoints = this.newOffice.querySelectorAll(points);
			this.oldCounter = 0;
			this.newCounter = 0;
		} catch (e) {}
	}

	bindTriggers(container, items, counter) {
		container.querySelector('.plus').addEventListener('click', () => {
			if (counter !== items.length - 2) {
				items[counter].classList.add('animated', 'slideInUp');
				items[counter].style.display = 'flex';
				counter++;
			} else {
				items[counter].classList.add('animated', 'slideInUp');
				items[counter].style.display = 'flex';
				items[items.length - 1].classList.add('animated', 'slideOutDown');
				setTimeout(() => {
					items[items.length - 1].style.display = 'none';
					items[items.length - 1].remove();
				}, 1000);
			}
		});
	}

	hidePoints(points) {
		points.forEach((point, index, arr) => {
			if (index !== arr.length - 1) {
				point.style.display = 'none';
			}
		});
	}

	init() {
		try {
			this.hidePoints(this.oldPoints);
			this.hidePoints(this.newPoints);
			this.bindTriggers(this.oldOffice, this.oldPoints, this.oldCounter);
			this.bindTriggers(this.newOffice, this.newPoints, this.newCounter);
		} catch (e) {}
	}
}