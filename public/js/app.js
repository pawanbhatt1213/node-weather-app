console.log("Server-side js loaded!")
const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const address = document.querySelector("input[type=text]").value;
    fetch(`http://localhost:3000/weather?address=${address}`).then((res)=> {
    res.json().then(data=>{
        console.log(data.data)
        data = data.data
        document.getElementById("temperature").innerHTML = data.current.temperature
        document.getElementById("weather_descriptions").innerHTML = data.current.weather_descriptions[0]
        document.getElementById("country").innerHTML = data.location.country
        document.getElementById("region").innerHTML = data.location.region
        document.getElementById("visibility").innerHTML = data.current.visibility
    })
})
})