import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const WEATHER_API_URL = "https://api.openweathermap.org";
const API_KEY = "1566507cea6c12b3ca22edbc2bf4bd1a";
let lat=""
let lon=""

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', async(req, res) => {
    const location = req.body.location;
    console.log(location);
    try{
        const locationResult = await axios.get(WEATHER_API_URL+"/geo/1.0/direct?q=" + location + "&limit=1&appid=" + API_KEY);
        console.log(locationResult.data[0].lat);
        res.render('index.ejs', {latitude:locationResult.data[0].lat, longitude: locationResult.data[0].lon });
        lat = locationResult.data[0].lat;
        lon = locationResult.data[0].lon;
    }catch (error) {
        console.log("hi")
        res.status(400).send(error.message);
    }
})

app.post('/get-weather', async(req,res) => {
    try{
        console.log("param " + lat,lon);
        const weather = await axios.get(WEATHER_API_URL + `/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&units=metric&appid=`+ API_KEY);
        console.log(weather.data);
        res.render('index.ejs', {weather: weather.data.current})
    }catch (error) {
        console.log("hello")
        res.status(400).send(error.message);
    }
})
app.get('/',(req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});