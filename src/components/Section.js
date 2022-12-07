export default class Section{
    constructor(contanerSelector){
        this._contanerSelector = document.querySelector(contanerSelector);
    }

    addItem(element) {
        this._contanerSelector.append(element);
    }
    
    renderCard({items, renderer}) {
        this._items = items;
        this._renderer = renderer;
        this._items.forEach(element => {
            this._renderer(element);
        });
    }

}