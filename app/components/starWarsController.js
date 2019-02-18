import SWService from "./starWarsService.js";

//Private
let _sws = new SWService



function drawPeople() {
  let people = _sws.People
  let template = ''
  people.forEach(p => {
    template += p.getBasicTemplate()
  })
  document.getElementById('sw-items').innerHTML = template
  document.getElementById('buttons').innerHTML = `<button ${_sws.Previous ? '' : 'disabled'} type="button" class="btn btn-warning mb-4" onclick="app.controllers.swController.getPeople('${_sws.Previous}')">Previous</button>
    <button ${_sws.Next ? '' : 'disabled'} type="button" class="btn btn-warning mb-4" onclick="app.controllers.swController.getPeople('${_sws.Next}')">Next</button>`
}

function drawActivePerson() {
  document.getElementById('active-item').innerHTML = _sws.ActivePerson.getDetailedTemplate()
}




function drawShips() {
  let ship = _sws.Starships
  let template = ''
  ship.forEach(s => {
    template += s.getBasicTemplate()
  })
  document.getElementById('sw-items').innerHTML = template
  document.getElementById('buttons').innerHTML = `<button ${_sws.PrevShip ? '' : 'disabled'} type="button" class="btn btn-warning mb-4" onclick="app.controllers.swController.getStarships('${_sws.PrevShip}')">Previous</button>
    <button ${_sws.NextShip ? '' : 'disabled'} type="button" class="btn btn-warning mb-4" onclick="app.controllers.swController.getStarships('${_sws.NextShip}')">Next</button>`
}

function drawActiveShip() {
  document.getElementById('active-item').innerHTML = _sws.ActiveShip.getDetailedTemplate()
}




//Public
export default class SWController {
  constructor() {
    _sws.addSubscribers('people', drawPeople)
    _sws.addSubscribers('activePerson', drawActivePerson)
    _sws.addSubscribers('starships', drawShips)
    _sws.addSubscribers('activeShip', drawActiveShip)
  }
  getPeople(url) {
    _sws.getAllApiPeople(url)
    document.getElementById('buttons').innerHTML = `<button ${_sws.Previous ? '' : 'disabled'} type="button" class="btn btn-warning mb-4" onclick="app.controllers.swController.getPeople('${_sws.Previous}')">Previous</button>
    <button type="button" class="btn btn-warning mb-4" onclick="app.controllers.swController.getPeople('${_sws.Next}')" ${_sws.Next ? '' : 'disabled'}>Next</button>`
    document.getElementById('active-item').innerHTML = ''
  }
  getPerson(url) {
    _sws.getOneApiPerson(url)
  }
  getStarships(url) {
    _sws.getAllApiShips(url)
    document.getElementById('buttons').innerHTML = `<button ${_sws.PrevShip ? '' : 'disabled'} type="button" class="btn btn-warning mb-4" onclick="app.controllers.swController.getStarships('${_sws.PrevShip}')">Previous</button>
    <button ${_sws.NextShip ? '' : 'disabled'} type="button" class="btn btn-warning mb-4" onclick="app.controllers.swController.getStarships('${_sws.NextShip}')">Next</button>`
    document.getElementById('active-item').innerHTML = ''
  }
  getShip(url) {
    _sws.getOneApiShip(url)
  }
}