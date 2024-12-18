const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzMxNTBlMzkzMWI5ZTJmNTc2ZWQ3NjNhZjg5YjFiNiIsInN1YiI6IjY2MTU0ZDU4MDQ4NjM4MDE3YzFjNGQ2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G70lSLnsxqaS4GgkMsfaT9BQQKTPsmja565xuxUg1P4";

async function searchMovie() {
  const movieTitle = document.getElementById("searchInput").value.trim();
  if (movieTitle) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const movieId = data.results[0].id;
        const embedUrl = `https://embed.su/embed/movie/${movieId}`;
        displayResult(embedUrl);
      } else {
        document.getElementById("results").innerHTML = "No results found.";
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      document.getElementById("results").innerHTML =
        "An error occurred while searching for the movie.";
    }
  } else {
    document.getElementById("results").innerHTML =
      "Please enter a movie title.";
  }
}

function displayResult(embedUrl) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <div class="iframe-container">
      <iframe src="${embedUrl}" allowfullscreen></iframe>
    </div>
  `;
}

document.getElementById("searchInput").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    searchMovie();
  }
});
