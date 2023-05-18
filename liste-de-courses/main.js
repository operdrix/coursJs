const listeDeCourses = Array.from(document.querySelectorAll('ul.list li'))
const inputAdd = document.querySelector('#toAdd')
const buttonAdd = document.querySelector('#submit')
const buttonDeleteOne = document.querySelector('#deleteOne')
const buttonDeleteAll = document.querySelector('#delete')
const popup = document.querySelector('#popup')
const buttonCancel = document.querySelector('#cancel')
const inputDelete = document.querySelector('#toDelete')
const buttonDelete = document.querySelector('#btnDelete')

const displayList = () => {
  const ul = document.querySelector('ul.list')
  ul.innerHTML = ''
  listeDeCourses.forEach((item) => {
    ul.appendChild(item)
  })
}
displayList()

// Ajouter un article à la liste
const addItem = () => {
  if (inputAdd.value) {
    const li = document.createElement('li')
    li.textContent = inputAdd.value
    listeDeCourses.push(li)
    inputAdd.value = ''
    displayList()
  } else {
    alert('Veuillez saisir un article')
  }
}

// Supprimer un article de la liste
const deleteItem = () => {
  if (inputDelete.value) {
    const itemText = inputDelete.value
    const item = listeDeCourses.find((item) => item.textContent === itemText)
    if (item) {
      listeDeCourses.splice(listeDeCourses.indexOf(item), 1)
      item.remove()
      popup.classList.toggle('hide')
      displayList()
      inputDelete.value = ''
    } else {
      alert('Cet article n\'existe pas')
    }
  } else {
    alert('Veuillez saisir un article')
  }
}

// Permer de valider le formulaire avec la touche entrée
document.querySelector('#formAdd').addEventListener('submit', (e) => {
  e.preventDefault()
  addItem()
})
document.querySelector('#formDelete').addEventListener('submit', (e) => {
  e.preventDefault()
  deleteItem()
})
buttonAdd.addEventListener('click', addItem)
buttonDeleteAll.addEventListener('click', () => listeDeCourses.forEach((item) => item.remove()))
buttonDeleteOne.addEventListener('click', () => {
  popup.classList.toggle('hide')
  inputDelete.focus()
})
buttonCancel.addEventListener('click', () => popup.classList.toggle('hide'))
buttonDelete.addEventListener('click', deleteItem)