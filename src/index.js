document.getElementsByName("name")[0].addEventListener("keypress", showFish)
document.getElementById("see-all-btn").addEventListener("click", showAllFish)
const url = "http://localhost:3000/fish"
let fish = '';
const data = []

function fetchAll() {
    fetch(url)
        .then(response => response.json())
        .then(datacopy => datacopy.forEach(d => data.push(d)))
}

function fetchFish(event, callback) {

    list = document.getElementById('fish-list')
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    console.log(typeof (callback.name));
    if (callback.name === 'callbackShowFish') {
        console.log(typeof (callback));
        fish = event.target.value.toLowerCase()
    }
    data.forEach(callback)
}

function callbackShowAllFish(element) {
    let li = document.createElement("li")
    const image = document.createElement("img")
    image.src = element.image
    li.appendChild(image)
    const p = document.createElement("p")
    p.innerHTML = element.name
    li.appendChild(p)
    const btn = document.createElement("button")
    btn.innerHTML = "See More"
    li.appendChild(btn)
    btn.addEventListener("dblclick", () => {
        const p = document.createElement("p")
        p.innerHTML = element.seasons.toString() +
            ', ' + element.weather + ', ' + element.time + ', ' + element.location
        if (li.lastChild.nodeName === 'P') {
            li.removeChild(li.lastChild)
        }
        li.appendChild(p)
    })
    list.appendChild(li)
};

function showAllFish(event) {
    fetchFish(event, callbackShowAllFish)
}

function callbackShowFish(element) {
    if (element.name.toLowerCase().startsWith(fish)) {
        let li = document.createElement("li")
        const image = document.createElement("img")
        image.src = element.image
        li.appendChild(image)
        const p = document.createElement("p")
        p.innerHTML = element.name
        li.appendChild(p)
        const btn = document.createElement("button")
        btn.innerHTML = "See More"
        li.appendChild(btn)
        btn.addEventListener("dblclick", () => {
            const p = document.createElement("p")
            p.innerHTML = element.seasons.toString() +
                ', ' + element.weather + ', ' + element.time + ', ' + element.location
            if (li.lastChild.nodeName === 'P') {
                li.removeChild(li.lastChild)
            }
            li.appendChild(p)
        })
        list.appendChild(li)
    }
}

function showFish(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        console.log(event)
        fetchFish(event, callbackShowFish)
    }
}
fetchAll()