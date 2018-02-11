"use strict";

class MapCreator {
  constructor(options) {
    this._el = options.el;
    this._formHTML = options.formHTML;
    this._controlsHTML = options.controlsHTML;

    this._onCreateField = this._onCreateField.bind(this);

    this._render();
  }

  _onCreateField(e) {
    if (this._el.querySelector(".map-creator__field")) {
      this._el.querySelector(".map-creator__field").remove();
    }
    let form = e.target.closest("form");
    let width = Number(form.elements.width.value);
    let height = Number(form.elements.height.value);

    this._mapField = new MapField({
      el: this._el,
      controls: this._el.querySelector(".map-creator__controls"),
      width: width,
      height: height
    }); // добавить свойства вызова
    // this._el.append(this._mapField);
  }

  _render() {
    this._el.innerHTML = this._formHTML + this._controlsHTML;
    this._el.querySelector('[name="create"]').onclick = this._onCreateField;    
  }
}
