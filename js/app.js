"use strict";

new MapCreator({
  el: document.querySelector(".map-creator"),
  formHTML: document.getElementById("create-controls-template").innerHTML,
  controlsHTML: document.getElementById("fill-controls-template").innerHTML,
  outputHTML: document.getElementById("output-template").innerHTML
});
