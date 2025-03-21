
// const axios = require('axios');

// exports.getWeather = async (req, res) => {
//   const city = req.query.city;


//   if (!city) {
//     return res.status(400).json({ error: "City parameter is required." });
//   }

//   const apiKey = process.env.API_KEY;


//   if (!apiKey) {
//     return res.status(500).json({ error: "Server configuration error: API key missing." });
//   }

  
//   const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;


//     const weatherResponse = {
//       city: data.name,
//       temperature: data.main.temp,
//       condition: data.weather[0].description,
//       wind_speed: data.wind.speed
//     };

//     res.json(weatherResponse);
//   } catch (error) {
    
//     if (error.response) {
//       return res.status(error.response.status).json({ error: error.response.data.message });
//     } else if (error.request) {
//       return res.status(500).json({ error: "No response from weather service." });
//     } else {
//       return res.status(500).json({ error: "An unexpected error occurred." });
//     }
//   }
// };


const axios = require('axios');

exports.getWeather = async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required." });
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration error: API key missing." });
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const weatherResponse = {
      city: `${data.name}, ${data.sys.country}`,
      temperature: data.main.temp, 
      condition: data.weather[0].description, 
      wind_speed: data.wind.speed,  
      humidity: data.main.humidity 
    };

    res.json(weatherResponse);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data.message || "Weather service error."
      });
    } else if (error.request) {
      return res.status(500).json({ error: "No response from weather service." });
    } else {
      return res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};

