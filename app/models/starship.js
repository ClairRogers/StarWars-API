export default class Starship {
  constructor(data) {
    this.name = data.name
    this.starship_class = data.starship_class
    this.cost_in_credits = data.cost_in_credits
    this.crew = data.crew
    this.passengers = data.passengers
    this.speed = data.speed || data.max_atmosphering_speed
    this.hyperdrive = data.hyperdrive || data.hyperdrive_rating
    this.url = data.url
  }
  getBasicTemplate() {
    return `<p onclick="app.controllers.swController.getShip('${this.url}')">${this.name}</p>`
  }
  getDetailedTemplate() {
    return `
    <h3>${this.name}</h3>
      <p>Class: ${this.starship_class}</p>
      <p>Cost: ${this.cost_in_credits} credits</p>
      <p>Crew: ${this.crew} crewmembers</p>
      <p>Passengers: ${this.passengers} people</p>
      <p>Max Speed: ${this.speed} km/p</p>
      <p>Hyperdrive rating: ${this.hyperdrive}</p>
    `
  }
}