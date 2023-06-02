const content = document.querySelector('#content');
const page = window.location.pathname.split('/').pop().split('.')[0]
const idPage = window.location.search.split('=').pop();
const mytoken = "msusjCeVcl6KulZAbEXr"
window.addEventListener('load', callApi);

/**
 * Appel de l'API en fonction de la page
 */
function callApi() {
  switch (page) {
    case 'book':
      ajax(`https://the-one-api.dev/v2/book/${idPage}`, showBookTitle)
      ajax(`https://the-one-api.dev/v2/book/${idPage}/chapter`, showBookChapters)
      break;
    default:
      ajax('https://the-one-api.dev/v2/book', showBooksList)
      break;
  }
}

/**
 * Appel de l'API et récupération des données
 * @param {String} url Url de l'API
 * @param {Function} callBackFunction Fonction de callback
 */
function ajax(url, callBackFunction) {
  try {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${mytoken}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => callBackFunction(data))
      .catch((error) => { console.error(error) })
  }
  catch (error) {
    console.error(error)
  }
}

/**
 * Affiche la liste des livres dans la page index.html
 * @param {Json} json 
 */
function showBooksList(json) {
  const books = json.docs;
  let html = '';
  html = '<ul class="list">'
  books.forEach((book) => {
    const bookName = book.name;
    const bookId = book._id;
    html += `<li><a href="book.html?id=${bookId}">${bookName}</a></li>`
  })
  html += '</ul>'
  content.innerHTML = html;
}

/**
 * Affiche le titre d'un livre dans la page book.html
 * @param {Json} json 
 */
function showBookTitle(json) {
  console.log(json);
  const h1 = document.querySelector('header h1');
  h1.innerText = json.docs[0].name;
}

/**
 * Affiche la liste des chapitres d'un livre dans la page book.html
 * @param {Json} json 
 */
function showBookChapters(json) {
  console.log(json);
  let html = ''
  html = '<ol>'
  json.docs.forEach((chapter) => {
    html += `<li>${chapter.chapterName}</li>`
  })
  html += '</ol>'
  content.innerHTML += html;
}