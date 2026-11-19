'use strict';

// Crear el array original del 1 al 8
const original = [1, 2, 3, 4, 5, 6, 7, 8];

function Juego()
{
    let arrayDesordenado = desordenarArray();
    let resultado = ordenarYContar(arrayDesordenado);

    // Mostrar resultados en consola
    console.log("Array desordenado:", arrayDesordenado);
    console.log("Array reordenado: ", resultado.reordenado);
    console.log("Iteraciones totales:", resultado.iteraciones);
}

// Función para desordenar el array de forma aleatoria
function desordenarArray() {
    let desordenado = original.slice();
    for (let i = desordenado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [desordenado[i], desordenado[j]] = [desordenado[j], desordenado[i]];
    }
    return desordenado;
}

// Función para reordenar en otro array y contar las iteraciones
function ordenarYContar(arrayDesordenado) {
    // Copiamos el array para no modificar el desordenado original
    let reordenado = arrayDesordenado.slice();
    let iteraciones = 0;
    let cambiado = true;

    // Bucle para ordenar los elementos
    while (cambiado) {
        cambiado = false;
        for (let i = 0; i < reordenado.length - 1; i++) {
            iteraciones++; // Contamos cada comprobación/iteración del bucle
            
            if (reordenado[i] > reordenado[i + 1]) {
                // Intercambiar elementos si están en el orden incorrecto
                let temp = reordenado[i];
                reordenado[i] = reordenado[i + 1];
                reordenado[i + 1] = temp;
                cambiado = true;
            }
        }
    }

    return {
        reordenado,
        iteraciones
    };
}

