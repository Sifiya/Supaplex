"use strict";

class MapField {
  constructor(options) {
    this._el = options.el;
    this._output = this._el.querySelector('.map-creator__output');
    this._controls = options.controls;
    this._height = options.height;
    this._width = options.width;

    this._onCellOver = this._onCellOver.bind(this);
    this._fillCell = this._fillCell.bind(this);
    this._fillOutput = this._fillOutput.bind(this);
    this._createOutputObj = this._createOutputObj.bind(this);

    if (this._invalidOptions()) {
      return;
    }

    this._render();
    this._createOutputObj();

    if (!this._field) {
      alert("Ошибка создания!");
      return;
    }

    this._field.onmousedown = (e) => {
      this._clicked = true;
      this._fillCell(e);
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
    this._fillCell(e);
    //Функция будет заполнять клетку нужным содержимым по клику
  }

  _fillCell(e){
    let checkedInput = this._el.querySelector(".map-creator__controls__content:checked");
    if (!checkedInput) return;

    e.target.className = "map-creator__field__cell";
    e.target.classList.add(checkedInput.value);
    this._createOutputObj();
  }

  _createOutputObj() {
    let output = {
      width: this._width,
      height: this._height,
      grass: [],
      brick: [],
      wood: []
    };

    let rows = this._el.querySelectorAll(".map-creator__field > ul");
    let type;
    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].querySelectorAll("li");
      for (let j = 0; j < cells.length; j++) {

        switch (cells[j].className) {
          case "map-creator__field__cell grass-field":
            type = "grass";
            break;
          case "map-creator__field__cell brick-field":
            type = "brick";
            break;
          case "map-creator__field__cell wood-field":
            type = "wood";
            break;
          default:
            type = null;
            break;
        }

        if(type) output[type].push(`R${i}C${j}`);

      }
    }

    this._fillOutput(output);
  }

  _fillOutput(output) {
    this._output.value = JSON.stringify(output);
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
    this._output.before(this._field);
  }
}
