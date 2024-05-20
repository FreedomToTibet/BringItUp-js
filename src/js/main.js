import MainSlider from './modules/slider/slider-main.js';
import MiniSlider from './modules/slider/slider-mini.js';
import VideoPlayer from './modules/playVideo.js';
import Difference from './modules/difference.js';
import Form from './modules/form.js';
import ShowInfo from './modules/showInfo.js';
import Download from './modules/download.js';

window.addEventListener('DOMContentLoaded', () => {

	if (document.querySelector('.page')) {
		const slider = new MainSlider({container:'.page', buttons:'.next'});
		slider.render();
		new VideoPlayer('.showup .play', '.overlay').init();
		new VideoPlayer('.schedule .play', '.overlay').init();
		new VideoPlayer('.feed__item .playvideo', '.overlay').init();
	}
	
	if (document.querySelector('.moduleapp')) {
		const modulePageSlider = new MainSlider({container:'.moduleapp', buttons:'.next'});
		modulePageSlider.render();
		new VideoPlayer('.module__video-item .play', '.overlay').init();
	}	

	const showUpSlider = new MiniSlider({
		container: '.showup__content-slider',
		prev: '.showup__prev',
		next: '.showup__next',
		activeClass: 'card-active',
		animate: true
	});
	showUpSlider.init();

	const modulesSlider = new MiniSlider({
		container: '.modules__content-slider',
		prev: '.modules__info-btns .slick-prev',
		next: '.modules__info-btns .slick-next',
		activeClass: 'card-active',
		animate: true,
		autoPlay: true
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		container: '.feed__slider',
		prev: '.feed__slider .slick-prev',
		next: '.feed__slider .slick-next',
		activeClass: 'feed__item-active'
	});
	feedSlider.init();

	new Difference('.officerold', '.officernew', '.officer__card-item').init();

	new Form('.form').init();

	new ShowInfo('.plus__content').init();

	new Download('.download').init();
});