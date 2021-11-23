/* eslint-disable no-plusplus */
const dimension = 16;

const makeSketchPad = (numSquares) => {
  const sketchPadContainer = document.querySelector('div.sketchPadContainer');
  // const sketchPadGrid = document.createElement('div');

  for (let i = 0; i < numSquares; i++) {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'sketchPadRow';
    for (let j = 0; j < numSquares; j++) {
      const square = document.createElement('div');
      square.className = 'sketchPadSquare';
      rowContainer.appendChild(square);
    }
    sketchPadContainer.appendChild(rowContainer);
  }
};

makeSketchPad(dimension);
