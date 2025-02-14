const btncambia = document.getElementById("cambia");
const btncambio = document.getElementById("cambio");
const formregistro = document.querySelector(".registro");
const forminicio = document.querySelector(".inicio");

btncambia.addEventListener("click", e =>{
formregistro.classList.add("desaparecer");
forminicio.classList.remove("desaparecer")
})


btncambio.addEventListener("click", e =>{
    forminicio.classList.add("desaparecer");
    formregistro.classList.remove("desaparecer")
    })


    /*JS del formulario de Registro*/
    
    document.addEventListener("DOMContentLoaded", function() {
        const formulario = document.getElementById("registro-formulario");
        let fotoPerfil = null;

        // selecciona una foto de pefil 
        const imagenes = document.querySelectorAll(".imagen-perfil");
        imagenes.forEach(imagen => {
            imagen.addEventListener("click", () => {
                fotoPerfil = imagen.dataset.foto;
                //permite elegir otra foto si el usuario quiere
                document.querySelectorAll(".imagen-perfil").forEach(img => img.classList.remove("seleccionado"));
                imagen.classList.add("seleccionado");
            });
        });

        // registro completo
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();

            // confirmacion si el usuario eligio una foto de perfil o no 
            if (!fotoPerfil) {
                alert("Te olvidaste seleccionar una foto de perfil :) .");
                return;
            }

            const nombre = formulario.querySelector('input[placeholder="Nombre"]').value;
            const apellido = formulario.querySelector('input[placeholder="Apellido"]').value;
            const email = formulario.querySelector('input[placeholder="Correo Electrónico"]').value;
            const contrasena = formulario.querySelector('input[placeholder="Contraseña"]').value;

            // Guardo en el LocalStorage
            const usuario = {
                nombre,
                apellido,
                email,
                contrasena,
                fotoPerfil
            };

            localStorage.setItem("usuario", JSON.stringify(usuario));

            alert("Te registraste correctamente :) ");

            // limpio el formulario despues de registrame
            formulario.reset();
            document.querySelectorAll(".imagen-perfil").forEach(img => img.classList.remove("seleccionado"));
            fotoPerfil = null; // reinicio la foto de perfil
        });
    });


    /*Iniciar sesion*/

    document.addEventListener("DOMContentLoaded", 
            
        function() {
        const inicioFormu = document.getElementById("inicio-formulario");
        const errorMessage = document.getElementById("mensaje-error");

        //el manejo del formulario
        inicioFormu.addEventListener("submit", function(e) {
            e.preventDefault();

            // agarra el formulario iniciosecion
            const inicioEmail = document.getElementById("inicio-Email").value;
            const inicioContra = document.getElementById("inicio-contra").value;

            // agarra los datos guardados del local storage
            const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

            // mira si los datos del localstorage estan bien 
            if (usuarioGuardado && usuarioGuardado.email === inicioEmail && usuarioGuardado.contrasena === inicioContra) {
                
                window.location.href = "index.html"; // Si esta todo ok me manda al index
            } else {
                // Muestra el mensaje de error
                errorMessage.style.display = "block";
            }
        });
    });