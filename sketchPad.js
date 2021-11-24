/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-plusplus */
// const {} = require('./buttonClickHandlers.js');

let dimension = 16;
const gridWidth = 550;
let useColor = false;
let useRandom = false;
let useEraser = false;

const dimensionDisplay = document.querySelector('span.dimensionDisplay');
dimensionDisplay.textContent = `${dimension} x ${dimension}`;

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
  e.target.className = 'sketchPadSquareFilled';
};

const handleSquareHoverEraser = (e) => {
  e.target.className = 'sketchPadSquareBlank';
};

const handleSquareHoverRandom = (e) => {
  e.target.style['background-color'] = getRandomColor();
};

const assignSquareClassNames = (className) => {
  const gridContainer = document.querySelector('div.gridContainer');
  for (let i = 0; i < gridContainer.children.length; i++) {
    const rowContainer = gridContainer.children[i];
    rowContainer.className = 'sketchPadRow';
    for (let j = 0; j < rowContainer.children.length; j++) {
      const square = rowContainer.children[j];
      square.className = className;
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
      } else {
        newSquare.addEventListener('mouseover', handleSquareHoverPencil);
      }
    }
  }
};

// Attach resetButton click handler
const resetButton = document.querySelector('button.resetButton');
resetButton.addEventListener('click', () => {
  assignSquareClassNames('sketchPadSquareBlank');
});

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

const handleColorButtonClick = () => {
  useColor = !useColor;
  if (useColor) {
    useRandom = false;
    useEraser = false;
    const randomButton = document.querySelector('button.randomButton');
    const eraserButton = document.querySelector('button.eraserButton');
    randomButton.classList.remove('buttonClicked');
    eraserButton.classList.remove('buttonClicked');
  }

  const ColorButton = document.querySelector('button.colorButton');
  if (useColor) {
    ColorButton.classList.add('buttonClicked');
  } else {
    ColorButton.classList.remove('buttonClicked');
  }
  assignSquareEventListeners();
};
const useColorButton = document.querySelector('button.colorButton');
useColorButton.addEventListener('click', handleColorButtonClick);

const handleRandomButtonClick = () => {
  useRandom = !useRandom;
  if (useRandom) {
    useColor = false;
    useEraser = false;
    const colorButton = document.querySelector('button.colorButton');
    const eraserButton = document.querySelector('button.eraserButton');
    colorButton.classList.remove('buttonClicked');
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
    useColor = false;
    useRandom = false;
    const colorButton = document.querySelector('button.colorButton');
    const randomButton = document.querySelector('button.randomButton');
    colorButton.classList.remove('buttonClicked');
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
