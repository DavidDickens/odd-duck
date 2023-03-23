//'use strict';

const state = [];
let maxRounds = 5;
/* let chartObj = null; */

let trackerEl = document.getElementById('votingTracker');
/* let containerEl = document.getElementById('productImages'); */
let imgEls = document.querySelectorAll('#productImages .container img');
let pEls = document.querySelectorAll('#productImages .container p');

let showResultsBtn = document.getElementById('showResultBtn');
showResultsBtn.style.display = 'none';

/* let resultsTable = document.getElementById('resultsContainer'); */

let canvas = document.getElementById('canvas');

function CreateProduct(name, source, alt) {
  this.name = name;
  this.timesClicked = 0;
  this.timesShown = 0;
  this.source = source;
  this.altTxt = alt;
  state.push(this);
}

new CreateProduct('bag', 'img/bag.jpg', 'Bag');
new CreateProduct('banana', 'img/banana.jpg', 'Banana');
new CreateProduct('bathroom', 'img/bathroom.jpg', 'Bathroom');
new CreateProduct('boots', 'img/boots.jpg', 'Boots');
new CreateProduct('breakfast', 'img/breakfast.jpg', 'Breakfast');
new CreateProduct('bubblegum', 'img/bubblegum.jpg', 'Bubble gum');
new CreateProduct('chair', '.img/chair.jpg', 'Chair');
new CreateProduct('cthulhu', '.img/cthulhu.jpg', 'Cthulhu');
new CreateProduct('dog-duck', 'img/dog-duck.jpg', 'Dog duck');
new CreateProduct('dragon', 'img/dragon.jpg', 'Dragon meat');
new CreateProduct('pen', 'img/pen.jpg', 'Pen');
new CreateProduct('pet-sweep', 'img/pet-sweep.jpg', 'Pet sweep');
new CreateProduct('scissors', 'img/scissors.jpg', 'Pizza scissorss');
new CreateProduct('shark', 'img/shark.jpg', 'Shark');
new CreateProduct('sweep', 'img/sweep.png', 'Sweep');
new CreateProduct('tauntaun', 'img/tauntaun.jpg', 'Tauntaun');
new CreateProduct('unicorn', '.img/unicorn.jpg', 'Unicorn meat');
new CreateProduct('water-can', 'img/water-can.jpg', 'Watering can');
new CreateProduct('wine-glass', 'img/wine-glass.jpg', 'Wine glass');

/* console.log("CURRENTLY RENDERED IMAGES", imgEls);

console.log('CURRENT STATE', state);
 */
renderImages();

function randomNum() {
  return Math.floor(Math.random() * state.length);
}

// put inside renfunction renderImages(){
function renderImages() {
  canvas.style.display = 'none';
  let prevImgs = [];

  for (let i = 0; i < 3; i++) {
    let product = state[randomNum()];

    // Check for duplicate product names
    while (product.name === imgEls[0].id || product.name === imgEls[1].id || product.name === imgEls[2].id || prevImgs.includes(product.name)) {
      product = state[randomNum()];
    }

    prevImgs.push(product.name);

    imgEls[i].src = product.source;
    imgEls[i].id = product.name;
    imgEls[i].alt = product.altTxt;
    product.timesShown += 1;
    product.productClicked += 1;

    pEls[i].textContent = `${product.name}`;
  }

}
function handleClick(event) {
  let productClicked = event.target.id;

  state.forEach(img => {
    if (img.name === productClicked) {
      img.timesClicked += 1;
    }
  });

  if (maxRounds - 1) {
    renderImages();
    maxRounds--;
  } else {
    trackerEl.removeEventListener('click', handleClick);
    // trackerEl.style.display = 'none';
    showResultsBtn.style.display = 'block';


  }

  storeData();
}

function drawChart() {
  let labels = [];
  let timesShownVal = [];
  let timesClickedVal = [];

  state.forEach(item => {
    labels.push(item.name);
    timesClickedVal.push(item.timesClicked);
    timesShownVal.push(item.timesShown);

  });

  canvas.style.display = 'block';


  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Times Clicked',
        data: timesClickedVal,
        borderWidth: 1
      }, {
        label: 'Times Shown',
        data: timesShownVal,
        borderWidth: 1
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function displayResults() {
  drawChart();
}

function storeData() {
  let data = JSON.stringify(state);
  localStorage.setItem('productData', data);
}

function readData() {
  let data = localStorage.getItem('productData');

  if (data) {
    state = JSON.parse(data);
  } else {
    storeData();
  }
}

readData();

trackerEl.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', displayResults);

