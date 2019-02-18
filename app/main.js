import SWController from "./components/starWarsController.js";


class App {
  constructor() {
    this.controllers = {
      swController: new SWController()
    }
  }
}

window.app = new App()