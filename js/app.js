'use strict';

const state = [];
let roundsOfVoting = 25;

let trackerEl = document.getElementById('votingTracker');
/* let containerEl = document.getElementById('productImages'); */
let imgEls = document.querySelectorAll('#productImages .container img');
let pEls = document.querySelectorAll('#productImages .container p');

let showResultsBtn = document.getElementById('showResultBtn');
showResultsBtn.style.display = 'none';

let resultsTable = document.getElementById('resultsContainer');



function Image(name, source) {
  this.name = name;
  this.timesClicked = 0;
  this.timesShown = 0;
  this.source = source;
}

state.push(new Image('bag', 'img/bag.jpg'));
state.push(new Image('banana', 'img/banana.jpg'));
state.push(new Image('bathroom', 'img/bathroom.jpg'));
state.push(new Image('boots', 'img/boots.jpg'));
state.push(new Image('breakfast', 'img/breakfast.jpg'));
state.push(new Image('bubblegum', 'img/bubblegum.jpg'));
state.push(new Image('chair', 'img/chair.jpg'));
state.push(new Image('cthulhu', 'img/cthulhu.jpg'));
state.push(new Image('dog duck', 'img/dog-duck.jpg'));
state.push(new Image('dragon', 'img/dragon.jpg'));
state.push(new Image('pen', 'img/pen.jpg'));
state.push(new Image('pet sweep', 'img/pet-sweep.jpg'));
state.push(new Image('scissors', 'img/scissors.jpg'));
state.push(new Image('shark', 'img/shark.jpg'));
state.push(new Image('sweep', 'img/sweep.png'));
state.push(new Image('tauntaun', 'img/tauntaun.jpg'));
state.push(new Image('unicorn', 'img/unicorn.jpg'));
state.push(new Image('water can', 'img/water-can.jpg'));
state.push(new Image('wine glass', 'img/wine-glass.jpg'));

console.log("CURRENTLY RENDERED IMAGES", imgEls);

console.log('CURRENT STATE', state);

renderImages();

function randomNum() {
  return Math.floor(Math.random() * state.length);
}

function renderImages() {

  let product1 = state[randomNum()];
  let product2 = state[randomNum()];
  let product3 = state[randomNum()];

  if (product1.name === product2.name || product1.name === product3.name) {
    product1 = state[randomNum()]
  } else if (product2.name === product1.name || product2.name === product3.name) {
    product2 = state[randomNum()]
  } else if (product3.name === product1.name || product3.name === product2.name) {
    product3 = state[randomNum()]
  }

  imgEls[0].src = product1.source;
  imgEls[0].id = product1.name;
  product1.timesShown += 1;


  imgEls[1].src = product2.source;
  imgEls[1].id = product2.name;
  product2.timesShown += 1;

  imgEls[2].src = product3.source;
  imgEls[2].id = product3.name;
  product3.timesShown += 1;

  pEls[0].textContent = `${product1.name}`;
  pEls[1].textContent = `${product2.name}`;
  pEls[2].textContent = `${product3.name}`;

}


function handleClick(event) {
  let productClicked = event.target.id;

  state.forEach(img => {
    if (img.name === productClicked) {
      img.timesClicked += 1;
    }
  });

  if (roundsOfVoting - 1) {
    renderImages();
    roundsOfVoting--;

  } else {
    trackerEl.removeEventListener('click', handleClick);
    trackerEl.style.display = 'none';
    showResultsBtn.style.display = 'block';
  }
}

trackerEl.addEventListener('click', handleClick)



function displayResults() {

  resultsTable.style.display = 'block';

  let tbody = document.createElement('tbody');
  resultsTable.appendChild(tbody);


  resultsTable.appendChild
  state.forEach(item => {
    console.log(item.name, item.timesClicked, item.timesShown, item.source);
    // containerEl.innerHTML ='';
    let trow = document.createElement('tr');
    tbody.appendChild(trow);
    trow.innerHTML = `
    <td><img src="${item.source}"/></td>
    <td>${item.name}</td>
    <td>${item.timesClicked}</td>
    <td>${item.timesShown}</td>
    `;
    tbody.appendChild(trow);
  });


}

showResultsBtn.addEventListener('click', displayResults);
