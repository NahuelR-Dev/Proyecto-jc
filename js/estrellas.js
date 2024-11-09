let calificacion = 0;

// Fincion donde maneja cuando elijen las estrellas
function seleccionarEstrella(event) {
    const valor = parseInt(event.target.getAttribute('data-value'));

    // Actualiza la seleccion de las estrellas
    calificacion = valor;

    // Marcar las estrellas de amarillo 
    const estrellas = document.querySelectorAll('.estrella');
    estrellas.forEach(estrella => {
        if (parseInt(estrella.getAttribute('data-value')) <= calificacion) {
            estrella.classList.add('seleccionada');
        } else {
            estrella.classList.remove('seleccionada');
        }
    });
}

// Función para agregar una reseña
function agregarReseña() {
    const input = document.getElementById("inputTexto");
    const texto = input.value.trim();

    // aca solo se agrega una reseña si el campo no esta vacio o si hay una reseña
    if (texto !== "" && calificacion > 0) {
        // creo un objeto reseña
        const reseña = { texto: texto, calificacion: calificacion };

        // veo si hay reseñas  creadas si las hay las recupero
        let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

        // agrego una reseña nueva 
        reseñas.push(reseña);

        // guardo en el storage
        localStorage.setItem("reseñas", JSON.stringify(reseñas));

        // limpia el input 
        input.value = "";
        calificacion = 0;
        actualizarEstrellas();

        // actualizo la vista de reseñas
        mostrarReseñas();
    }
}

// funcion para las reseñas
function mostrarReseñas() {
    const contenedorReseñas = document.getElementById("contenedorReseñas");

    // limpio el contenedor de reseñas 
    contenedorReseñas.innerHTML = "";

    // Agarro todo lo guardado en el local storage
    const reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

    // si la reseña existe que se muestre
    if (reseñas.length > 0) {
        reseñas.forEach(reseña => {
            // creo un div para cada reseña y le agrego la clase 
            const divReseña = document.createElement("div");
            divReseña.classList.add("reseña");

            //  agrego el texto reseña
            const textoReseña = document.createElement("p");
            textoReseña.textContent = reseña.texto;
            divReseña.appendChild(textoReseña);

            // creo un div para las estrellas
            const divEstrellas = document.createElement("div");
            divEstrellas.classList.add("estrellas");

            // Añado las estrellas mediante las que el usuario eligió 
            for (let i = 1; i <= 5; i++) {
                const estrella = document.createElement("span");
                estrella.classList.add("estrella");
                estrella.innerHTML = "&#9733;";
                if (i <= reseña.calificacion) {
                    estrella.classList.add("seleccionada");
                }
                divEstrellas.appendChild(estrella);
            }

            // añado las estrellas al contenedor 
            divReseña.appendChild(divEstrellas);

            // añado la reseña al contenedor
            contenedorReseñas.appendChild(divReseña);
        });
    }
}

// funcion que reinicia las estrellas elegidas
function actualizarEstrellas() {
    const estrellas = document.querySelectorAll('.estrella');
    estrellas.forEach(estrella => {
        estrella.classList.remove('seleccionada');
    });
}

// colorea las estrellas seleccionadas
const estrellasElementos = document.querySelectorAll('.estrella');
estrellasElementos.forEach(estrella => {
    estrella.addEventListener('click', seleccionarEstrella);
});

// Mostrar reseñas al cargar la página
window.addEventListener('DOMContentLoaded', mostrarReseñas);
