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


//___________________________________________________________________________________
// Solución antigua
//___________________________________________________________________________________

//Generar aleatorio
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Cambiar(carta01, carta02)
{
    let pos1 = carta01 - 1;
    let pos2 = carta02 - 1;
    
    [cartas[pos1], cartas[pos2]] = [cartas[pos2], cartas[pos1]];
    alert("Cartas cambiadas: " + cartas.join(", "));
    alert("Cartas cambiadas: " + cartas[0] + cartas[1] + cartas[2] + cartas[3] + cartas[4] + cartas[5] + cartas[6] + cartas[7]);
 }

function Comparar()
{
    console.log("hola");
    let carta01 = 0;
    let carta02 = 0;
    carta01 = parseInt(prompt("Ingrese la posición de la primera carta a comparar (1-8):"));
    carta02 = parseInt(prompt("Ingrese la posición de la segunda carta a comparar (1-8):"));

    if (carta01 >= 1 && carta01 <= 8 && carta02 >= 1 && carta02 <= 8) {
       if (cartas[carta01 -1] > cartas[carta02 -1]) {
            alert("La carta en la posición " + carta01 + " es mayor que la carta en la posición " + carta02);
        } else if (cartas[carta01 -1] < cartas[carta02 -1]) {
            alert("La carta en la posición " + carta01 + " es menor que la carta en la posición " + carta02);
        }
        var result = confirm("¿Desea cambiar las cartas?");
        if (result) {
            Cambiar(carta01, carta02);
        }
    } else {
        alert("Posición inválida. Ingrese un número entre 1 y 8.");
    }
}

