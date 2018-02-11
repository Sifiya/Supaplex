"use strict";

class MapField {
  constructor(options) {
    this._el = options.el;
    this._controls = options.controls;
    this._height = options.height;
    this._width = options.width;

    this._onCellOver = this._onCellOver.bind(this);

    if (this._invalidOptions()) {
      return;
    }

    this._render();

    if (!this._field) {
      alert("Ошибка создания!");
      return;
    }

    this._field.onmousedown = () => {
      this._clicked = true;
    };

    this._el.ondragstart = () => { return false; };

    document.onmouseup = () => {
      this._clicked = false;
    };

    this._field.onmouseover = this._onCellOver;
  }

  _onCellOver(e) {
    if (!this._clicked ||
        !(e.target.classList.contains("map-creator__field__cell"))) return;
    let checkedInput = this._el.querySelector(".map-creator__controls__content:checked");
    if (!checkedInput) return;

    e.target.className = "map-creator__field__cell";
    e.target.classList.add(checkedInput.value);
    //Функция будет заполнять клетку нужным содержимым по клику
  }

  _invalidOptions() {
    if (!this._controls || !this._controls) {
      alert('Ошибка загрузки интерфейса. Перезагрузите страницу');
      return true;
    }

    if (!this._height ||
         this._height < 0 ||
         Math.round(this._height)  !== this._height ||
        !this._width ||
         this._width < 0 ||
         Math.round(this._width)  !== this._width) {
      alert('Неправильные исходные данные. Ширина и высота дожны быть положительными целыми числами');
      return true;
    }
    return false;
  }

  _render() {
    this._field = document.createElement('div');
    this._field.className = 'map-creator__field';
    let fieldHTML = '';

    for (let i = 0; i < this._height; i++) {
      fieldHTML += '<ul>';
      for (let j = 0; j < this._width; j++) {
        fieldHTML += '<li class="map-creator__field__cell empty-field"></li>';
      }
      fieldHTML += '</ul>';
    }

    this._field.innerHTML = fieldHTML;
    this._el.append(this._field);
  }
}
