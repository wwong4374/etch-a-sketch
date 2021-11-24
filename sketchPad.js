/* eslint-disable no-plusplus */
let dimension = 16;
const gridWidth = 550;
let useRainbow = false;
let useEraser = false;

const dimensionDisplay = document.querySelector('span.dimensionDisplay');
dimensionDisplay.textContent = `${dimension} x ${dimension}`;

const handleSquareHoverPencil = (e) => {
  e.target.className = 'sketchPadSquareFilled';
};

const handleSquareHoverEraser = (e) => {
  e.target.className = 'sketchPadSquareBlank';
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

const handleRainbowButtonClick = () => {
  useRainbow = !useRainbow;
  if (useRainbow) {
    useEraser = false;
    const eraserButton = document.querySelector('button.eraserButton');
    eraserButton.classList.remove('eraserButtonClicked');
  }
  const RainbowButton = document.querySelector('button.rainbowButton');
  if (useRainbow) {
    RainbowButton.classList.add('rainbowButtonClicked');
  } else {
    RainbowButton.classList.remove('rainbowButtonClicked');
  }
  assignSquareEventListeners();
};
const useRainbowButton = document.querySelector('button.rainbowButton');
useRainbowButton.addEventListener('click', handleRainbowButtonClick);

const handleEraserButtonClick = () => {
  useEraser = !useEraser;
  if (useEraser) {
    useRainbow = false;
    const rainbowButton = document.querySelector('button.rainbowButton');
    rainbowButton.classList.remove('rainbowButtonClicked');
  }
  const eraserButton = document.querySelector('button.eraserButton');
  if (useEraser) {
    eraserButton.classList.add('eraserButtonClicked');
  } else {
    eraserButton.classList.remove('eraserButtonClicked');
  }
  assignSquareEventListeners();
};
const useEraserButton = document.querySelector('button.eraserButton');
useEraserButton.addEventListener('click', handleEraserButtonClick);

// Make initial blank grid
makeBlankSketchPad(dimension);
