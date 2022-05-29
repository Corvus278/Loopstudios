class MobileMenu {
  constructor() {
    this.main()
  }

  #id = {
    btnOpen: '#burger-btn',
    mobileMenu: '#mobile-menu',
    btnClose: '#mobile-menu-close'
  }

  #mobileMenu = document.querySelector(this.#id.mobileMenu)
  #btnClose = document.querySelector(this.#id.btnClose)
  #btnOpen = document.querySelector(this.#id.btnOpen)

  toggle = () => {
    this.#mobileMenu.classList.toggle(this.#mobileMenu.classList[0] + '--active')
  }

  main = () => {
    this.#btnOpen.addEventListener('click', this.toggle)
    this.#btnClose.addEventListener('click', this.toggle)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = new MobileMenu;

})