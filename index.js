import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const WEATHER_API_URL = "https://api.openweathermap.org";
const API_KEY = "1566507cea6c12b3ca22edbc2bf4bd1a";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', async(req, res) => {
    const location = req.body.location;
    try{
        //Submitting the location and getting the latitude and longitude of the location. They are required to get the weather information 
        const locationResult = await axios.get(WEATHER_API_URL+"/geo/1.0/direct?q=" + location + "&limit=1&appid=" + API_KEY);

        //assigning latitude, longitude and location to the declared variables for the ease of use
        const lat = locationResult.data[0].lat;
        const lon = locationResult.data[0].lon;
        const place = locationResult.data[0].name;

        //using lat, lon sending an get api request to get the current weather of the location 
        const weather = await axios.get(WEATHER_API_URL + `/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&units=metric&appid=`+ API_KEY);

        //render the weather information in ejs
        res.render('index.ejs', {weather: weather.data.current, location:place });
    }catch (error) {
        res.status(400).send(error.message);
    }
})

app.get('/',(req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});