const apiKey = "f3b4476aa6f94d74b4d07ca8cf81f54d";
const newsContainer = document.getElementById("newsContainer");

async function fetchNews(query="technology") {
  newsContainer.innerHTML = "<p>Loading...</p>";
  let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    if(data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found.</p>";
      return;
    }
    displayNews(data.articles);
  } catch(e) {
    newsContainer.innerHTML = "<p>Failed to load news.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach(a => {
    let card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${a.urlToImage || 'https://via.placeholder.com/300'}" />
      <div class="content">
        <h3>${a.title}</h3>
        <p>${a.description || ''}</p>
        <a href="${a.url}" target="_blank">Read More</a>
      </div>`;
    newsContainer.appendChild(card);
  });
}

function searchNews() {
  let q = document.getElementById("searchInput").value;
  fetchNews(q);
}

fetchNews();

    