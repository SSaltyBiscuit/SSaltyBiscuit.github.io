const n = 10;
const array = [];

init();

function init() {
  for (let i = 0; i < n; ++i) {
    array[i] = Math.random();
  }
  printBars();
}

function play() {
  const sortedArray = [...array];
  const moves = bubbleSort(sortedArray);
  animate(moves);
}

function animate(moves) {
  if (moves.length === 0) {
    printBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }

  printBars(move);
  setTimeout(function () {
    animate(moves);
  }, 500);
}

function printBars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; ++i) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "orange" : "white";
    }
    container.appendChild(bar);
  }
}

function bubbleSort(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; ++i) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}
