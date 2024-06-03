export default class VideoPlayer {
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
        if (
          !button.closest('.module__video-item') ||
          button.closest('.module__video-item').getAttribute('data-disabled') !== 'true'
        ) {
          this.activeButton = button;
          this.overlay.style.display = 'flex';
          this.path = button.getAttribute('data-url');
          // Delete the existing iframe and create a new one
          const frameContainer = document.getElementById('frame');
          if (frameContainer) {
            frameContainer.remove();
          }
          const newFrame = document.createElement('div');
          newFrame.setAttribute('id', 'frame');
          this.overlay.appendChild(newFrame);
          this.createPlayer(this.path);
        }
      });
    });
  }

  bindClose() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
		this.overlay.addEventListener('click', (event) => {
			if (!event.target.closest('.player')) {
				this.overlay.style.display = 'none';
				this.player.stopVideo();
			}
		});
  }

  createPlayer(url) {
    // Ensure there's only one 'frame' div at a time
    const existingFrame = this.overlay.querySelector('#frame');
    if (existingFrame) {
      existingFrame.remove();
    }

    const videoContainer = this.overlay.querySelector('.video');
    const frameContainer = document.createElement('div');
    frameContainer.setAttribute('id', 'frame');
    videoContainer.appendChild(frameContainer);

    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });

    this.overlay.style.display = 'flex';
  }

  onPlayerStateChange(state) {
    try {
      const blockedElem =
        this.activeButton.closest('.module__video-item').nextElementSibling;
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
