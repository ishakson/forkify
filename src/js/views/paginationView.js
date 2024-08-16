import icons from "url:../../img/icons.svg";
import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (numPages <= 1) return '';

    return `
      ${this._generateFirstButton(curPage)}
      ${this._generatePrevButton(curPage)}
      ${this._generatePageButtons(curPage, numPages)}
      ${this._generateNextButton(curPage, numPages)}
      ${this._generateLastButton(curPage, numPages)}
    `;
  }

  _generateFirstButton(curPage) {
    if (curPage === 1) return '';
    return this._generateMarkupBtn("first", 1, '<<');
  }

  _generateLastButton(curPage, numPages) {
    if (curPage === numPages) return '';
    return this._generateMarkupBtn("last", numPages, '>>');
  }

  _generatePrevButton(curPage) {
    return curPage > 1
      ? this._generateMarkupBtn("prev", curPage - 1, "<")
      : "";
  }

  _generateNextButton(curPage, numPages) {
    return curPage < numPages
      ? this._generateMarkupBtn("next", curPage + 1, ">")
      : "";
  }

  _generatePageButtons(curPage, numPages) {
    let pageButtons = '';
    for (let i = 1; i <= numPages; i++) {
      pageButtons += this._generateMarkupBtn("page", i, i, curPage === i);
    }
    return pageButtons;
  }

  _generateMarkupBtn(type, page, text, isActive = false) {
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type} ${isActive ? 'pagination__btn--active' : ''}">
        <span>${text}</span>
        ${type === 'prev' || type === 'next' ? `
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${type === "next" ? "right" : "left"}"></use>
        </svg>
        ` : ''}
      </button>
    `;
  }
}

export default new PaginationView();
