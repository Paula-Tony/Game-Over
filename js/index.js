import { ApiService } from "./api-service.js";
import { UI } from "./ui.js";

async function init() {
  const apiService = new ApiService();
  const ui = new UI("games-container", "game-details-container");

  const loadGames = async (category) => {
    ui.gamesContainer.innerHTML = '<div class="loader position-absolute top-50 start-50"></div>';
    const gamesData = await apiService.getData(`/games?category=${category}`);
    ui.displayGames(gamesData, apiService.getData.bind(apiService));
  };

  ui.handleNavLinks(loadGames);

  loadGames("mmorpg");
}

init();
