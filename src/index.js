const baseURL = "http://localhost:3000/pups"

const bar = document.querySelector("#dog-bar")
const details = document.querySelector("#dog-info")
const filterBtn = document.querySelector("#good-dog-filter")

filterBtn.addEventListener('click', toggleFilter)

function getAllDogs(){
    return fetch (baseURL)
    .then(res => res.json())
}

function getOneDog(id){
    return fetch(pupsURL + `/${id}`)
    .then(res => res.json())

}

function renderAllInBar(dogsArr, filter = false){
    bar.innerHTML = ''
    if (filter){
        dogsArr.filter(dogObj => dogObj.isGoodDog).forEach(addOneDogToBar)
    } else {
        dogsArr.forEach(addOneDogToBar)
    }
}

function addOneDogToBar(dogObj){
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dogObj.name
    dogSpan.dataset.id = dogObj.id
    dogSpan.addEventListener('click', handleSpanClick)
    bar.append(dogSpan)
}

function showOneDog(dogObj){
    details.innerHTML = `
    <img src=${dogObj.image}>
    <h2>${dogObj.name}</h2>`
    const pupBtn = document.createElement('button')
    pupBtn.textContent = ((dogObj.isGoodDog) ? "Good Dog" : "Bad Dog")
    pupBtn.addEventListener('click', () => togglePupButton(pupBtn))
    details.append(dogDiv, pupBtn)
}

function handleSpanClick(event){
    const id = event.target.dataset.id
    getOneDog(id).then(showOneDog)
}

function togglePupButton(pupButton){
    pupButton.textContent = pupButton.textContent.includes("Good") ? "Bad Dog" : "Good Dog"
}

function toggleFilter(){
    if (filterBtn.innerText.includes("OFF")){
        filterBtn.innerText = "Filter good dogs: ON"
        getAllDogs().then(dogArr => renderAllInBar(dogArr , true))
    } else {
        filterBtn.innerText = "Filter good dogs: OFF"
        getAllDogs().then(renderAllInBar)
    }
}

getAllDogs().then(renderAllInBar)