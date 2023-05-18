const selectAllButton = document.querySelector('#selectAll');
const unselectAllButton = document.querySelector('#deselectAll');

const elements = Array.from(document.querySelectorAll('main ul li'));

const selectedCount = () => {
  //const selectedElements = document.querySelectorAll('main ul li.selected');
  const total = elements.filter(element => element.classList.contains('selected')).length;
  document.querySelector('#total>em').textContent = total;
}

elements.forEach(element => {
  element.addEventListener('click', () => {
    element.classList.toggle('selected');
    selectedCount();
  });
});

selectAllButton.addEventListener('click', () => {
  elements.forEach(element => {
    element.classList.add('selected');
  });
  selectedCount();
});

unselectAllButton.addEventListener('click', () => {
  elements.forEach(element => {
    element.classList.remove('selected');
  });
  selectedCount();
});
