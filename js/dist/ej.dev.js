"use strict";

function mostrarCurso(e) {
  var cursosEspecificos = document.querySelector('#curso-por-categoria');
  cursosEspecificos.innerHTML = "\n    <h2 class=\"centrar-texto\">".concat(e.target.value, "</h2>\n    <div id=\"aqui\" class=\"grid3\"></div>\n    ");
  var lugar = document.querySelector('#aqui'); //agrega curso generado x seleccion de categoria

  lugar.addEventListener('click', agregarCursoEspecifico);
  lugar.innerHTML = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = myCourses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      curso = _step.value;

      if (curso.categoria === datosBusqueda.categoria) {
        (function () {
          var agregarCursoEspecifico = function agregarCursoEspecifico() {
            var newCard = "\n                    <div class=\"card\">\n                        <img id=\"imagen-curso\" src=".concat(imagen, " class=\"imagen-curso u-full-width\">\n                        <div class=\"info-card\">\n                            <h4 id=\"titulo-curso\">").concat(titulo, "</h4>\n                            <p id=\"profesor-curso\">").concat(profesor, "</p>\n                            <img src=\"img/estrellas.png\">\n                            <p class=\"precio\">$800  <span class=\"u-pull-right \">$400</span></p>\n                            <a href=\"#\" class=\"u-semi-full-width button-primary button input agregar-carrito\" data-id=").concat(id, " >Agregar Al Carrito</a>\n                        </div>\n                    </div> \n                     ");
            var htmlCard = parser.parseFromString(newCard, 'text/html');
            console.log(htmlCard);
            lugar.appendChild(htmlCard.body.firstChild);
          };

          var resultado = myCourses.filter(filtrarCategoria);
          var _curso = curso,
              imagen = _curso.imagen,
              titulo = _curso.titulo,
              profesor = _curso.profesor,
              id = _curso.id;
          agregarCursoEspecifico();
        })();
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
//# sourceMappingURL=ej.dev.js.map
