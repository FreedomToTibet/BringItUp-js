/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
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

/***/ }),

/***/ "./src/js/modules/download.js":
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
class Download {
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

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Loading...',
      success: 'Thank you!',
      failure: 'Something went wrong!'
    };
    this.path = 'assets/question.php';
  }
  clearInputs() {
    this.inputs.forEach(input => {
      input.value = '';
    });
  }
  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');
    mailInputs.forEach(input => {
      input.addEventListener('keypress', function (e) {
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      });
    });
  }
  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
    function createMask(event) {
      let matrix = '+1 (___) ___-____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    let inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }
  async postData(url, data) {
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await res.text();
  }
  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        let statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
					margin: 15px auto 0 auto;
					font-size: 18px;
					color: white;
				`;
        form.parentNode.appendChild(statusMessage);
        statusMessage.textContent = this.message.loading;
        const formData = new FormData(form);
        this.postData(this.path, formData).then(res => {
          console.log(res);
          statusMessage.textContent = this.message.success;
        }).catch(() => {
          statusMessage.textContent = this.message.failure;
        }).finally(() => {
          this.clearInputs();
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
        });
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.buttons = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  bindTriggers() {
    this.buttons.forEach((button, index) => {
      try {
        const blockedElem = button.closest('.module__video-item').nextElementSibling;
        if (index % 2 === 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}
      button.addEventListener('click', () => {
        if (!button.closest('.module__video-item') || button.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeButton = button;
          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';
            if (this.path !== button.getAttribute('data-url')) {
              this.path = button.getAttribute('data-url');
              this.player.loadVideoById({
                videoId: this.path
              });
            }
          } else {
            this.path = button.getAttribute('data-url');
            this.createPlayer(this.path);
          }
        }
      });
    });
  }
  bindClose() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
    this.overlay.style.display = 'flex';
  }
  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeButton.closest('.module__video-item').nextElementSibling;
      const playButton = this.activeButton.querySelector('svg').cloneNode(true);
      if (state.data === 0) {
        if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
          blockedElem.querySelector('.play__circle').classList.remove('closed');
          blockedElem.querySelector('svg').remove();
          blockedElem.querySelector('.play__circle').appendChild(playButton);
          blockedElem.querySelector('.play__text').textContent = 'play video';
          blockedElem.querySelector('.play__text').classList.remove('attention');
          blockedElem.style.opacity = 1;
          blockedElem.style.filter = 'none';
          blockedElem.setAttribute('data-disabled', 'false');
        }
      }
    } catch (e) {}
  }
  init() {
    if (this.buttons.length > 0) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindClose();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/showInfo.js":
/*!************************************!*\
  !*** ./src/js/modules/showInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowInfo)
/* harmony export */ });
class ShowInfo {
  constructor(triggers) {
    this.buttons = document.querySelectorAll(triggers);
  }
  init() {
    this.buttons.forEach(button => {
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

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    Array.from(this.slides).forEach(slide => {
      slide.style.display = 'none';
      slide.classList.remove('animated', 'fadeIn');
    });
    this.slides[this.slideIndex].style.display = 'block';
    this.slides[this.slideIndex].classList.add('animated', 'fadeIn');
  }
  bindTriggers() {
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        try {
          this.slides[this.slideIndex].classList.remove('animated', 'fadeIn');
        } catch (e) {}
        this.showSlides(this.slideIndex += 1);
      });
      button.parentNode.previousElementSibling.addEventListener('click', event => {
        event.preventDefault();
        this.slides[this.slideIndex].classList.remove('animated', 'fadeIn');
        // this.slideIndex = 0;
        this.showSlides(this.slideIndex);
      });
    });
    document.querySelectorAll('.prevmodule').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        event.preventDefault();
        this.slides[this.slideIndex].classList.remove('animated', 'fadeIn');
        this.showSlides(this.slideIndex -= 1);
      });
    });
    document.querySelectorAll('.nextmodule').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        event.preventDefault();
        this.slides[this.slideIndex].classList.remove('animated', 'fadeIn');
        this.showSlides(this.slideIndex += 1);
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

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, prev, next, activeClass, animate, autoPlay) {
    super(container, prev, next, activeClass, animate, autoPlay);
  }
  decorationSlides() {
    Array.from(this.slides).forEach(slide => {
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
          this.decorizeSlides();
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
      this.decorizeSlides();
      if (this.autoPlay) {
        setInterval(() => this.nextSlide(), 5000);
      }
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main.js */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider-mini.js */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_playVideo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/playVideo.js */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_difference_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference.js */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form.js */ "./src/js/modules/form.js");
/* harmony import */ var _modules_showInfo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showInfo.js */ "./src/js/modules/showInfo.js");
/* harmony import */ var _modules_download_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/download.js */ "./src/js/modules/download.js");







window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.page')) {
    const slider = new _modules_slider_slider_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      container: '.page',
      buttons: '.next'
    });
    slider.render();
    new _modules_playVideo_js__WEBPACK_IMPORTED_MODULE_2__["default"]('.showup .play', '.overlay').init();
    new _modules_playVideo_js__WEBPACK_IMPORTED_MODULE_2__["default"]('.schedule .play', '.overlay').init();
    new _modules_playVideo_js__WEBPACK_IMPORTED_MODULE_2__["default"]('.feed__item .playvideo', '.overlay').init();
  }
  if (document.querySelector('.moduleapp')) {
    const modulePageSlider = new _modules_slider_slider_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      container: '.moduleapp',
      buttons: '.next'
    });
    modulePageSlider.render();
    new _modules_playVideo_js__WEBPACK_IMPORTED_MODULE_2__["default"]('.module__video-item .play', '.overlay').init();
  }
  const showUpSlider = new _modules_slider_slider_mini_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoPlay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_slider_mini_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();
  new _modules_difference_js__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officernew', '.officer__card-item').init();
  new _modules_form_js__WEBPACK_IMPORTED_MODULE_4__["default"]('.form').init();
  new _modules_showInfo_js__WEBPACK_IMPORTED_MODULE_5__["default"]('.plus__content').init();
  new _modules_download_js__WEBPACK_IMPORTED_MODULE_6__["default"]('.download').init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map