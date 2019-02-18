export default class Person {
  constructor(data) {
    this.name = data.name
    this.gender = data.gender
    this.height = data.height
    this.hairColor = data.hair_color || data.hairColor
    this.eyeColor = data.eye_color || data.eyeColor
    this.movies = data.movies || data.films.length
    this.url = data.url
  }
  getBasicTemplate() {
    return `<p onclick="app.controllers.swController.getPerson('${this.url}')">${this.name}</p>`
  }
  getDetailedTemplate() {
    return `
    <h3>${this.name}</h3>
      <p>Gender: ${this.gender}</p>
      <p>Hair: ${this.hairColor}</p>
      <p>Eyes: ${this.eyeColor}</p>
      <p>Movies: ${this.movies}</p>
    `
  }
}