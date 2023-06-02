const btn = document.querySelector('#submit')
const form = document.querySelector('form')
const firstname = document.querySelector('#firstname')
const result = document.querySelector('article')

btn.addEventListener('click', onClickSubmit)
form.addEventListener('submit', (e) => {
  e.preventDefault()
  onClickSubmit()
})

/**
 * Fonction appelée lors du click sur le bouton ou la soumission du formulaire.
 * Récupère le prénom et contacte l'API Agify via la fonction ajax
 */
function onClickSubmit() {
  console.log('click');
  const name = firstname.value
  const url = `https://api.agify.io/?name=${name}`
  ajax(url, showResult)
}

/**
 * Contact de l'API et appel de la fonction callback
 * @param {String} url URL de l'API Agify
 * @param {Function} callback Fonction à appeler avec le retour de l'API
 */
function ajax(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data))
}

/**
 * Affiche le retour de l'API Agify dans la balise Article
 * @param {Json} json 
 */
function showResult(json) {
  const h2 = result.querySelector('h2')
  const strong = result.querySelector('strong')
  h2.textContent = `Selon Agify, ${json.name.toUpperCase()} a ${json.age} ans`
  strong.textContent = json.count
  result.classList.remove('hide')
}
