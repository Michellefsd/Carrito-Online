const carrito = document.querySelector('#carrito');
const carritoDeCompras = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
const cantidadArticulos = document.createElement('p');


cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        const cursos = articulosCarrito.map( curso => {
            if(cursoId === curso.id) {
                if(curso.cantidad > 1) {
                    curso.cantidad--;
                    
                    carritoHTML();
                }else {
                    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
                    carritoHTML();
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
    // carritoDeCompras.innerHTML = '';
    while(carritoDeCompras.firstChild) { 
        carritoDeCompras.removeChild(carritoDeCompras.firstChild)
    }
}

