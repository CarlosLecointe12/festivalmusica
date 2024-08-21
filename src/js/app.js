// Estas líneas de cógido solo esperan a que esté todo el código HTML, el CSS, etc. y entonces genera la galería o manda llamar
// esa función "crearGaleria()".

document.addEventListener('DOMContentLoaded', function () {
    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    document.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1) { // este código permite revisar si ya diste scroll lo suficiente para que pase un elemento
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria() {

    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes') // seleccionando la clase .galeria-imagenes

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        // Generando la imágen
        const imagen = document.createElement('IMG') // creando la imagen con .createElement('IMG')
        imagen.loading = 'lazy'
        imagen.width = '300'
        imagen.height = '200'
        imagen.src = `src/img/gallery/thumb/${i}.jpg` // accediendo a la ubicación de las imágenes
        imagen.alt = 'Imagen Galería' // texto alternativo

        // Event Handler
        // Proceso para detectar y responder a una interacción al usuario
        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen) // Agregando cada una de las imágenes
    }
}

//Creando una función para el Modal
function mostrarImagen(i) {

    const imagen = document.createElement('IMG') // creando la imagen con .createElement('IMG')
    imagen.src = `src/img/gallery/full/${i}.jpg` // accediendo a la ubicación de las imágenes
    imagen.alt = 'Imagen Galería' // texto alternativo

    // Generar Modal
    const modal = document.createElement('DIV') // Creando un "div"
    modal.classList.add('modal') // creando la clase "Modal"
    modal.onclick = cerrarModal

    // Botón para cerrar Modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    modal.appendChild(imagen) // agregando la imagen
    modal.appendChild(cerrarModalBtn)

    // Agregar el "Modal" al HTML
    const body = document.querySelector('body') // Seleccionando todo el "body" del HTML
    body.classList.add('overflow-hidden')
    body.appendChild(modal) // agrego el modal en el "body"

    console.log(modal);

}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    // con "setTimeout" retrasamos la ejecución del código "modal?.remove();" por medio segundo.
    setTimeout(() => {
        modal?.remove(); // el signo "?" significa: si existe "modal" elimínalo

        const body = document.querySelector('body') // Selecciono el "body"
        body.classList.remove('overflow-hidden') // y con "remove" eliminamos la clase "overflow-hidden"
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop // ".offsetTop" detecta la distancia entre la parte superior de ese section con su elemento padre
            const sectionHeight = section.clientHeight // ".clientHeight" lo que hace es: cuántos px mide ese section en el navegador
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) { // ".scrollY" significa el scroll que le damos de arriba hacia abajo.
                actual = section.id;
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach( link =>  {   // forEach es para iterar entre cada link
        link.addEventListener('click', e => {
            e.preventDefault()    // ".preventDefault()" es para eliminar el comportamiento de salto instántaneo
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll) // seleccionando el elmento "sectionScroll"

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}