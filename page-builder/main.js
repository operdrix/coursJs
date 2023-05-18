const content = document.querySelector('#content');
const buttons = document.querySelectorAll('button:not(#export)');

const generatehtml = (button) => {
  const id = button.getAttribute("id");
  const placeholder = button.getAttribute("data-placeholder");
  let html = "";
  if (id === "hr") {
    html = `<${id}>`

  } else {
    html = `<${id} contenteditable="true">${placeholder}</${id}>`

  }
  // injecte une balise H1 éditable à la suite dans content
  content.innerHTML += html;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => generatehtml(button));
});

const popup = document.querySelector('#popup');
const exportHtml = () => {
  popup.classList.toggle('hide');
  popup.innerHTML = "";
  const div = document.createElement('div');
  popup.appendChild(div);
  div.textContent = content.innerHTML.replace(/contenteditable="true"/g, '');
}
document.querySelector('#export').addEventListener('click', exportHtml);
popup.addEventListener('dblclick', () => popup.classList.toggle('hide'));