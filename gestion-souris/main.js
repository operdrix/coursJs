const rectangle = document.querySelector('.rectangle');
const bouton = document.querySelector('#toggle-rectangle');

rectangle.addEventListener('mouseover', () => {
  rectangle.classList.add('important');
});
rectangle.addEventListener('mouseout', () => {
  rectangle.classList.remove('important');
});
rectangle.addEventListener('dblclick', () => {
  rectangle.classList.add('good');
});
bouton.addEventListener('click', () => {
  rectangle.classList.toggle('hide');
});