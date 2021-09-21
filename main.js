//Movies array

const movies = [
  "Arrival",
  "Gladiator",
  "Terminator+2",
  "Interstellar",
  "sound+of+metal",
  "Wall-e",
  "drive",
  "Road+to+perdition",
  "children+of+men",
  "Eternal+sunshine+of+the+spotless+mind",
  "inception",
  "v+for+vendetta",
  "the+dark+knight+rises",
  "mad+max:fury+road",
  "bronson",
  "sunshine",
  "saving+private+ryan",
  "3:10+to+yuma",
  "Aliens",
  "good+will+hunting",
];

let myMovies = [];

function generateHTML () {
  myMoviesContainer = document.getElementById("twenty-card-container");
  favoritedMoviesContainer = document.getElementById("user-card-container");
  myMoviesContainer.innerHTML = '';
  favoritedMoviesContainer.innerHTML = '';
  myMovies.forEach((movie) => {
    let movieDump = movie.isFavorite ? favoritedMoviesContainer : myMoviesContainer;
    let content = `<div id="${movie.Title}" class="movie-card fadeInUp sort-me">
        <div class="title-header">
          <h2">${movie.Title}</h2>
        </div>
        <div class="img-wrapper">
          <img src="${movie.Poster}" alt="movie-poster" />
        </div>
        <div class="movie-details">
          <ul class="details-list">
            <li> Directed by: ${movie.Director}</li>
            <li> Release Date: ${movie.Released}</li>
            <li> Runtime: ${movie.Runtime}</li>
            <li> Rating: ${movie.Rated}</li>
          </ul>
        </div>
          <button onclick="toggleFunction('${movie.Title}')" class="toggle-btn">
            <i class="fas fa-user-plus"></i>
             Add/remove from your favorites!
          </button>
    </div>`;
    movieDump.innerHTML += content;
  });
}
//Toggle functions

function toggleFunction(selectedMovie) {
  let movieIndex;
  movieIndex = myMovies.findIndex(movie => movie.Title === selectedMovie)
  console.log(myMovies[movieIndex].isFavorite)
  myMovies[movieIndex].isFavorite = !myMovies[movieIndex].isFavorite
  console.log(myMovies[movieIndex].isFavorite)
  generateHTML(myMovies);
};

//Sort functions

const sortFuncAZ = () => {
  myMovies.sort((a, b) => (a.Title > b.Title ? 1 : -1));
  generateHTML();
};

const sortFuncZA = () => {
  myMovies.sort((a, b) => (b.Title > a.Title ? 1 : -1));
  generateHTML();
};

//fetch data function

const fetchMovieData = async (movieTitle) => {
  const resp = await fetch(
    "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy"
  );
  const data = await resp.json();
  return data;
};
const fetchAllMovieData = async () => {
  let movieList = [];
  for (i = 0; i < movies.length; i++) {
    const data = await fetchMovieData(movies[i]);
    movieList.push(data);
  }
  return movieList;
};

(async () => {
  movieData = await fetchAllMovieData();
  myMovies = movieData.map((movie) => ({...movie, isFavorite: false}))
  generateHTML();

  document.addEventListener("click", (event) => {
    if (event.target) {
      if (event.target.className === "sort-z-a") {
        sortFuncZA();
      }
      if (event.target.className === "sort-a-z") {
        sortFuncAZ();
      }
    }
  });
})();