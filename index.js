import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const WEATHER_API_URL = "https://api.openweathermap.org";
// const GEOCODING_API_URL = 

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});