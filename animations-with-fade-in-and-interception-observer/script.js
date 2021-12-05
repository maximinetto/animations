const imagen1 = document.getElementById('imagen1');
const imagen2 = document.getElementById('imagen2');
const imagen3 = document.getElementById('imagen3');
const imagen4 = document.getElementById('imagen4');
const imagen5 = document.getElementById('imagen5');
const imagen6 = document.getElementById('imagen6');

const lazyLoad = () => {
    // miramos si tiene soporte a lazy loading nativo
    const hasNativeLazyLoadSupport = 'loading' in HTMLImageElement.prototype

    // si tiene soporte nativo de carga diferida...
    if (hasNativeLazyLoadSupport) {
        // recuperamos todas las imágenes e iframes con el atributo
        const lazyEls = document.querySelectorAll("[loading=lazy]")
        // pasamos el data-src a src y dejamos que el navegador haga el resto
        lazyEls.forEach(lazyEl => {
            const src = lazyEl.getAttribute("data-src")
            lazyEl.setAttribute("src", src)
        })
    } else {
        // Cargamos dinámicamente una biblioteca externa para 
        // hacer la carga diferida
        const script = document.createElement("script")
        script.async = true
        script.src =
            "https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.4.0/dist/lazyload.min.js"

        // esta configuración es necesaria por la librería vanilla-lazyload
        // le indicamos los elementos a los que queremos hacer la carga diferida
        window.lazyLoadOptions = {
            elements_selector: "[loading=lazy]"
        }
        // añadimos el script par la carga asíncrona de la biblioteca
        document.body.appendChild(script)
    }

}

lazyLoad();

const animateImages = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}

const observer = new IntersectionObserver(animateImages, { root: null, rootMargin: '100px 0px 0px 0px', threshold: 0.5 });

observer.observe(imagen1);
observer.observe(imagen2);
observer.observe(imagen3);
observer.observe(imagen4);
observer.observe(imagen5);
observer.observe(imagen6);