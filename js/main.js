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
const changeQuoteType = document.querySelector('#changeQuoteType')
const twitter = document.getElementById('twitter')
changeQuoteType.addEventListener('click', e => {
    swal("Change Was Saved", "Success to change the type of the quote!", "success");

})


// new Quote button element
const newQuoteBtn = document.querySelector('.newQuote')
class quote {
    constructor(quote, type = 'quotesMotivasiBelajar') {
        this._quote = quote;
        this.quoteText = document.querySelector('.quote');
        this.authorText = document.querySelector('.author')
        this._type = type;

        this._array = [];
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
        console.log(array)
        console.log(this._type)
        if (!this._array.includes(randomIndex)) {
            this._array.push(randomIndex)
            const quote = array[randomIndex].quote;
            const author = array[randomIndex].author;
            twitter.setAttribute('href', `https://twitter.com/intent/tweet?text="${quote}"`)
            this.quoteText.textContent = quote;
            this.authorText.textContent = `- ${author}`;
        } else {
            if (this._array.length == array.length) {
                console.log('berakhir disini!')
                swal("Hmmm Looks like you've reached the end..", "");
            } else {
                this.getQuote()
            }
        };
    }
}
const Quote = new quote(quotes)
Quote.getQuote()
newQuoteBtn.addEventListener('click', () => {
    Quote.array.length == Quote.quote[Quote.type].length ? swal("Looks like you've reached the end..") : animate();

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
            checkDarkMode()
            checkTypeOfQuote()
            if (e.target.checked) {
                b.classList.toggle('active')
            } else {
                b.classList.remove('active')
            }
        }
    })
})

function checkDarkMode() {
    const darkModeBtn = document.getElementById('darkMode')
    if (darkModeBtn.checked) {
        document.body.classList.add('darkMode')
    } else {
        document.body.classList.remove('darkMode')
    }
}

function checkTypeOfQuote() {

    if (changeQuoteType.checked) {
        console.log('DI CEK!')
        Quote.type = 'quotesTentangBullying'
        Quote._array = []
    } else {
        console.log('UNCHECK :(')
        Quote.type = 'quotesMotivasiBelajar'
        Quote._array = []

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