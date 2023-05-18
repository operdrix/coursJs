
const pacman = document.querySelector('.pacman');
const cherry = document.querySelector('.cherry');

cherry.addEventListener('click', function () {
  pacman.appendChild(cherry);
});
