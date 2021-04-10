//////////////THIS CLASS CREATE THE DROPDOWN ADVANCED SEARCH BUTTONS///////////////
class SearchField {
  constructor() {
    // eslint-disable-next-line func-names
    this.createSearchField = function (string) {
      return `
      <article class=article-${string}>
        <div class="search__filter__element --${string}">
            <span class="search__filter__label" id="currentFilter"
              >${string}</span
            >
            <input
              id="${string}Input"
              type="text"
              class="search__filter__input --${string}"
              placeholder="${string}"
            />
            <div class="arrow"></div>
          </div>
          <ul
          id="list${string}"
            class="search__filter__list --${string}"
          ></ul>
          </article>`;
    };
  }
}

export { SearchField as default };
