/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-plusplus */

let dimension = 16;
const gridWidth = 550;
let useGradient = false;
let useRandom = false;
let useEraser = false;

const dimensionDisplay = document.querySelector('span.dimensionDisplay');
dimensionDisplay.textContent = `${dimension} x ${dimension}`;

// COLOR FUNCTIONS
const getRandomColor = () => {
  // https://stackoverflow.com/questions/1484506/random-color-generator
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const handleSquareHoverPencil = (e) => {
  e.target.style.backgroundColor = 'rgba(0, 0, 0, 1)';
};

const handleSquareHoverEraser = (e) => {
  e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
};

const handleSquareHoverRandom = (e) => {
  e.target.style.backgroundColor = getRandomColor();
};

const handleSquareHoverGradient = (e) => {
  const currentColor = getComputedStyle(e.target).backgroundColor;

  // Get current rgb
  let rgba = currentColor.split(' ');
  let r = rgba[0];
  r = r.replace('r', '');
  r = r.replace('g', '');
  r = r.replace('b', '');
  r = r.replace('(', '');
  r = r.replace(',', '');
  // Darken rgb
  if (r < 25) {
    r = 0;
  } else {
    r -= 25;
  }
  e.target.style.backgroundColor = `rgba(${r}, ${r}, ${r}, 1)`;
};

const assignSquareClassNames = () => {
  const gridContainer = document.querySelector('div.gridContainer');
  for (let i = 0; i < gridContainer.children.length; i++) {
    const rowContainer = gridContainer.children[i];
    rowContainer.className = 'sketchPadRow';
    for (let j = 0; j < rowContainer.children.length; j++) {
      const square = rowContainer.children[j];
      square.style['background-color'] = 'white';
    }
  }
};

const assignSquareEventListeners = () => {
  const gridContainer = document.querySelector('div.gridContainer');
  for (let i = 0; i < gridContainer.children.length; i++) {
    const rowContainer = gridContainer.children[i];
    rowContainer.className = 'sketchPadRow';
    for (let j = 0; j < rowContainer.children.length; j++) {
      // Reassign event listener for current square
      const square = rowContainer.children[j];
      const newSquare = square.cloneNode(true);
      square.parentNode.replaceChild(newSquare, square);
      if (useEraser) {
        newSquare.addEventListener('mouseover', handleSquareHoverEraser);
      } else if (useRandom) {
        newSquare.addEventListener('mouseover', handleSquareHoverRandom);
      } else if (useGradient) {
        newSquare.addEventListener('mouseover', handleSquareHoverGradient);
      } else {
        newSquare.addEventListener('mouseover', handleSquareHoverPencil);
      }
    }
  }
};

const makeBlankSketchPad = (numSquares) => {
  // Build a blank n x n grid
  const gridContainer = document.querySelector('div.gridContainer');
  for (let i = 0; i < numSquares; i++) {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'sketchPadRow';
    rowContainer.style['max-height'] = `${gridWidth / numSquares}px`;
    for (let j = 0; j < numSquares; j++) {
      const square = document.createElement('div');
      square.className = 'sketchPadSquareBlank';
      square.style.height = `${gridWidth / numSquares}px`;
      square.style.width = `${gridWidth / numSquares}px`;
      rowContainer.appendChild(square);
    }
    gridContainer.appendChild(rowContainer);
  }
  assignSquareEventListeners();
};

const handleDimensionChange = (e) => {
  dimension = e.target.value;
  dimensionDisplay.textContent = `${dimension} x ${dimension}`;
  const gridContainer = document.querySelector('div.gridContainer');
  gridContainer.textContent = '';
  makeBlankSketchPad(dimension);
};
const dimensionInput = document.querySelector('input.dimensionInput');
dimensionInput.addEventListener('change', handleDimensionChange);

// BUTTON CLICK HANDLERS
// Attach resetButton click handler
const resetButton = document.querySelector('button.resetButton');
resetButton.addEventListener('click', () => {
  useGradient = false;
  useRandom = false;
  useEraser = false;
  const GradientButton = document.querySelector('button.gradientButton');
  GradientButton.classList.remove('buttonClicked');
  const RandomButton = document.querySelector('button.randomButton');
  RandomButton.classList.remove('buttonClicked');
  const EraserButton = document.querySelector('button.eraserButton');
  EraserButton.classList.remove('buttonClicked');
  assignSquareClassNames('sketchPadSquareBlank');
});

const handleGradientButtonClick = () => {
  useGradient = !useGradient;
  if (useGradient) {
    useRandom = false;
    useEraser = false;
    const randomButton = document.querySelector('button.randomButton');
    const eraserButton = document.querySelector('button.eraserButton');
    randomButton.classList.remove('buttonClicked');
    eraserButton.classList.remove('buttonClicked');
  }

  const GradientButton = document.querySelector('button.gradientButton');
  if (useGradient) {
    GradientButton.classList.add('buttonClicked');
  } else {
    GradientButton.classList.remove('buttonClicked');
  }
  assignSquareEventListeners();
};
const useGradientButton = document.querySelector('button.gradientButton');
useGradientButton.addEventListener('click', handleGradientButtonClick);

const handleRandomButtonClick = () => {
  useRandom = !useRandom;
  if (useRandom) {
    useGradient = false;
    useEraser = false;
    const gradientButton = document.querySelector('button.gradientButton');
    const eraserButton = document.querySelector('button.eraserButton');
    gradientButton.classList.remove('buttonClicked');
    eraserButton.classList.remove('buttonClicked');
  }

  const RandomButton = document.querySelector('button.randomButton');
  if (useRandom) {
    RandomButton.classList.add('buttonClicked');
  } else {
    RandomButton.classList.remove('buttonClicked');
  }
  assignSquareEventListeners();
};
const useRandomButton = document.querySelector('button.randomButton');
useRandomButton.addEventListener('click', handleRandomButtonClick);

const handleEraserButtonClick = () => {
  useEraser = !useEraser;
  if (useEraser) {
    useGradient = false;
    useRandom = false;
    const gradientButton = document.querySelector('button.gradientButton');
    const randomButton = document.querySelector('button.randomButton');
    gradientButton.classList.remove('buttonClicked');
    randomButton.classList.remove('buttonClicked');
  }

  const eraserButton = document.querySelector('button.eraserButton');
  if (useEraser) {
    eraserButton.classList.add('buttonClicked');
  } else {
    eraserButton.classList.remove('buttonClicked');
  }
  assignSquareEventListeners();
};
const useEraserButton = document.querySelector('button.eraserButton');
useEraserButton.addEventListener('click', handleEraserButtonClick);

// Make initial blank grid
makeBlankSketchPad(dimension);
