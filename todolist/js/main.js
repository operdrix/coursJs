"use strict";

// Récupère les éléments du DOM
const form = document.querySelector("#task-form")
const btnAdd = document.querySelector("#add-task")
const btnClear = document.querySelector("#clear-todo")
const btnSave = document.querySelector("#save")
const todoList = document.querySelector("#todo")
const taskDetail = document.querySelector("#task-details")

let taskList = []
let currentIndex = -1

/**
 * Rafraichit la liste des tâches
 * @returns {void}
 * @description Récupère la liste des tâches dans le localStorage, les affiche dans la section #todo
 */
// Affiche la liste de tâches
function refreshTaskList() {
  currentIndex = -1
  const ul = document.querySelector("#todo > ul")
  taskList = JSON.parse(localStorage.getItem("taskList"))
  if (taskList === null) { taskList = [] }
  ul.innerHTML = ""
  taskList.forEach((task, index) => {
    const newLi = document.createElement('li')
    newLi.innerHTML = `<a href="#" data-index=${index}>${task.taskname}</a> - ${task.state}% <i class="fa fa-trash"  data-index=${index}></i>`
    newLi.querySelector("a").addEventListener("click", openTaskDetails)
    newLi.querySelector("i").addEventListener("click", deleteTask)
    ul.appendChild(newLi)
  });
}

/**
 * Affiche les détails d'une tâche
 * @param {Event} e 
 * @returns {void}
 * @description Affiche les détails d'une tâche dans la section #task-details
 */
function openTaskDetails(e) {
  e.stopPropagation();
  currentIndex = this.getAttribute("data-index")
  const task = taskList[currentIndex]
  form.classList.add("hide")
  taskDetail.classList.remove("hide")
  taskDetail.querySelector("h3").innerText = task.taskname
  taskDetail.querySelector("p").innerText = task.description
  taskDetail.querySelector("a").addEventListener("click", openTaskForm)
}

/**
 * Ouvre le formulaire
 * @returns {void}
 * @description Affiche le formulaire, le remet à zéro
 */
function openForm() {
  form.classList.remove("hide")
  form.reset()
}

/**
 * Ouvre les détails de la tâche
 * @param {Event} e 
 * @returns {void}
 * @description Ouvre le formulaire en mode "modification" et pré-rempli les champs avec les informations de la tâche
 */
function openTaskForm(e) {
  e.stopPropagation()
  e.preventDefault()
  openForm()
  const task = taskList[currentIndex]
  taskDetail.classList.add("hide")
  form.setAttribute("data-mode", "update")
  form.querySelector("#lvl").value = task.state
  form.querySelector("#name").value = task.taskname
  form.querySelector("#description").value = task.description
}

/**
 * Supprimer une tâche
 * @returns {void}
 * @description Supprime une tâche du tableau taskList
 */
function deleteTask() {
  currentIndex = this.getAttribute("data-index")
  const task = taskList[currentIndex]
  if (confirm(`Voulez-vous supprimer la tâche ${task.taskname} ?`)) {
    taskList.splice(currentIndex, 1)
    localStorage.setItem("taskList", JSON.stringify(taskList))
    refreshTaskList()
  }
  return
}

/**
 * Sauvegarde d'une tâche
 * @param {Event} e
 * @returns {void}
 * @description Sauvegarde d'une tâche dans le localStorage. 
 * Si le formulaire est en mode "ajout", on ajoute une entrée dans le tableau taskList. 
 * Si le formulaire est en mode "modification", on modifie l'entrée en question dans le tableau taskList.
 */
function saveTask(e) {
  e.preventDefault()
  // Récupération des informations du formulaire
  const formData = {
    state: this.querySelector("#lvl").value,
    taskname: this.querySelector("#name").value,
    description: this.querySelector("#description").value,
  }
  // Vérification des champs vides
  if (formData.taskname === "" || formData.description === "") {
    alert("Tous les champs sont obligatoires")
    return;
  }
  // Switch entre mode Ajout et mode Modif
  if (this.getAttribute("data-mode") === "add") {
    // Mode Ajout, on ajoute une entrée dans le tableau taskList
    taskList.push(formData);
  } else {
    // Mode Modif, on modifie l'entrée en question dans le tableau taskList
    taskList[currentIndex] = formData
    taskDetail.classList.add("hide")
  }
  // Ecriture de taskList dans le localStorage
  localStorage.setItem("taskList", JSON.stringify(taskList))
  // Recharge la liste des tâches / Vide le formulaire / cache le formulaire
  refreshTaskList()
  this.reset()
  this.classList.add("hide")
}

/**
 * Supprime toutes les tâches
 * @returns {void}
 * @description Supprime toutes les tâches du localStorage et rafraichit la liste des tâches
 */
function clearTodoList() {
  if (confirm("Voulez-vous supprimer toutes les tâches ?")) {
    localStorage.removeItem("taskList")
    refreshTaskList()
  }
}

// Evénements
btnAdd.addEventListener("click", () => {
  form.setAttribute("data-mode", "add")
  openForm()
})
btnClear.addEventListener("click", clearTodoList)
form.addEventListener("submit", saveTask)

refreshTaskList()