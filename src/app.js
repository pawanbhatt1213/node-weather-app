const path = require("path")
const express = require("express")
const hbs = require("hbs")
const getGeoObj = require("./utils/geocode")
const getWeatherObj = require("./utils/forecast")


const app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, "../templates/partials"))


app.use(express.static(path.join(__dirname, '../public')))


app.set("views", path.join(__dirname, "../templates/views"))

const PORT = 3000

app.get("", (req, res)=>{
    res.render('index')
})

app.get("/help", (req, res)=>{
    res.render("help", {helpMessage: "HELP here!"})
})

app.get("/about", (req, res)=>{
    res.render("about")
})

app.get("/weather", (req, res)=>{
    if(!req.query.address)
        return res.send({error: 'please provide an address'})
    
    getGeoObj.getGeo(req.query.address, (err, data) => {
        if(err)
        return res.send({error: err})
        getWeatherObj.getWeather(data.latitude, data.longitude, (err, data)=>{
            if(err)
                return res.send({error: err})
            return res.send({data: data})
        })
    })
})

app.get("*", (req, res) => {
    res.render("error", {errorMessage: "404! Page not found!"})
})
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})