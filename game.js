'use strict';

const CARD_COUNT = 8;
const cardsElement = document.querySelector('#cards');
const compareButton = document.querySelector('#compareButton');
const swapButton = document.querySelector('#swapButton');
const finishTurnButton = document.querySelector('#finishTurnButton');
const newGameButton = document.querySelector('#newGameButton');
const statusElement = document.querySelector('#status');
const comparisonCountElement = document.querySelector('#comparisonCount');
const swapCountElement = document.querySelector('#swapCount');

let cards = [];
let selectedCards = [];
let comparisons = 0;
let swaps = 0;
let comparing = false;
let finished = false;

compareButton.addEventListener('click', compareSelectedCards);
swapButton.addEventListener('click', swapComparedCards);
finishTurnButton.addEventListener('click', hideComparedCards);
newGameButton.addEventListener('click', startGame);

startGame();

function startGame() {
    cards = shuffledNumbers();
    selectedCards = [];
    comparisons = 0;
    swaps = 0;
    comparing = false;
    finished = false;
    comparisonCountElement.textContent = '0';
    swapCountElement.textContent = '0';
    statusElement.textContent = 'Selecciona dos cartas para empezar.';
    renderCards();
}

function shuffledNumbers() {
    const numbers = Array.from({ length: CARD_COUNT }, (_, index) => index + 1);

    for (let index = numbers.length - 1; index > 0; index -= 1) {
        const otherIndex = Math.floor(Math.random() * (index + 1));
        [numbers[index], numbers[otherIndex]] = [numbers[otherIndex], numbers[index]];
    }

    return numbers;
}

function isSorted(numbers) {
    return numbers.every((number, index) => index === 0 || numbers[index - 1] <= number);
}

function renderCards() {
    cardsElement.replaceChildren();

    cards.forEach((value, index) => {
        const slot = document.createElement('div');
        slot.className = 'card-slot';

        const card = document.createElement('button');
        const revealed = comparing && selectedCards.includes(index);
        card.className = 'card';
        card.type = 'button';
        card.textContent = revealed ? value : '?';
        card.setAttribute(
            'aria-label',
            revealed ? `Posición ${index + 1}, carta ${value}` : `Posición ${index + 1}, carta boca abajo`
        );
        card.setAttribute('aria-pressed', selectedCards.includes(index));
        card.disabled = comparing || finished;

        if (selectedCards.includes(index)) {
            card.classList.add('selected');
        }

        if (revealed) {
            card.classList.add('revealed');
        }

        card.addEventListener('click', () => selectCard(index));

        const position = document.createElement('span');
        position.className = 'position';
        position.textContent = `Pos. ${index + 1}`;
        slot.append(card, position);
        cardsElement.append(slot);
    });

    compareButton.disabled = selectedCards.length !== 2 || comparing || finished;
    swapButton.hidden = !comparing;
    finishTurnButton.hidden = !comparing;
}

function selectCard(index) {
    if (comparing || finished) {
        return;
    }

    if (selectedCards.includes(index)) {
        selectedCards = selectedCards.filter((selectedIndex) => selectedIndex !== index);
    } else if (selectedCards.length < 2) {
        selectedCards.push(index);
    } else {
        selectedCards = [index];
    }

    statusElement.textContent = selectedCards.length === 2
        ? 'Ya tienes dos cartas seleccionadas. Pulsa «Comparar las dos».'
        : 'Selecciona otra carta para completar la pareja.';
    renderCards();
}

function compareSelectedCards() {
    if (selectedCards.length !== 2 || comparing || finished) {
        return;
    }

    comparisons += 1;
    comparing = true;
    comparisonCountElement.textContent = comparisons;

    const [firstIndex, secondIndex] = selectedCards;
    const firstValue = cards[firstIndex];
    const secondValue = cards[secondIndex];
    const relation = firstValue < secondValue
        ? `${firstValue} es menor que ${secondValue}.`
        : `${firstValue} es mayor que ${secondValue}.`;

    statusElement.textContent = `Comparación ${comparisons}: posición ${firstIndex + 1} tiene ${firstValue} y posición ${secondIndex + 1} tiene ${secondValue}. ${relation} Puedes intercambiarlas o esconderlas.`;
    renderCards();
}

function hideComparedCards() {
    if (!comparing) {
        return;
    }

    comparing = false;
    selectedCards = [];
    statusElement.textContent = 'Cartas ocultas. Selecciona dos para la siguiente comparación.';
    renderCards();
}

function swapComparedCards() {
    if (!comparing || selectedCards.length !== 2) {
        return;
    }

    const [firstIndex, secondIndex] = selectedCards;
    [cards[firstIndex], cards[secondIndex]] = [cards[secondIndex], cards[firstIndex]];
    swaps += 1;
    swapCountElement.textContent = swaps;
    comparing = false;
    selectedCards = [];

    if (isSorted(cards)) {
        finished = true;
        statusElement.textContent = `¡Ordenadas! Lo conseguiste con ${comparisons} comparaciones y ${swaps} intercambios.`;
    } else {
        statusElement.textContent = 'Intercambio hecho. Las cartas vuelven a quedar boca abajo.';
    }

    renderCards();
}



