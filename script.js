//constantes que se utilizaran en todo el encriptador de textos
const encriptadorImagen = document.querySelector(".encriptador__imagen");
const encriptadorSalidaTitulo = document.querySelector(".encriptador__salida__titulo");
const encriptadorSalidaSubtitulo = document.querySelector(".encriptador__salida__subtitulo");
const textoEntrada = document.querySelector(".encriptador__entrada__texto");
const textoSalida = document.getElementById("texto_salida");
const botonSalida = document.getElementById("boton_salida");
let resultado ="";

// Guarda el estado original antes de realizar las modificaciones
const estadoOriginal = {
    encriptadorImagenClass: encriptadorImagen.className,
    encriptadorSalidaTituloClass: encriptadorSalidaTitulo.className,
    encriptadorSalidaSubtituloClass: encriptadorSalidaSubtitulo.className,
    textoSalidaClass: textoSalida.className,
    botonSalidaClass: botonSalida.className,
    botonSalidaText: botonSalida.innerText
};


function encriptar() {
    // Captura texto ingresado
    const texto = textoEntrada.value;
    // Corrobora texto ingresado
    if (comprobarTextoEntrada(texto)) {
        return; // Sale de la función si el texto no es válido
    }
    // condiciones de encriptación
    const encriptacion = {
        "e": "enter",
        "i": "imes",
        "a": "ai",
        "o": "ober",
        "u": "ufat"
    };

    // Convertir texto encriptado
    let textoEncriptado = "";
    
    for (const char of texto) {
        if (encriptacion[char]) {
            textoEncriptado += encriptacion[char];
        } else {
            textoEncriptado += char;
        }
    }

    // Prepara e imprime en pantalla el texto encriptado
    prepararSalida();
    textoSalida.innerHTML = textoEncriptado;
    resultado = textoEncriptado; //facilita el posterior copiado.

    // Limpia textarea
    textoEntrada.value = "";
    textoEntrada.setAttribute("placeholder", "Ingrese el texto aquí");
}


function desencriptar() {
    // Captura texto encriptado
    const texto = textoEntrada.value;

    // Corrobora texto ingresado
    if (comprobarTextoEntrada(texto)) {
        return; // Sale de la función si el texto no es válido
    }

    // condiciones de desencriptación
    const desencriptacion = {
        "enter": "e",
        "imes": "i",
        "ai": "a",
        "ober": "o",
        "ufat": "u"
    };

    // Reemplaza cada secuencia de encriptación por su correspondiente
    let textoDesencriptado = texto;

    for (const [clave, valor] of Object.entries(desencriptacion)) {
        // Reemplaza cada clave por su valor de desencriptacion
        textoDesencriptado = textoDesencriptado.replaceAll(clave, valor);
    }

    // Prepara e imprime en pantalla el texto desencriptado
    prepararSalida();
    textoSalida.innerHTML = textoDesencriptado;
    resultado = textoDesencriptado;

    // Limpiar textarea
    textoEntrada.value = "";
    textoEntrada.setAttribute("placeholder", "Ingrese el texto aquí");
}


// Función para comprobar si el texto está vacío o contiene mayúsculas, acentos o caracteres especiales
function comprobarTextoEntrada(texto) {
    // Elimina espacios en blanco al inicio y al final
    texto = texto.trim();

    // Expresión regular para detectar mayúsculas y carácteres especiales
    const regex = /[A-ZÁÉÍÓÚÜÑáéíóúüñ!@#$%^&*(),.?":{}|<>0123456789]/;

    // Verificar si el texto está vacío o contiene mayúsculas
    if (texto === "" || regex.test(texto)) {
        revertirCambios();//retorna imagen y textos originales
        // Limpiar textarea
        textoEntrada.value = "";
        // Establece un mensaje en el placeholder 
        textoEntrada.setAttribute("placeholder", texto === "" 
            ? "El campo no puede estar vacío." 
            : "Intenta nuevamente sin mayúsculas ni carácteres especiales.");
        return true; // Indica que el texto está vacío o contiene mayúsculas
    }

    // Si el texto está bien, retorna false
    return false;
}

//funcion extra de copiar 
function copiarAlPortapapeles(texto) {
    //api para copiar 
    navigator.clipboard.writeText(texto);
    //modifica el boton como confirmación de la función.
    botonSalida.innerText= "Copiado";
}

//prepara la pantalla para la salida del nuevo texto
function prepararSalida() {
    //oculta la imagen y sus textos
    encriptadorImagen.className = "negativo";
    encriptadorSalidaTitulo.className = "negativo";
    encriptadorSalidaSubtitulo.className = "negativo";
    //da visibilidad al nuevo texto y al boton copiar
    textoSalida.className = "texto_salida";
    botonSalida.className = "boton_salida";
    botonSalida.innerText = "Copiar";
    return;
}

//elimina los cambios y retorna la imagen y sus textos.
function revertirCambios() {
    encriptadorImagen.className = estadoOriginal.encriptadorImagenClass;
    encriptadorSalidaTitulo.className = estadoOriginal.encriptadorSalidaTituloClass;
    encriptadorSalidaSubtitulo.className = estadoOriginal.encriptadorSalidaSubtituloClass;
    textoSalida.className = estadoOriginal.textoSalidaClass;
    botonSalida.className = estadoOriginal.botonSalidaClass;
    botonSalida.innerText = estadoOriginal.botonSalidaText;
    return;
}
