class SortView {

    _parentElement = document.querySelector('.sort-options');

    addHandlerSort(handler) {
        this._parentElement.addEventListener('change', function (e) {
            handler(e.target.value);
        });
    }
}

export default new SortView();