export default class Section{
    constructor({items, renderer}, contanerSelector){
        this.items = items;
        this.renderer = renderer;
        this.contanerSelector = document.querySelector(contanerSelector);
    }

    renderCard = () =>{
        this.items.forEach((element) => {
            this.renderer(element);
          });
    }

    addItem = (element) => {
        this.contanerSelector.prepend(element);
      }
}