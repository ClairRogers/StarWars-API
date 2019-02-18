import Person from "../models/person.js";
import Starship from "../models/starship.js";

//Private

//creates an object to send requests from
let _peopleApi = axios.create({
  baseURL: 'https://swapi.co/api/people'
})

let _starshipApi = axios.create({
  baseURL: 'https://swapi.co/api/starships'
})

let _state = {
  people: [],
  nextPrevPeople: {
    nextUrl: '',
    prevUrl: ''
  },
  activePerson: {},
  starships: [],
  nextPrevShip: {
    nextUrl: '',
    prevUrl: ''
  },
  activeShip: {}
}

let _subscribers = {
  people: [],
  nextPrevPeople: [],
  activePerson: [],
  starships: [],
  nextPrevShip: [],
  activeShip: []

}

//HANDLES ALL ASYNC
function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn())
}


//Public
export default class SWService {

  addSubscribers(prop, fn) {
    _subscribers[prop].push(fn)
  }
  //get local data
  get People() {
    return _state.people.map(p => new Person(p)) //map breaks reference of each object in state... better security
  }
  get Next() {
    return _state.nextPrevPeople.nextUrl
  }
  get Previous() {
    return _state.nextPrevPeople.prevUrl
  }
  get ActivePerson() {
    //creates new object that is a copy of the active person (breaking reference)
    return new Person(_state.activePerson)
  }


  get Starships() {
    return _state.starships.map(s => new Starship(s))
  }
  get NextShip() {
    return _state.nextPrevShip.nextUrl
  }
  get PrevShip() {
    return _state.nextPrevShip.prevUrl
  }
  get ActiveShip() {
    return new Starship(_state.activeShip)
  }


  //make call to swapi api to get all ppl
  getAllApiPeople(url = '') {
    _peopleApi.get(url)
      .then(response => {
        //all axios requests return the results wrapped as a data object
        let people = response.data.results.map(d => new Person(d)) //word 'results' is totally dependent on the API; response is just a variable we can call whatever
        setState('nextPrevPeople', { nextUrl: response.data.next, prevUrl: response.data.previous })
        setState('people', people)
      })
      .catch(err => {
        console.error(err)
      })
  }
  getOneApiPerson(url) {
    _peopleApi.get(url)
      .then(res => {
        setState('activePerson', new Person(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }


  getAllApiShips(url = '') {
    _starshipApi.get(url)
      .then(response => {
        let ships = response.data.results.map(d => new Starship(d))
        setState('nextPrevShip', { nextUrl: response.data.next, prevUrl: response.data.previous })
        setState('starships', ships)
      })
      .catch(err => {
        console.error(err)
      })
  }
  getOneApiShip(url) {
    _starshipApi.get(url)
      .then(res => {
        setState('activeShip', new Starship(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}