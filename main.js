const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

/* button */

const btn = document.getElementById("yourFavButton");

/* modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// modal/full site modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

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

let movieData = [];
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
  movieData = movieList;
};
(async () => {
  await fetchAllMovieData();

  movieData.forEach((movie) => {
    const movieDump = document.getElementById("twenty-card-container");
    const content = `<div class="movie-card fadeInUp">
        <div class="title-header">
          <h2>${movie.Title}</h2>
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
        <div class="btn-wrapper">
          <button id="yourFavButton" class="add-btn">
            <i class="fas fa-user-plus"></i>
             Add to your favorites!
             <a href="#"></a>
          </button>
        </div>
    </div>`;
    movieDump.innerHTML += content;
  });
})();

btn.addEventListener("click", function () {
  console.log("hit");
})