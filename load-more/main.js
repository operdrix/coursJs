import { moment } from "moment.min.js"
const content = document.querySelector("#content")

const concerts = [
  { date: "2023/07/21", city: "Lyon", singer: "Linkin Park", price: 56 },
  { date: "2023/10/05", city: "Paris", singer: "Patrick Bruel", price: 45 },
  { date: "2024/06/22", city: "Marseille", singer: "The Offsprings", price: 74 },
  { date: "2024/06/28", city: "Montpellier", singer: "Michel Sardou", price: 34 },
  { date: "2024/07/20", city: "Brest", singer: "Sum 41", price: 120 },
  { date: "2024/09/29", city: "Toulouse", singer: "Thirty Seconds to Mars", price: 76 },
  { date: "2024/09/29", city: "Saint Etienne", singer: "Jenifer Lopez", price: 230 },
  { date: "2024/10/04", city: "Manchester", singer: "Rihannah", price: 72 },
  { date: "2025/07/31", city: "Londres", singer: "Louanne", price: 34 },
  { date: "2025/12/25", city: "Aix en Provence", singer: "Clara Luciani", price: 63 }
]

window.addEventListener("load", refreshDataList)

function refreshDataList() {
  content.innerHTML = ""
  concerts.forEach(concert => {
    const newLi = document.createElement("li")
    newLi.innerHTML = `
    <h2>${concert.singer}</h2>
    <p>à ${concert.city} le ${Date(concert.date).toString()}</p>
    <span>${concert.price}€</span>
    `
    content.appendChild(newLi)
  })
}

