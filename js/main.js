import {
    quotes
} from './quotes.js';

console.log(window.innerWidth)
// settings button, this button if we click it will show settings popup
const settingsBtn = document.querySelector('.settings-btn')
// toggle button (on/off) on settings popup
const toggle = document.querySelector('.toggle')
//container is the parent of card and footer
const container = document.querySelector('.container');

// the parent of modal (background for modal)
const modal = document.querySelector('.modal')
// close button for modal
const closeModal = document.querySelector('.close-modal')
// modal card
const modalCard = modal.querySelector('.modalCard')

const changeModeCheckbox = document.querySelectorAll('.change')
const checkbox = document.querySelectorAll('.toggle')
const changeQuoteType = document.querySelector('#changeQuoteType');

// for bg
const CONTAINER = document.querySelector('.container')

const twitter = document.getElementById('twitter')
changeQuoteType.addEventListener('click', e => {
    swal("Change Was Saved", "Success to change the type of the quote!", "success");
});
const darkModeBtn = document.getElementById('darkMode')
console.log(darkModeBtn.checked ? true : false)


// new Quote button element
const newQuoteBtn = document.querySelector('.newQuote')
class quote {
    constructor(quote, type) {
        this._quote = quote;
        this.quoteText = document.querySelector('.quote');
        this.authorText = document.querySelector('.author')
        this._type = type;

        this._x = 0;
    }
    get quote() {
        return this._quote;
    }
    get array() {
        return this._array;
    }
    get type() {
        return this._type;
    }
    set type(newType) {
        this._type = newType;
    }
    getQuote() {
        const array = this._quote[this._type];
        const randomIndex = Math.floor(Math.random() * array.length);
        if (this._x != array.length) {
            this.quoteText.textContent = array[this._x]
            this._x++;
            console.log(this._x)
        }
    }
}
const Quote = new quote(quotes)
checkTypeOfQuote()
Quote.getQuote()
newQuoteBtn.addEventListener('click', () => {
    Quote._x != Quote._quote[Quote._type].length ?
        animate() : swal("Hmmm Looks like you've reached the end..", "");;
})

function animate() {
    const quote = document.querySelector('.quote')
    const author = document.querySelector('.author')


    quote.classList.remove('animate')
    author.classList.remove('animate')

    quote.classList.add('animatee')
    author.classList.add('animatee')

    setTimeout(() => {
        Quote.getQuote()

        quote.classList.add('animate')
        author.classList.add('animate')

        quote.classList.remove('animatee')
        author.classList.remove('animatee')
    }, 1001);
}
checkbox.forEach(e => {
    if (e.checked) {
        checkDarkMode()
        checkTypeOfQuote()
        e.nextElementSibling.classList.add('active')
    } else {
        e.nextElementSibling.classList.remove('active')
    }
})

changeModeCheckbox.forEach(e => {
    e.addEventListener('click', (e) => {
        if (e.target.className == 'toggle') {
            console.log(e.target.checked)
            console.log(e.target.value)
            const b = e.target.nextElementSibling;
            checkDarkMode();
            checkTypeOfQuote();
            checkDarkModeLocalStorage()
            if (e.target.checked) {
                b.classList.add('active')
            } else {
                b.classList.remove('active');
            }
        }
    })
})

function checkDarkMode() {
    if (darkModeBtn.checked) {
        localStorage.setItem('Mode', 'Dark');
        document.body.classList.add('darkMode');
    } else {
        localStorage.setItem('Mode', 'Light');
        document.body.classList.remove('darkMode');
    }
}

function checkDarkModeLocalStorage() {
    const dmT = document.querySelector('#darkModeToggle')
    if (localStorage.getItem('Mode') == 'Dark') {
        document.body.classList.add('darkMode');
        dmT.classList.add('active');
    } else if (localStorage.getItem('Mode') == 'Light') {
        document.body.classList.remove('darkMode')
        dmT.classList.remove('active');
    }
}
checkDarkModeLocalStorage();

function checkTypeOfQuote() {
    if (changeQuoteType.checked) {
        console.log('Checked !')
        Quote.type = 'quotesTentangBullying'
        Quote._x = 0;
        checkDarkModeLocalStorage();

    } else {
        console.log('UNCHECK :(');
        Quote.type = 'quotesMotivasiBelajar';
        Quote._x = 0;
        checkDarkModeLocalStorage();
    }
}

settingsBtn.addEventListener('click', () => {
    showSettingsPopup()
    closeSettingsPopup()
})

function showSettingsPopup() {
    container.classList.toggle('popup')
    modalCard.classList.remove('remove')
    modal.classList.toggle('add')
    modalCard.classList.toggle('animateA')
    setTimeout(() => {
        modalCard.classList.toggle('animateA')
    }, 3100);
    document.body.classList.toggle('popup');
}

function closeSettingsPopup(params) {
    closeModal.addEventListener('click', () => {
        modalCard.classList.add('remove')
        setTimeout(() => {
            container.classList.remove('popup')
            modal.classList.remove('add')
            document.body.classList.remove('popup')
        }, 3050);
    })
}