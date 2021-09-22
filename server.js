// Setup empty JS object to act as endpoint for all routes
projectData = [];
// Require Express to run server and routes
const experss = require("express");
// Start up an instance of app
const app = experss();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(experss.static("website"));

app.use(experss.json());
// Setup Server
app.listen(8080, () => console.log("server is running at 8080"));

//Get all data
app.get("/home", (req, res) => {
  res.send(projectData);
});

//add new items to projectData by Post requist
app.post("/add", (req, res) => {
  const LatestEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    post: req.body.post,
  };
  projectData.push(LatestEntry);
  res.end();
});
