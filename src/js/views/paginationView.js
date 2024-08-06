import icons from "url:../../img/icons.svg";
import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    let markup = "";

    if (curPage > 1) {
      markup += this._generateMarkupBtn("prev", curPage);
    }

    if (curPage < numPages) {
      markup += this._generateMarkupBtn("next", curPage);
    }

    return markup;
  }

  _generateMarkupBtn(side, curPage) {
    return `
        <button class="btn--inline pagination__btn--${side}">
            <span>${
              side === "next" ? `Page ${curPage + 1}` : `Page ${curPage - 1}`
            }</span>
            <svg class="search__icon">
                <use href="${icons}#${
      side === "next" ? "icon-arrow-right" : "icon-arrow-left"
    }"></use>
            </svg>
        </button>`;
  }
}

export default new PaginationView();
