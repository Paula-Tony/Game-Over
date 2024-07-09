export class ApiService {
  constructor() {
    this.baseUrl = `https://free-to-play-games-database.p.rapidapi.com/api`;
    this.options = {
      method: "GET",
      headers: {
        'x-rapidapi-key': 'cfbfff6c6cmsh423294daad14b2cp1e26b0jsn40c674d5bdd7',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      },
    };
  }
  async getData(endPoint) {
    const response = await fetch(this.baseUrl + endPoint, this.options);
    const data = await response.json();
    return data;
  }
}
