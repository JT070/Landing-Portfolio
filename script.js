// ----------------------   MENU   --------------------------------
// Función anónima autoejecutable
((d) => {
    const $btnMenu = d.querySelector(".menu-btn");
    const $menu = d.querySelector(".menu");  
    
    $btnMenu.addEventListener("click", (e) => {
        // Cambia la clase del Botón Menú
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        // Quita y pone la clase según le demos CLICK al botón
        $menu.classList.toggle("is-active");
    }); 
    
    // Delegación de Eventos
    d.addEventListener("click", (e) => {

        // Si clickeamos un enlace qu NO esté dentro del menú..
        if (!e.target.matches(".menu a")) return false;
          // -- target: Es el objeto que origina el evento 
          // --matches: Si coincide con ... (selector válido)

        // Si SÍ es un enlace dentro del menú, los dejamos por default 
        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");

        
    });

})(document);



// ----------------------   CONTACT FORM   --------------------------------
((d) => {
    const $form = d.querySelector(".contact-form"),          
          $loader = d.querySelector(".contact-form-loader"),
          $response = d.querySelector(".contact-form-response");
    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        // Esta página es una API (algo de AJAX) para que nos lleguen correos
        fetch("https://formsubmit.co/ajax/JavierTrejoRod@gmail.com", {
            method: "POST",
            body: new FormData(e.target),
        })
        .then((res) => (res.ok ? res.json() : Promise.reject(res))) 
        .then((json) => {    
            console.log(json);
            location.hash = "#gracias";
            $form.reset();
        }) 
        .catch((err) => {
            console.log(json);
            console.log(err);
            // Si no existe un mensaje de error por defecto, lo creamos nosotros
            let message = err.status || "Ocurrió un error al enviar, intenta nuevamente."; 
            $response.querySelector("h3").innerHTML = `Error: ${err.status}: ${message}`;
        })
        .finally(() => {
            $loader.classList.add("none");   
            setTimeout(() => {
                location.hash = "#close";
            }, 3000);         
        });
    });      
})(document);
