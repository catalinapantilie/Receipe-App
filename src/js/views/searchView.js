class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandleSearch(handle) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handle();
    });
  }
}

export default new SearchView();
