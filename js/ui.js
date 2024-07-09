export class UI {
  constructor(gamesContainer, gameDetailsContainer) {
    this.navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    this.gamesContainer = document.getElementById(gamesContainer);
    this.gameDetailsContainer = document.getElementById(gameDetailsContainer);
  }

  handleNavLinks(callback) {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        this.navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        callback(link.getAttribute("href"));
      });
    });
  }

  displayGames(data, getData) {
    this.gamesContainer.innerHTML = "";

    data.forEach((item) => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-md-6 col-lg-4";

      const cardDiv = document.createElement("div");
      cardDiv.className = "card h-100";
      cardDiv.dataset.id = item.id;

      const img = document.createElement("img");
      img.src = item.thumbnail;
      img.className = "card-img-top";
      img.alt = item.title;

      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.className = "card-body";

      const cardTitle = document.createElement("h2");
      cardTitle.className =
        "mb-3 gap-2 fs-5 d-flex justify-content-between card-title";
      cardTitle.innerHTML = `${item.title}<p class="align-self-start mb-0 bg-primary badge">Free</p>`;

      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = item.short_description;

      const cardFooterDiv = document.createElement("div");
      cardFooterDiv.className = "d-flex justify-content-between p-3";

      const genreBadge = document.createElement("span");
      genreBadge.className = "badge bg-light-subtle";
      genreBadge.textContent = item.genre;

      const platformBadge = document.createElement("span");
      platformBadge.className = "badge bg-light-subtle";
      platformBadge.textContent = item.platform;

      cardBodyDiv.appendChild(cardTitle);
      cardBodyDiv.appendChild(cardText);
      cardFooterDiv.appendChild(genreBadge);
      cardFooterDiv.appendChild(platformBadge);

      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBodyDiv);
      cardDiv.appendChild(cardFooterDiv);

      colDiv.appendChild(cardDiv);
      this.gamesContainer.appendChild(colDiv);
      cardDiv.addEventListener("click", async () => {
        document.getElementById("games").classList.add("d-none");
        document.getElementById("game-details").classList.remove("d-none");
        this.gameDetailsContainer.innerHTML = '<div class="loader position-absolute top-50 start-50"></div>'
        const data = await getData(`/game?id=${item.id}`);
        this.displayGameDetails(data);
      });
    });
  }

  displayGameDetails(data) {
    this.gameDetailsContainer.innerHTML = `
    <div class="col-md-4">
      <img src="${data.thumbnail}" alt="${data.title}" class="w-100" />
    </div>
    <div class="col-md-8">
      <h3 class="mb-3">Title: ${data.title}</h3>
      <p>Category: <span class="badge text-bg-info">${data.genre}</span></p>
      <p>Platform: <span class="badge text-bg-info">${data.platform}</span></p>
      <p>Status: <span class="badge text-bg-info">${data.status}</span></p>
      <p class="small">${data.description}</p>
      <a href="${data.game_url}" class="btn btn-outline-warning" target="_blank">Show Game</a>
    </div>`;
    document.getElementById('close').addEventListener('click', function () {
      document.getElementById("games").classList.remove("d-none");
      document.getElementById("game-details").classList.add("d-none");
    })
  }
}
