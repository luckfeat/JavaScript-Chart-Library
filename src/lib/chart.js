import template from './chart.template';

const defaultOptions = {
  percent: 0,
  duration: 1000,
  frame: 30,
};

class Chart {
  #template = template;
  #el;
  #percent;
  #duration;
  #label;
  #frame;
  #handle;

  constructor(container, data = {}) {
    const { duration, frame, percent } = { ...defaultOptions, data };

    this.#duration = duration;
    this.#frame = frame;
    this.#percent = percent;
    this.#el = document.querySelector(container);
  }

  set percent(per) {
    this.#percent = per;
  }

  set duration(dur) {
    this.#duration = dur;
  }

  set frame(fr) {
    this.#frame = fr;
  }

  set label(text) {
    this.#label = text;
  }

  render() {
    this.#el.innerHTML = this.#template({
      percent: this.#percent * 10,
      duration: `${this.#duration / 1000}s`,
      label: this.#label,
    });

    const maxLoop = Math.floor(this.#duration / (1000 / this.#frame));
    let loopCount = 0;

    this.#handle = setInterval(() => {
      loopCount++;

      this.#el.querySelector('#progress').innerHTML =
        loopCount > maxLoop
          ? `${this.#percent}%`
          : `${Math.floor(this.#percent / maxLoop) * loopCount}%`;

      if (loopCount > maxLoop) {
        clearInterval(this.#handle);
      }
    }, 1000 / this.#frame);
  }
}

export default Chart;
