'use strict';

const state = [];
let roundsOfVoting = 25;

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

let imgEls = document.querySelectorAll('img'); //array like thing filled with all the img elements in my html
let voteTrackerEl = document.getElementById('vote-tracker'); 

console.log("CURRENTLY RENDERED IMAGES", imgEls);

console.log('CURRENT STATE', state);


renderImages();

function generateRandomImage() {
  return Math.floor(Math.random() * state.length);
}

function renderImages() {
  // find some images from state
  let image1 = state[generateRandomImage()];
  let image2 = state[generateRandomImage()];
  let image3 = state[generateRandomImage()];
  console.log('IMAGES to re-render', imgEls, image1, image2, image3);
  while (image1.name === image2.name){
    image2 = state[generateRandomImage()];
  }
  // this should garuantee fresh goats
  imgEls[0].src = image1.source; // this makes things render
  imgEls[0].id = image1.name;
  image1.timesShown += 1;
  imgEls[1].src = image2.source;
  imgEls[1].id = image2.name;
  image2.timesShown += 1;
  imgEls[2].src = image3.source; 
  imgEls[2].id = image3.name;
  image3.timesShown += 1;
}

function handleImageClick(event) {
  console.log(event.target); // event.target always represents the exact element where an event occurred.

  // identify which image was clicked on??
  let imageThatWasClicked = event.target.id;
  state.forEach(image => {
    if (image.name === imageThatWasClicked) {
      image.timesClicked += 1; // mutation of an object
    }
  });
  console.log('UPDATED STATE', state);

  // re-render new goat images -> random goat image from state
  if (roundsOfVoting) {
    renderImages();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleImageClick);
  }
}

voteTrackerEl.addEventListener('click', handleImageClick);

// let eventId = voteTrackerEl.addEventListener('click', function(event) {
//   console.log(event.target); // event.target always represents the exact element where an event occurred.

//   // identify which image was clicked on??
//   let goatThatWasClicked = event.target.id;
//   state.forEach(image => {
//     if (image.name === goatThatWasClicked) {
//       image.timesClicked += 1; // mutation of an object
//     }
//   });
//   console.log('UPDATED STATE', state);

//   // re-render new goat images -> random goat image from state
//   if (roundsOfVoting) {
//     renderGoats();
//     roundsOfVoting--;
//   } else {
//     voteTrackerEl.removeEventListener('click', eventId);
//   }
// });