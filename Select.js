export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.selectedID = options.selectedID ? options.selectedID.toString() : "1"
    this.list = options.list
    this.callbackFn = options.callbackFn

    this.#render()
    this.#afterRender()
  }

  getTemplate() {

    const selectedItem = this.list.filter(i => i.id === this.selectedID)
    const title = selectedItem.length ? selectedItem[0].title : "Выберите элемент"

    const items = this.list.map(i => {
      const activeClass = i.id === this.selectedID ?  ' class="active"' : ''
      

      return `<li${activeClass} data-id=${i.id}>${i.title}</li$>`
    }).join('')    

    return `
    <div class="select__input">
    <span data-type="selected">${title}</span>
      <i class="fa fa-chevron-down" aria-hidden="true"></i>
    </div>
    <div class="select__dropdown" data-type="dropdown">
      <div class="backdrop"></div>
      <ul>
        ${items}
      </ul>
    </div>    
    `
  }

  #render() {
    this.$el.classList.add("select")
    this.$el.innerHTML = this.getTemplate()
    this.$dropdown = document.querySelector('[data-type="dropdown"]')
  }

  #afterRender() {    
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener("click", this.clickHandler)
  }

  clickHandler(e) {
    if(e.target.dataset.id) {
      this.select(e.target.dataset.id)
    }
    this.toggle()
  }

  open() {    
    this.$dropdown.classList.add("open")
  }

  close() {
    this.$dropdown.classList.remove("open")
  }
  
  toggle() {
    this.$dropdown.classList.contains("open") ? this.close() : this.open()    
  }

  select(id) {
    this.selectedID = id.toString()
    this.#render()
    typeof this.callbackFn === "function" ? this.callbackFn(id) : null
    this.toggle()
  }

  destroy() {
    this.$el.removeEventListener("click", this.clickHandler)
    this.$el.innerHTML = ''
  }
}