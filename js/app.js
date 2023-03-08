const carrito = document.querySelector('#carrito');
const carritoDeCompras = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
const seccion = document.querySelector('#curso-por-categoria');

//      variables del numero flotante
const absoluto = document.querySelector('.absolute');
const contador = document.createElement('p');


//  EVENTOS
cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    seccion.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    
    
    // //muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
        carritoHTML();
        actualizarProd();
    })
}

////// JAvascript de numero flotante   ///////
function actualizarProd() {
    const array = [];
    let total = 0;
    articulosCarrito.forEach(curso => {
        array.push(curso.cantidad);
    })
    for( let i of array) {
        total += i;
    }
   
    contador.classList.add('contador', 'relative');
    absoluto.appendChild(contador);
    contador.textContent = total;
    if(total === 0) {
    contador.remove()
    }
}

vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML(carritoDeCompras);
    actualizarProd();
    sincronizarStorage();
})


function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        actualizarProd();
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        const cursos = articulosCarrito.map( curso => {
            if(cursoId === curso.id) {
                if(curso.cantidad > 1) {
                    curso.cantidad--;  
                    actualizarProd();
                    carritoHTML();
                }else {
                    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
                    carritoHTML();
                    actualizarProd();
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
        // precio: curso.querySelector('.precio span').textContent,
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

    limpiarHTML(carritoDeCompras);
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
    });
   
    // agregar el carrito de Compras al LocalStorage
    sincronizarStorage();
}
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}
function limpiarHTML(espacio) {
    while(espacio.firstChild) {
        espacio.removeChild(espacio.firstChild)
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

    for(let opcion of categorias) {
        const option = document.createElement('option')
        option.text = opcion;
        option.value = opcion;
        buscador.appendChild(option)
    }
}

const datosBusqueda = {
    categoria: ''
}

buscador.addEventListener('change', e => {
    datosBusqueda.categoria = e.target.value
    filtrarDatos(); 
    mostrarCurso(e)  
})
// buscador.selectedIndex = "1";

function filtrarDatos() {
    const resultado = myCourses.filter(filtrarCategoria);
}

function filtrarCategoria(curso) {
    const {categoria} = datosBusqueda
    if(categoria) {
        return curso.categoria === categoria;    
    }
        return curso;
}

let parser = new DOMParser();

function mostrarCurso(e) {
    const cursosEspecificos = document.querySelector('#curso-por-categoria');
    cursosEspecificos.innerHTML = `
    <h2 class="centrar-texto">${e.target.value}</h2>
    <div id="aqui" class="grid3"></div>
    `
    const lugar = document.querySelector('#aqui');
    //agrega curso generado x seleccion de categoria
    lugar.addEventListener('click', agregarCursoEspecifico);
    lugar.innerHTML = ``;
    for(curso of myCourses) {
        if(curso.categoria === datosBusqueda.categoria) {
            const resultado = myCourses.filter(filtrarCategoria);
            const {imagen, titulo, profesor, id} = curso;
            agregarCursoEspecifico();
            function agregarCursoEspecifico(){                
                let newCard = `
                    <div class="card">
                        <img id="imagen-curso" src=${imagen} class="imagen-curso u-full-width">
                        <div class="info-card">
                            <h4 id="titulo-curso">${titulo}</h4>
                            <p id="profesor-curso">${profesor}</p>
                            <img src="img/estrellas.png">
                            <p class="precio">$800  <span class="u-pull-right ">$400</span></p>
                            <a href="#" class="u-semi-full-width button-primary button input agregar-carrito" data-id=${id} >Agregar Al Carrito</a>
                        </div>
                    </div> 
                     `;
                
                let htmlCard = parser.parseFromString(newCard, 'text/html');
                console.log(htmlCard);
                lugar.appendChild(htmlCard.body.firstChild);
            }
        }
    }
}

// buscador textual

const buscadorTextual = document.querySelector('#submit-buscador')
const botonBuscador = document.querySelector('.submit-buscador');

botonBuscador.addEventListener('click', buscarCurso);

function buscarCurso() {
    const requirement = buscadorTextual.value.toLowerCase();
    for(let curso of myCourses) {
        const titulo = curso.titulo.toLowerCase();
        // const profesor = curso.profesor.toLowerCase();
        if(titulo.includes(requirement)){
            console.log(titulo)
            limpiarHTML(seccion);
            
        }
    }
    }