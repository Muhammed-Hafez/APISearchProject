document.addEventListener("DOMContentLoaded", function () {
  const blogContainer = document.getElementById("blog-container");
  const searchField = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", handleSearch);

  searchField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  async function fetchRandom() {
    try {
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=e6ca739068054bc28064a293bd5a0f52`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error("Error fetching random news", error);
      return [];
    }
  }
  async function handleSearch() {
    const query = searchField.value.trim();
    if (query !== "") {
      try {
        const articles = await fetchNewsQuery(query);
        displayBlogs(articles);
      } catch (error) {
        console.error("Error fetching news by query", error);
      }
    }
  }

  async function fetchNewsQuery(query) {
    try {
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=e6ca739068054bc28064a293bd5a0f52`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error("Error fetching random news", error);
      return [];
    }
  }

  function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      const img = document.createElement("img");
      img.src = article.urlToImage || "download.png";
      img.alt = article.title;

      const title = document.createElement("h2");
      title.textContent =
        article.title.length > 30
          ? `${article.title.slice(0, 30)}....`
          : article.title;

      const description = document.createElement("p");
      description.textContent =
        article.description && article.description.length > 120
          ? `${article.description.slice(0, 120)}....`
          : article.description || "No description available";

      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(description);
      blogCard.addEventListener("click", () => {
        window.open(article.url, "_blank");
      });
      blogContainer.appendChild(blogCard);
    });
  }

  (async () => {
    try {
      const articles = await fetchRandom();
      displayBlogs(articles);
    } catch (error) {
      console.error("Error fetching random news", error);
    }
  })();
});
