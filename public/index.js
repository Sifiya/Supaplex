/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_creator_map_creator__ = __webpack_require__(1);




new __WEBPACK_IMPORTED_MODULE_0__map_creator_map_creator__["a" /* default */]({
  el: document.querySelector(".map-creator"),
  formHTML: document.getElementById("create-controls-template").innerHTML,
  controlsHTML: document.getElementById("fill-controls-template").innerHTML,
  outputHTML: document.getElementById("output-template").innerHTML
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_field_map_field__ = __webpack_require__(2);




class MapCreator {
  constructor(options) {
    this._el = options.el;
    this._formHTML = options.formHTML;
    this._controlsHTML = options.controlsHTML;
    this._outputHTML = options.outputHTML;

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

    this._mapField = new __WEBPACK_IMPORTED_MODULE_0__map_field_map_field__["a" /* default */]({
      el: this._el,
      controls: this._el.querySelector(".map-creator__controls"),
      width: width,
      height: height
    }); // добавить свойства вызова
    // this._el.append(this._mapField);
  }

  _render() {
    this._el.innerHTML = this._formHTML + this._controlsHTML + this._outputHTML;
    this._el.querySelector('[name="create"]').onclick = this._onCreateField;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapCreator;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = MapField;



/***/ })
/******/ ]);