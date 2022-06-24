export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(this._containerSelector);
    }

    renderElements() {
        this.items.forEach(item => {
            this._renderer(item);
        })
    }
    addItem(element) {
        this._container.prepend(element);
    }
}