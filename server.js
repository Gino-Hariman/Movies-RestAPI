const express = require("express");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
// dapat mengganti api key pada file .env
const API_KEY = process.env.API_KEY;

app.use(express.json());

app.get("/movies", async (req, res) => {
  const { page = 1 } = req.query;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  res.send(response.data);
});

app.get("/movies/trending", async (req, res) => {
  const { type, time, page = 1 } = req.query;
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${API_KEY}&page=${page}`
  );
  res.send(response.data);
});

app.get("/movies/search", async (req, res) => {
  const { query, page = 1 } = req.query;
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  res.send(response.data);
});

app.get("/movies/videos/:id", async (req, res) => {
  const movie_id = req.params.id;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`
  );
  res.send(response.data);
});

app.get("/movies/movie/recomend", async (req, res) => {
  const { movie_id, page = 1 } = req.query;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&page=${page}`
  );
  res.send(response.data);
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  const host = server.address().address;

  console.log("Server listening at http://%s:%s", host, port);
});
