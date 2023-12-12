//get time e.g 11:00 AM
function displayTime() {
    let date = new Date()
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    }
    let weekDay = date.toLocaleDateString("en-US", options)
    //e.g 23:30 PM
    let currentHours = `${date.getHours().toString().padStart(2, "0")}`
    let currentMinutes = `${date.getMinutes().toString().padStart(2, "0")}`
    // let midday = `${date.getHours() >= 12 ? "PM" : "AM"}`

    //display time
    document.getElementById("dateEl").textContent = weekDay
    document.getElementById("current-hours").textContent = `${currentHours}:${currentMinutes} ` // 12:20
}
//must update time every seconds
setInterval(displayTime, 1000)

/*get image from unplash
https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature
*/

/*
GET WEATHER
1.use navigator.geolocation for accurate location
2.console log "position" to find the coords
3.make "lat" in fetch equal to "position.coords.latitude/latitude"  and lon => longitude
4.add units => metric/imperial
*/
let weatherEl = document.getElementById("weather-icon")
navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then((res) => {
            if (!res.ok) {
                throw Error(`Data not available`)
            }
            return res.json()
        })
        .then((data) => {
            document.getElementById("temperature").textContent = `${data.main.temp}°C`
            document.getElementById("city-name").textContent = data.name

            //icon for weather
            const weatherIcon = {
                Clouds: "clouds.png",
                Clear: "clear.png",
                Drizzle: "drizzle.png",
                Humidity: "humidity.png",
                Mist: "mist.png",
                Rain: "rain.png",
                Wind: "wind.png",
                Snow: "snow.png",
                Thunderstorm: "thunderstorm.png",
            }
            const weatherCondition = data.weather[0].main

            if (weatherIcon.hasOwnProperty(weatherCondition)) {
                const imagePath = `images/${weatherIcon[weatherCondition]}`
                weatherEl.setAttribute("src", imagePath)
            }
        })
        .catch((err) => console.error(err))
})

//dom for todo
let listContainer = document.getElementById("note-wrapper")
let todoBtn = document.getElementById("todo-btn")
let textInput = document.getElementById("text-input")

//toggleTodo
todoBtn.addEventListener("click", function () {
    todo.classList.toggle("todoToggle")
})

textInput.addEventListener("keyup", addTask)

function addTask(event) {
    if (event.key === "Enter" && textInput.value) {
        let list = document.createElement("li")
        list.textContent = textInput.value
        listContainer.append(list)
        let span = document.createElement("span")
        span.classList.add("fa-solid", "fa-trash")
        list.appendChild(span)
        textInput.value = ""
    }
    saveData()
}

listContainer.addEventListener("click", function (e) {
    //SPAN must capital letter to target tagName
    if (e.target.tagName === "SPAN") {
        //list is the parent element
        e.target.parentElement.remove()
    }
    saveData()
})

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data")
}
showTask()
