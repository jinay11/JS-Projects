const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

// fetch movie details
const getMovieInfo = async (movie) => {
  try {
    const myAPIKey = "15a68f46";
    const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

    const response = await fetch(url);
    const data = await response.json();

    showMovieData(data);
  } catch (error) {
    showErrorMesaage("No Movie Found!!!");
  }
};

//function to show movie data
const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBackground");
  // Use Destructuring from data object
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088; </strong>${imdbRating}</p>`;

  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Released: </strong>${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>`;

  // creating a div for movie poster
  const moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add("movie-poster");
  moviePosterElement.innerHTML = `<img src="${Poster}">`;

  movieContainer.appendChild(moviePosterElement);
  movieContainer.appendChild(movieElement);
};

const showErrorMesaage = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
  movieContainer.classList.add("noBackground");
};

// adding eventlistener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    getMovieInfo(movieName);
  } else {
    showErrorMesaage("Enter movie name to get movie information");
  }
});
