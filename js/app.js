

const carrito = document.querySelector('#carrito');
const carritoDeCompras = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
const cantidadArticulos = document.createElement('p');

//      variables del numero flotante
const absoluto = document.querySelector('.absolute');
contador = document.createElement('p');


//  EVENTOS
cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
        contador.textContent = "";
        contador.remove();
    })
}

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        contadorMasProd();
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


////// JAvascript de numero flotante   ///////

function contadorMasProd() {
        if(absoluto.appendChild(contador)) {
                crearContador()
            }
            varios = contador.textContent;
            contador.textContent = ++varios;
            if(varios === 1) {
                    contador.classList.add('contador');
                }

            }

            function crearContador(){
                    contador.classList.add('relative');
                    absoluto.appendChild(contador);
                }

                function contadorMenosProd() {
                        varios = contador.textContent;
                        contador.textContent = --varios;
    if(varios === 0) {
            contador.remove()
        }
    }
    ////////////////////////////////////////////////////

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        const cursos = articulosCarrito.map( curso => {
            if(cursoId === curso.id) {
                if(curso.cantidad > 1) {
                    curso.cantidad--;
                    contadorMenosProd();
                    carritoHTML();
                }else {
                    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
                    carritoHTML();
                    contadorMenosProd();
                }

            }
        })

    }
}


function leerDatosCurso(curso){
    // creamos un objeto
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id) ;
    if(existe) {
        //actualizar cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna objeto actualizado
            } else {
                return curso; // retorna objetos no duplicadsos
            }
        } )
    }else {
        articulosCarrito = [...articulosCarrito, infoCurso];

    }

    carritoHTML();

}
// muestra cursos en el carrito

function carritoHTML(){

    limpiarHTML();
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad }  = curso;
        row.innerHTML = `

        <td>
            <img src="${curso.imagen}" width="100%"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>

        `;
        carritoDeCompras.appendChild(row);
    })
};


function limpiarHTML() {
    while(carritoDeCompras.firstChild) {
        carritoDeCompras.removeChild(carritoDeCompras.firstChild)
    }
}

///////////////////////////////////////////////////////////////////



// generar buscador//
const buscador = document.querySelector('#buscador');


const repetidos = myCourses.map(curso => {
    return curso.categoria;
});

const unicos = new Set(repetidos);
const categorias = [...unicos];

document.addEventListener("DOMContentLoaded", cargarCategorias)
// funcion para Cargar categorias al campo <select>
function cargarCategorias() {

    for(opcion of categorias) {
        const option = document.createElement('option')
        option.text = opcion;
        option.value = opcion;
        buscador.appendChild(option)
    }
}

const datosBusqueda = {
    categoria: ''
}

buscador.addEventListener('change', e =>{
    datosBusqueda.categoria = e.target.value
    filtrarDatos(); /////////////////////////////////////////////////
    console.log(datosBusqueda)
})

