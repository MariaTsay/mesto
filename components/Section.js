export class Section {
    items;
    renderer;
    containerSelector;

    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(item) {
        this._container.prepend(item);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        })
    }
    
}