
const btnRun = document.querySelector('#run')
const form = document.querySelector('form')
const result = document.querySelector('#target')

btnRun.addEventListener('click', submitForm)

/**
 * Rajoute le HTML dans la div#target
 * @param {String} html 
 */
function insertHTML(html) {
  result.innerHTML = html
}

/**
 * 
 * Génère le html pour afficher les contacts
 *
 * @param {Contacts[]} contacts
 * @returns {void}
 */
function displayContact(contacts) {
  let html = `<ul>`
  contacts.forEach(contact => {
    html += `
      <li>
        <strong>Prénom :</strong> ${contact.firstname}<br>
        <em>Téléphone :</em> ${contact.phone}<br>
      </li>`
  })
  html += `</ul>`
  insertHTML(html)
}

/**
 * Génère le HTML qui affiche la liste de films
 * @param {Movies[]} movies
 */
function displayMovies(movies) {
  let html = "<ul class='movie-list'>";
  movies.forEach(
    (movie) =>
    (html += `
				<li>
					<img src="images/${movie.cover}">
					<p>
						<strong>${movie.title}</strong> -
						<em>${movie.duration}</em>
					</p>
				</li>
			`)
  );
  html += "</ul>";
  insertHTML(html);
}
/**
 * Exécute l'appel AJAX
 * @param {string} url
 * @param {function} fctCallback
 * @param {boolean} json par défaut à `false`
 */
function ajax(file, fctCallback, json = false) {
  fetch(file)
    .then((response) => (json ? response.json() : response.text()))
    .then((datas) => fctCallback(datas));
}

/**
 * Soumet le formulaire
 * @returns {void}
 */
function submitForm() {
  const what = parseInt(form.querySelector('input[name=what]:checked').value)
  switch (what) {
    case 1:
      ajax("data/1-get-html-article.html", insertHTML)
      break
    case 2:
      ajax("data/2-get-contacts-list.json", displayContact, true)
      break
    case 3:
      ajax("data/3-get-html-movies.html", insertHTML)
      break
    case 4:
      ajax("data/4-get-json-movies.json", displayMovies, true)
      break
    default:
      throw new Error('Invalid value')
  }
}
