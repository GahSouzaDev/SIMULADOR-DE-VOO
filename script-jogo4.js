document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'fries', img: 'images/memoria1.gif' },
        { name: 'cheeseburger', img: 'images/memoria2.gif' },
        { name: 'ice-cream', img: 'images/memoria3.gif' },
        { name: 'pizza', img: 'images/memoria4.gif' },
        { name: 'milkshake', img: 'images/memoria5.gif' },
        { name: 'hotdog', img: 'images/memoria6.gif' },
        { name: 'fries', img: 'images/memoria1.gif' },
        { name: 'cheeseburger', img: 'images/memoria2.gif' },
        { name: 'ice-cream', img: 'images/memoria3.gif' },
        { name: 'pizza', img: 'images/memoria4.gif' },
        { name: 'milkshake', img: 'images/memoria5.gif' },
        { name: 'hotdog', img: 'images/memoria6.gif' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.querySelector('#game-board');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        cardArray.forEach((item, index) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('data-id', index);
            card.addEventListener('click', flipCard);
            const cardImage = document.createElement('img');
            cardImage.setAttribute('src', item.img);
            card.appendChild(cardImage);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.querySelector('img').style.display = 'block';
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card img');
        const [optionOneId, optionTwoId] = cardsChosenId;
        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].style.display = 'none';
            cards[optionTwoId].style.display = 'none';
        }
        cardsChosen = [];
        cardsChosenId = [];
        if (cardsWon.length === cardArray.length / 2) {
            window.location.href='final-jogo4.html'
        }
    }

    createBoard();
});
