export default class Download {
	constructor(triggers) {
		this.buttons = document.querySelectorAll(triggers);
		this.path = 'assets/img/IMG_2815.png';
	}

	downloadItem(path) {
		const element = document.createElement('a');

		element.setAttribute('href', path);
		element.setAttribute('download', 'nice_picture');

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	init() {
		this.buttons.forEach(button => {
			button.addEventListener('click', () => {
				this.downloadItem(this.path);
			});
		});
	}
}