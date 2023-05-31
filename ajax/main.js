
const btnRun = document.querySelector('#run')
const form = document.querySelector('form')
const result = document.querySelector('#target')

btnRun.addEventListener('click', submitForm)

function submitForm() {
  const what = parseInt(form.querySelector('input[name=what]:checked').value)
  let file = ''
  switch (what) {
    case 1:
      file = 'data/1-get-html-article.html'
      break
    case 2:
      file = 'data/2-get-contacts-list.json'
      break
    case 3:
      file = 'data/3-get-html-movies.html'
      break
    case 4:
      file = 'data/4-get-json-movies.json'
      break
    default:
      throw new Error('Invalid value')
  }
  fetch(file)
    .then(response => response.text())
    .then(data => {
      result.innerHTML = data
    })
    .catch(error => console.error(error))
}