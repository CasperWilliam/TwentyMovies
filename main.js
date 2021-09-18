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

const toggleFunction = (id) => {
  let card = document.getElementById(id).style;
  let userCard = document.getElementById(`user-${id}`).style;
  card.display = card.display === "none" ? "block" : "none";
  userCard.display = card.display === "none" ? "block" : "none";
};

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
    const content = `<div id="${movie.Title}" class="movie-card fadeInUp">
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
          <button data-id="${movie.Title}" class="add-btn">
            <i class="fas fa-user-plus"></i>
             Add to your favorites!
          </button>
    </div>`;
    movieDump.innerHTML += content;
  });
  document.querySelectorAll(".add-btn").forEach((item) => {
    item.addEventListener("click", (event) => {
      toggleFunction(item.dataset.id);
    });
  });

  let userMovieData = [...movieData];
  console.log(userMovieData);
  console.log(movieData);

  userMovieData.forEach((movie) => {
    const userMovieDump = document.getElementById("user-card-container");
    const userContent = `<div id="user-${movie.Title}" class="movie-card invisible">
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
          <button data-id="${movie.Title}" class="remove-btn">
            <i class="fas fa-user-plus"></i>
             Remove from your favorites!
          </button>
    </div>`;
    userMovieDump.innerHTML += userContent;
  });

  document.querySelectorAll(".remove-btn").forEach((item) => {
    item.addEventListener("click", (event) => {
      toggleFunction(item.dataset.id)
    });
  });
})();
