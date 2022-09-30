function initAccordion() {
    const acc = document.getElementsByClassName("accordion-js");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function (event) {
            console.log(event.target.tagName);
            if (event.target.tagName !== "INPUT" || event.target.tagName !== "LABEL") {
                this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        });
    }
}

function switchView() {
    const switchLabelElements = document.querySelectorAll('.switch');

    switchLabelElements.forEach(switchLabel => {
        switchLabel.addEventListener('click', (event) => {
            const currentCategory = event.target.closest('[data-category]').dataset.category;
            const switchElement = event.target.previousElementSibling;
            const soldCards = document.querySelectorAll(`[data-category="${currentCategory}"] [data-sold="true"]`);

            soldCards.forEach(soldCard => {
                !switchElement.checked
                    ? soldCard.style.display = 'none'
                    : soldCard.style.display = 'flex';
            });
        });
    })
}

function makeCardSold() {
    const soldButtons = document.querySelectorAll('.main-section__panel__cards__item__button');

    soldButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (!event.target.closest('[data-sold]')) {
                const currentCard = event.target.closest('.main-section__panel__cards__item');
                currentCard.dataset.sold = 'true'; //data-sold

                countCards();
            }
        })
    })
}

function countCards() {
    const categoryArr = document.querySelectorAll('[data-category]');

    categoryArr.forEach(category => {
        const currCategory = category.dataset.category;
        const cardsCount = document.querySelectorAll(`[data-category="${currCategory}"] .main-section__panel__cards article:not([data-sold])`).length;
        document.querySelector(`[data-category=${currCategory}] .count-cards`).innerHTML = cardsCount;
    });
}

function activeForm() {
    const buttonArr = document.querySelectorAll('.main-section__panel__cards__item__button');
    const popupEl = document.querySelector('.pop-up__overlay');
    const popupBlock = document.querySelector('.pop-up');
    const popupClose = document.querySelector('.pop-up__close');
    const popupThanks = document.querySelector('.pop-up__tnx');
    const btnClose = document.querySelector('.pop-up__form__btn--tnx');
    const formEl = document.querySelector('.pop-up__form');

    buttonArr.forEach(button => {
        button.addEventListener('click', (event) => {
            if (!event.target.closest('[data-sold]')) {
                popupBlock.style.display = 'block';
                popupThanks.style.display = 'none';
                popupEl.classList.add('active');
            }
        })
    })

    popupEl.addEventListener('click', (event) => {
        if (event.target === popupClose || event.target === btnClose) {
            event.preventDefault();
            popupEl.classList.remove('active');
        }
    });

    formEl.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('SEND');
        popupBlock.style.display = 'none';
        popupThanks.style.display = 'block';
        makeCardSold();
        formEl.reset();
    });
}

initAccordion();
switchView();
activeForm();
countCards();