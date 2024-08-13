class ToolsView {
    _parentElement = document.querySelector(".search-results-tools");
    addHandlerTools(handler) {
        this._parentElement.addEventListener("change", function (e) {
            const target = e.target;
            if (target.matches(".select")) {
                handler(target.value);
            }
        });    
    }
}

export default new ToolsView();