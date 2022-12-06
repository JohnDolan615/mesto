export default class Section{
    constructor({items, renderer}, contanerSelector){
        this._items = items;
        this._renderer = renderer;
        this._contanerSelector = document.querySelector(contanerSelector);
    }

    addItem(element) {
        this._contanerSelector.append(element);
    }
    
    renderCard() {
        this._items.forEach(element => {
            this._renderer(element);
        });
    }

}