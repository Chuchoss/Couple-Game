(() => {

    function createList() {
        let newList = document.createElement('ul');
        newList.classList.add('grid')
        return newList;
    }
    
    function createElement(backgroundClass = 'kresti') {
        let newElement = document.createElement('li');
        newElement.classList.add('card')
        let frontSide = document.createElement('div');
        frontSide.classList.add('front')
        let backSide = document.createElement('div');
        backSide.classList.add('back', backgroundClass)
        newElement.append(frontSide)
        newElement.append(backSide)

        return {
            newElement, 
            frontSide,
            backSide,
        };
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createListCards (cardsArray = ['kresti', 'buby', 'chervi', 'peaks', 'rogue', 'knight', 'money', 'joker'] ) {
        let myCardsArray = cardsArray.concat(cardsArray);
        shuffle(myCardsArray)
        let listCards = createList();
        document.body.append(listCards)
        let cardsCount = 16;
        for (let i = 0; i < cardsCount; i++) {
            let createCard = createElement(myCardsArray[i]);
            listCards.append(createCard.newElement);
        }
        return myCardsArray;
    }
    
    createListCards();
    function createApp () {
        const cards = document.querySelectorAll('.card');
        const CARDS_LIST = document.querySelector('.grid');
        const CARDS_PAIRS = 8;
        let activeCards = 0;
        let points = 0;
        let comparisonArray = [];
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                if (activeCards < 2) {
                    comparisonArray.push(card.children[1])
                    card.classList.toggle('active')
                    activeCards++;
                  }
                if ((activeCards >= 2) && (comparisonArray[0].className !== comparisonArray[1].className)) {
                    cards.forEach((card) => {
                        setTimeout(() => {
                            card.classList.remove('active')
                            comparisonArray = [];
                            activeCards = 0;
                        }, 800) 
                    })
                }
                if ((activeCards >= 2) && (comparisonArray[0].className == comparisonArray[1].className)) {
                        setTimeout(() => {
                            if (comparisonArray[0] != comparisonArray[1]) {
                            comparisonArray[0].parentNode.classList.add('hidden')
                            comparisonArray[1].parentNode.classList.add('hidden')
                            points++
                            if (points >= CARDS_PAIRS) {
                                let button = document.createElement('button');
                                button.classList.add('new-game-btn');
                                CARDS_LIST.remove()
                                button.textContent = 'Начать новую игру'
                                document.body.classList.add('bgDark');
                                document.body.append(button)
            
                                    button.addEventListener('click', () => {
                                        document.body.classList.remove('bgDark');
                                        document.querySelector('.new-game-btn').remove();
                                        createListCards();
                                        createApp();
                                }) 
                            }
                            }  
                            comparisonArray = [];    
                            activeCards = 0;
                        }, 800)
                        
                  }    
            })
        })
    }

    document.addEventListener('DOMContentLoaded', () => {
        createApp()
    });
})();