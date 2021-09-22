/* Global Variables */
//api key and base url

const key = process.env.KEY;
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

//input data
let city;
let post;
//elements to update
const todayElement = document.getElementById("day");
const tempe = document.getElementById("temp");
const content = document.getElementById("post");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

const newPostContainer = document.querySelector("#entryHolder");

//helper functions
//get allposts
const getAllPosts = async () => {
  const res = await fetch("http://localhost:8080/home");
  try {
    const projectData = await res.json();
    updateUI(
      projectData[projectData.length - 1].date,
      projectData[projectData.length - 1].temperature,
      projectData[projectData.length - 1].post,
      city
    );
  } catch {
    (err) => console.log(err);
  }
};
//updateUI
const updateUI = async (date, tempera, post, city) => {
  //updating
  todayElement.innerHTML = date;
  tempe.innerHTML =
    "The Temperature in " + city.toUpperCase() + " is " + tempera + " °C";
  content.innerHTML = post;
};
//POST requist
const SendNewPost = async (url, data = {}) => {
  const respond = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    getAllPosts();
  } catch {
    (err) => console.log(err);
  }
};

//get the weither by city
const getWeither = async (city) => {
  const res = await fetch(baseURL + city + "&units=metric&appid=" + key);
  try {
    const weitherData = await res.json();
    //send the newPost to the server
    SendNewPost("http://localhost:8080/add", {
      temperature: weitherData.main.temp,
      date: newDate,
      post,
    });
  } catch (err) {
    alert(city + "is not a city try again");
    console.log(err);
  }
};

//main event
//update city onchange event
const cityInputElement = document.querySelector("input");
cityInputElement.addEventListener("change", (e) => {
  e.preventDefault();
  city = document.querySelector("input").value;
});

//update post onchange event
const textFieldElement = document.querySelector("textarea");
textFieldElement.addEventListener("change", (e) => {
  e.preventDefault();
  post = document.querySelector("textarea").value;
});

//main generate event get weither from api post to the server /update the ui
const btn = document.getElementById("generate");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeither(city);

  //sroll to the new post
  newPostContainer.scrollIntoView({ behavior: "smooth", block: "start" });
});
const title = document.getElementsByClassName("headline");
const upBtn = document.getElementById("newPost");
upBtn.addEventListener("click", (e) => {
  e.preventDefault();
  title[0].scrollIntoView({ behavior: "smooth", block: "start" });
});
