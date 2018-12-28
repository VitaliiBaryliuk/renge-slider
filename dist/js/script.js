
(function rengeSlider() {
  const createAndAppendElement = (tag, parrentElem, elemClass) => {
    const createdElem = document.createElement(tag);
    parrentElem.appendChild(createdElem);
    createdElem.classList.add(elemClass);
    return createdElem;
  };

  function createRengeElements() {
    const renge = document.querySelector('.renge');
    const rengeForm = createAndAppendElement('form', renge, 'renge__form');
    const minDiv = createAndAppendElement('div', rengeForm);
    const minLabel = createAndAppendElement('label', minDiv);
    minLabel.textContent = 'Min:    ';
    const minInput = createAndAppendElement('input', minDiv, 'renge__input-min');
    // const maxDiv = createAndAppendElement('div', rengeForm);
    // const maxLabel = createAndAppendElement('label', maxDiv);
    // maxLabel.textContent = 'Max:';
    // const maxInput = createAndAppendElement('input', maxDiv, 'renge__input');
    const rengeDiv = createAndAppendElement('div', renge, 'renge__block');
    const rengeLine = createAndAppendElement('div', rengeDiv, 'renge__line');
    const selectedLine = createAndAppendElement('div', rengeLine, 'renge__selected-line');
    // const minSliderWrapper = createAndAppendElement('div', rengeDiv, 'renge__min-wrapper');
    // const maxSliderWrapper = createAndAppendElement('div', rengeDiv, 'renge__max-wrapper')
    const minSlider = createAndAppendElement('div', rengeDiv, 'renge__min-slider');
    // const maxSlider = createAndAppendElement('div', rengeDiv, 'renge__max-slider');

    const rengeElemsArr = [
      renge,
      rengeForm,
      minDiv,
      minLabel,
      minInput,
      // maxDiv,
      // maxLabel,
      // maxInput,
      rengeDiv,
      rengeLine,
      selectedLine,
      minSlider,
      // maxSlider,
    ];

    return rengeElemsArr;
  }

  // function removeAllEvent(event) {
  //   const min = document.querySelector('.renge__min-slider');
  //   event.target.dataset.mousedown = 'false';
  //   event.target.removeEventListener('mousemove', moveMouseEvent);
  //   document.querySelector('.renge').removeEventListener('mousedown', mouseDownEvent);
  //   document.removeEventListener('mouseup', mouseUpEvent);
  //   event.target.removeEventListener('mouseleave', mouseOutEvent);
  // }

  function setSlectedLine(rengeVal) {
    const rengeLineWidth = document.querySelector('.renge__line').clientWidth;
    const selectedLine = document.querySelector('.renge__selected-line');
    selectedLine.style.width = `${rengeVal * 100 / rengeLineWidth}%`;
  }

  function mouseLeaveEvent(event) {
    if (event.target.classList.contains('renge') === false) {
      document.querySelector('.renge__min-slider').dataset.mousedown = 'false';
    }
  }

  function moveMouseEvent(event) {
    const min = document.querySelector('.renge__min-slider');
    const rengeLineWidth = document.querySelector('.renge__line').clientWidth + document.querySelector('.renge__line').clientLeft * 2;
    // const selectLine = document.querySelector('.renge__selected.line');
    const rengeLeftVal = event.pageX - min.closest('.renge__block').offsetLeft;
    const minBorders = min.clientLeft * 2 * 100 / rengeLineWidth;
    const inp = document.querySelector('.renge__input-min');
    if (
      min.dataset.mousedown === 'true'
      && rengeLeftVal * 100 / rengeLineWidth >= 0
      && rengeLeftVal * 100 / rengeLineWidth <= 100
    ) {
      min.style.left = `${rengeLeftVal * 100 / rengeLineWidth - minBorders}%`;
      // console.log(rengeLeftVal * 100 / rengeLineWidth);
      inp.value = `${Math.ceil(rengeLeftVal * 100 / rengeLineWidth - minBorders)}`;
      setSlectedLine(rengeLeftVal);
    }
  }

  function mouseDownEvent(event) {
    if (event.target.classList.contains('renge__min-slider')) {
      event.target.dataset.mousedown = 'true';
    }
  }

  function mouseUpEvent() {
    document.querySelector('.renge__min-slider').dataset.mousedown = 'false';
  }

  function mouseClickEvent(event) {
    const min = document.querySelector('.renge__min-slider');
    const rengeLeftVal = event.pageX - min.closest('.renge__block').offsetLeft - 10;
    min.style.left = `${rengeLeftVal}px`;
    setSlectedLine(rengeLeftVal);
  }

  function keyDownEnvent(event) {
    console.log(event.keyCode);
    if (event.target.classList.contains('renge__input-min') && event.keyCode === 13) {
      event.preventDefault();
      const min = document.querySelector('.renge__min-slider');
      const minInp = document.querySelector('.renge__input-min');
      const rengeLeftVal = event.pageX - min.closest('.renge__block').offsetLeft - 10;
      console.log(minInp.value);
      if (event.target.value >= 0 && event.target.value <= 100) {
        min.style.left = `${event.target.value}%`;
      }
      setSlectedLine(rengeLeftVal);
    }
  }

  function rengeSliderInit() {
    createRengeElements();
    const renge = document.querySelector('.renge');
    const rengeLine = document.querySelector('.renge__line');

    renge.addEventListener('mousedown', mouseDownEvent);
    document.addEventListener('mousemove', moveMouseEvent);
    document.addEventListener('mouseup', mouseUpEvent);
    rengeLine.addEventListener('click', mouseClickEvent);
    renge.addEventListener('mouseleave', mouseLeaveEvent);
    document.addEventListener('keydown', keyDownEnvent);
  }
  rengeSliderInit();
}());
