"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var carrito = document.querySelector('#carrito');
var carritoDeCompras = document.querySelector('#lista-carrito tbody');
var vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
var listaCursos = document.querySelector('#lista-cursos');
var articulosCarrito = [];
var seccion = document.querySelector('#curso-por-categoria'); //      variables del numero flotante

var absoluto = document.querySelector('.absolute');
var contador = document.createElement('p'); //  EVENTOS

cargarEventListeners();

function cargarEventListeners() {
  listaCursos.addEventListener('click', agregarCurso);
  seccion.addEventListener('click', agregarCurso);
  carrito.addEventListener('click', eliminarCurso); // //muestra los cursos de localStorage

  document.addEventListener('DOMContentLoaded', function () {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
    actualizarProd();
  });
} ////// JAvascript de numero flotante   ///////


function actualizarProd() {
  var array = [];
  var total = 0;
  articulosCarrito.forEach(function (curso) {
    array.push(curso.cantidad);
  });

  for (var _i = 0, _array = array; _i < _array.length; _i++) {
    var i = _array[_i];
    total += i;
  }

  contador.classList.add('contador', 'relative');
  absoluto.appendChild(contador);
  contador.textContent = total;

  if (total === 0) {
    contador.remove();
  }
}

vaciarCarritoBtn.addEventListener('click', function () {
  articulosCarrito = [];
  limpiarHTML(carritoDeCompras);
  actualizarProd();
  sincronizarStorage();
});

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    var cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
    actualizarProd();
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    var cursoId = e.target.getAttribute('data-id');
    var cursos = articulosCarrito.map(function (curso) {
      if (cursoId === curso.id) {
        if (curso.cantidad > 1) {
          curso.cantidad--;
          actualizarProd();
          carritoHTML();
        } else {
          articulosCarrito = articulosCarrito.filter(function (curso) {
            return curso.id !== cursoId;
          });
          carritoHTML();
          actualizarProd();
        }
      }
    });
  }
}

function leerDatosCurso(curso) {
  // creamos un objeto
  var infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    // precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }; // revisa si un elemento ya existe en el carrito

  var existe = articulosCarrito.some(function (curso) {
    return curso.id === infoCurso.id;
  });

  if (existe) {
    //actualizar cantidad
    var cursos = articulosCarrito.map(function (curso) {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna objeto actualizado
      } else {
        return curso; // retorna objetos no duplicadsos
      }
    });
  } else {
    articulosCarrito = [].concat(_toConsumableArray(articulosCarrito), [infoCurso]);
  }

  carritoHTML();
} // muestra cursos en el carrito


function carritoHTML() {
  limpiarHTML(carritoDeCompras);
  articulosCarrito.forEach(function (curso) {
    var row = document.createElement('tr');
    var imagen = curso.imagen,
        titulo = curso.titulo,
        precio = curso.precio,
        cantidad = curso.cantidad;
    row.innerHTML = "\n\n        <td>\n            <img src=\"".concat(curso.imagen, "\" width=\"100%\"></td>\n        <td>").concat(curso.titulo, "</td>\n        <td>").concat(curso.precio, "</td>\n        <td>").concat(curso.cantidad, "</td>\n        <td>\n        <a href=\"#\" class=\"borrar-curso\" data-id=\"").concat(curso.id, "\"> X </a>\n        </td>\n\n        ");
    carritoDeCompras.appendChild(row);
  }); // agregar el carrito de Compras al LocalStorage

  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML(espacio) {
  while (espacio.firstChild) {
    espacio.removeChild(espacio.firstChild);
  }
} ///////////////////////////////////////////////////////////////////
///// generar buscador//
// Buscador por categorias


var buscador = document.querySelector('#buscador');
var repetidos = myCourses.map(function (curso) {
  return curso.categoria;
});
var unicos = new Set(repetidos);

var categorias = _toConsumableArray(unicos);

document.addEventListener("DOMContentLoaded", cargarCategorias); // funcion para Cargar categorias al campo <select>

function cargarCategorias() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = categorias[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var opcion = _step.value;
      var option = document.createElement('option');
      option.text = opcion;
      option.value = opcion;
      buscador.appendChild(option);
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

var datosBusqueda = {
  categoria: ''
};
buscador.addEventListener('change', function (e) {
  datosBusqueda.categoria = e.target.value;
  filtrarDatos();
  mostrarCurso(e);
}); // buscador.selectedIndex = "1";

function filtrarDatos() {
  var resultado = myCourses.filter(filtrarCategoria);
}

function filtrarCategoria(curso) {
  var categoria = datosBusqueda.categoria;

  if (categoria) {
    return curso.categoria === categoria;
  }

  return curso;
}

var parser = new DOMParser();

function mostrarCurso(e) {
  limpiarHTML(seccion);
  seccion.innerHTML = "\n    <h2 class=\"centrar-texto\">".concat(e.target.value, "</h2>\n    <div id=\"aqui\" class=\"grid3\"></div>\n    ");
  var lugar = document.querySelector('#aqui'); //agrega curso generado x seleccion de categoria

  lugar.addEventListener('click', agregarCursoEspecifico);
  lugar.innerHTML = "";
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = myCourses[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      curso = _step2.value;

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
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
} // buscador textual por Lupa


var buscadorTextual = document.querySelector('#submit-buscador');
var botonBuscador = document.querySelector('.submit-buscador');
botonBuscador.addEventListener('click', buscarCurso);

function buscarCurso() {
  var requirement = buscadorTextual.value.toLowerCase();
  limpiarHTML(seccion);
  agregarDivNewCard();

  function agregarDivNewCard() {
    seccion.innerHTML = "\n        <h2 class=\"centrar-texto\">Los Resultados de su B\xFAsqueda</h2>\n        <div class=\"grid3\" id=\"lugar-lupa\"></div>\n        ";
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = myCourses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _curso2 = _step3.value;

        var titulo = _curso2.titulo.toLowerCase();

        var profesor = _curso2.profesor.toLowerCase();

        if (titulo.includes(requirement) || profesor.includes(requirement)) {
          var imagen = _curso2.imagen,
              _titulo = _curso2.titulo,
              _profesor = _curso2.profesor,
              id = _curso2.id;
          console.log(_titulo);
          var divLupa = document.querySelector("#lugar-lupa");
          var newCard = "\n                <div class=\"card\">\n                    <img id=\"imagen-curso\" src=".concat(imagen, " class=\"imagen-curso u-full-width\">\n                    <div class=\"info-card\">\n                        <h4 id=\"titulo-curso\">").concat(_titulo, "</h4>\n                        <p id=\"profesor-curso\">").concat(_profesor, "</p>\n                        <img src=\"img/estrellas.png\">\n                        <p class=\"precio\">$800  <span class=\"u-pull-right \">$400</span></p>\n                        <a href=\"#\" class=\"u-semi-full-width button-primary button input agregar-carrito\" data-id=").concat(id, " >Agregar Al Carrito</a>\n                    </div>\n                </div>\n                <hr>\n            ");
          var htmlCard = parser.parseFromString(newCard, 'text/html');
          console.log(htmlCard); // newCard.appendChild(buscadosPorLupa);

          divLupa.appendChild(htmlCard.body.firstChild);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }
}
//# sourceMappingURL=app.dev.js.map
