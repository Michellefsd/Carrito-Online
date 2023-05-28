"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Course =
/*#__PURE__*/
function () {
  function Course(titulo, imagen, profesor, id, categoria) {
    _classCallCheck(this, Course);

    this.titulo = titulo;
    this.imagen = imagen;
    this.profesor = profesor;
    this.id = id;
    this.categoria = categoria;
  }

  _createClass(Course, [{
    key: "inHTML",
    value: function inHTML() {
      var imagenCurso = document.querySelector('#imagen-curso');
      var tituloCurso = document.querySelector('#titulo-curso');
      var profesorCurso = document.querySelector('#profesor-curso');
      var idCurso = document.querySelector('#id-curso');
      imagenCurso.setAttribute('src', this.imagen);
      imagenCurso.textContent = this.imagen;
      imagenCurso.textContent = this.imagen;
      imagenCurso.setAttribute('data-id', this.id);
    }
  }]);

  return Course;
}();

var course1 = new Course('HTML5, CSS3, JavaScript para Principiantes', "img/curso1.jpg", 'Michelle Rodríguez', 1, 'Tecnología');
var course2 = new Course('Comida Vegetariana', "img/curso2.jpg", 'Julia Odera', 2, 'Culinaria');
var course3 = new Course('Comedia Musical', "img/curso3.jpg", 'Paula Busco', 3, 'Expresión Corporal');
var course4 = new Course('Huerto en tu casa', "img/curso4.jpg", 'Jhonny Huertas', 4, 'Jardín y Cultivo');
var course5 = new Course('Decoración con productos de tu hogar', "img/curso5.jpg", 'Zafiro Lallanes', 5, 'Manualidades');
var course6 = new Course('Diseño Web para Principiantes', "img/curso1.jpg", 'Michelle Rodríguez', 6, 'Tecnología');
var course7 = new Course('Aprende a hacer Sushi', "img/curso2.jpg", 'Michelle Rodríguez', 7, 'Culinaria');
var course9 = new Course('Estudio Musical en tu casa', "img/curso3.jpg", 'Juan Rodríguez', 8, 'Música');
var course8 = new Course('Cosecha tus propias frutas y verduras', "img/curso4.jpg", 'Zafiro Lallanes', 9, 'Jardín y Cultivo');
var course10 = new Course('Bio Danza', "img/curso5.jpg", 'Leticia Cabrera', 10, 'Expresión Corporal');
var course11 = new Course('Empoderamiento y Ejecución', "img/curso1.jpg", 'Michelle Rodríguez', 11, 'Soft Skills');
var course12 = new Course('100 Recetas de Comida Natural', "img/curso2.jpg", 'Julia Odera', 12, 'Culinaria');
var myCourses = [];
myCourses.push(course1, course2, course3, course4, course5, course6, course7, course8, course9, course10, course11, course12);
//# sourceMappingURL=obj.dev.js.map
