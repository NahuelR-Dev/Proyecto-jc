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
