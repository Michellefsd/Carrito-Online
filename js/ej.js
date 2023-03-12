






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