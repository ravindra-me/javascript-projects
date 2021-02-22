// let input = document.querySelector('input');
// let img = document.querySelector('img');
// let h2 = document.querySelector('h2');

// // let xhr = new XMLHttpRequest();
// // xhr.open('GET', 'https://api.github.com/users/ravindra-me');
// // xhr.onload = function () {
// //   let data = JSON.parse(xhr.response);
// //   console.log(data);
// // };
// // xhr.send();
// // console.log(xhr);

// function createUi(data) {
//   console.log(data);
//   h2.innerText = data.name;
//   img.src = data.avatar_url;
// }

// function handleChange(event) {
//   console.log(event.keyCode);
//   if (event.keyCode === 13) {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
//     xhr.onload = function () {
//       let data = JSON.parse(xhr.response);
//       createUi(data);
//     };
//     xhr.send();
//   }
// }

// input.addEventListener('keyup', handleChange);

let button = document.querySelector('.btn');
let img1 = document.querySelector('.img');

// cbktwRcMdPLPnGM1cpYPvzejdq3_KwSZ_bQjNLZNj1g;
// https://api.unsplash.com/photos/random
// https://api.unsplash.com/photos/random/?client_id=YOUR_ACCESS_KEY

button.addEventListener('click', () => {
  let xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.unsplash.com/photos/random/?client_id=cbktwRcMdPLPnGM1cpYPvzejdq3_KwSZ_bQjNLZNj1g`
  );
  xhr.onload = function () {
    let data = JSON.parse(xhr.response);
    img1.src = data.urls.small;
  };
  xhr.send();
});
