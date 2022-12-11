class Course {
    constructor(titulo, imagen, profesor, id, categoria) {
        this.titulo = titulo;
        this.imagen = imagen;
        this.profesor = profesor;
        this.id = id;
        this.categoria = categoria;
    }
    inHTML() {
        const imagenCurso = document.querySelector('#imagen-curso');
        const tituloCurso = document.querySelector('#titulo-curso');
        const profesorCurso = document.querySelector('#profesor-curso');
        const idCurso = document.querySelector('#id-curso');
        imagenCurso.setAttribute('src', this.imagen);
        imagenCurso.textContent = this.imagen;
        imagenCurso.textContent = this.imagen;
        imagenCurso.setAttribute('data-id', this.id);
    }
}

const course1 = new Course('HTML5, CSS3, JavaScript para Principiantes', "img/curso1.jpg", 'Michelle Rodríguez', 1, 'Tecnología');
const course2  = new Course('Comida Vegetariana', "img/curso2.jpg", 'Julia Odera', 2, 'Culinaria');
const course3  = new Course('Comedia Musical', "img/curso3.jpg", 'Paula Busco', 3, 'Expresión Corporal');
const course4 = new Course('Huerto en tu casa', "img/curso4.jpg", 'Jhonny Huertas', 4, 'Jardín y Cultivo');
const course5 = new Course('Decoración con productos de tu hogar', "img/curso5.jpg", 'Zafiro Lallanes', 5, 'Manualidades');
const course6 = new Course('Diseño Web para Principiantes', "img/curso1.jpg", 'Michelle Rodríguez', 6, 'Tecnología');
const course7  = new Course('Aprende a hacer Sushi', "img/curso2.jpg", 'Michelle Rodríguez', 7, 'Culinaria');
const course9 = new Course('Estudio Musical en tu casa', "img/curso3.jpg", 'Juan Rodríguez', 8, 'Música');
const course8 = new Course('Cosecha tus propias frutas y verduras', "img/curso4.jpg",'Zafiro Lallanes', 9, 'Jardín y Cultivo');
const course10 = new Course('Bio Danza', "img/curso5.jpg", 'Leticia Cabrera', 10, 'Expresión Corporal');
const course11 = new Course('Empoderamiento y Ejecución', "img/curso1.jpg", 'Michelle Rodríguez', 11, 'Soft Skills');
const course12 = new Course('100 Recetas de Comida Natural', "img/curso2.jpg", 'Julia Odera', 12, 'Culinaria');

const myCourses = [];

myCourses.push( course1, course2, course3, course4, course5, course6, course7, course8, course9, course10, course11, course12);









