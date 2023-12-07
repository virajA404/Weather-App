import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const WEATHER_API_URL = "https://api.openweathermap.org";
const API_KEY = "1566507cea6c12b3ca22edbc2bf4bd1a";
let lat=""
let lon="" 
let place =""

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//Submitting the location and getting the latitude and longitude of the location. They are required to get the weather information 
app.post('/submit', async(req, res) => {
    const location = req.body.location;
    // console.log(location);
    try{
        const locationResult = await axios.get(WEATHER_API_URL+"/geo/1.0/direct?q=" + location + "&limit=1&appid=" + API_KEY);
        // console.log(locationResult.data[0].lat);
        // console.log(locationResult.data);
        console.log("place: " + locationResult.data[0].name);
        res.render('index.ejs', {latitude:locationResult.data[0].lat, longitude: locationResult.data[0].lon });
        //assigning latitude, longitude and location to the declared variables, Since we need to use them in the get-weather method
        lat = locationResult.data[0].lat;
        lon = locationResult.data[0].lon;
        place = locationResult.data[0].name;
    }catch (error) {
        console.log("hi")
        res.status(400).send(error.message);
    }
})

//getting the weather information of the location by giving lat and lon
app.post('/get-weather', async(req,res) => {
    try{
        // console.log("param " + lat,lon);
        const weather = await axios.get(WEATHER_API_URL + `/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&units=metric&appid=`+ API_KEY);
        // console.log(weather.data);

        //sending the location and weather data to ejs 
        res.render('index.ejs', {weather: weather.data.current, location:place})
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