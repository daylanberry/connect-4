const calculateWinner = (array, row, col) => {
  console.log(array, row, col, array[row][col]);
  let hasWon = false;
  hasWon =
    hasWon ||
    calculateCols(array, row, col) ||
    calculateRows(array, row, col) ||
    calculateDiagonal(array, row, col);

  return hasWon;
};

const calculateCols = (array, row, col) => {
  let count = 1;
  let match = array[row][col];
  let asc = col + 1;
  let des = col - 1;

  while (array[row][asc]) {
    if (array[row][asc] === match) {
      count++;
      asc++;
    } else {
      break;
    }
  }

  while (array[row][des]) {
    if (array[row][des] === match) {
      count++;
      des--;
    } else {
      break;
    }
  }

  return count >= 4;
};

const calculateRows = (array, row, col) => {
  let count = 1;
  let match = array[row][col];
  let asc = row + 1;
  let des = row - 1;

  while (array[asc]) {
    if (array[asc][col] === match) {
      count++;
      asc++;
    } else {
      break;
    }
  }

  while (array[des]) {
    if (array[des][col] === match) {
      count++;
      des--;
    } else {
      break;
    }
  }

  return count >= 4;
};

const calculateDiagonal = (array, row, col) => {
  let count = 1;
  let match = array[row][col];

  let r = row + 1;
  let c = col + 1;

  while (array[r] && array[r][c]) {
    if (array[r][c] === match) {
      count++;
      r++;
      c++;
    } else {
      break;
    }
  }

  r = row + 1;
  c = col - 1;

  while (array[r] && array[r][c]) {
    if (array[r][c] === match) {
      count++;
      r++;
      c--;
    } else {
      break;
    }
  }

  r = row - 1;
  c = col - 1;

  while (array[r] && array[r][c]) {
    if (array[r][c] === match) {
      count++;
      r--;
      c--;
    } else {
      break;
    }
  }

  r = row - 1;
  c = col + 1;

  while (array[r] && array[r][c]) {
    if (array[r][c] === match) {
      count++;
      r--;
      c++;
    } else {
      break;
    }
  }

  return count >= 4;
};

export default calculateWinner;
