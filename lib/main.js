'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quotes = require('./quotes.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log(window.innerWidth);
// settings button, this button if we click it will show settings popup
var settingsBtn = document.querySelector('.settings-btn');
// toggle button (on/off) on settings popup
var toggle = document.querySelector('.toggle');
//container is the parent of card and footer
var container = document.querySelector('.container');

// the parent of modal (background for modal)
var modal = document.querySelector('.modal');
// close button for modal
var closeModal = document.querySelector('.close-modal');
// modal card
var modalCard = modal.querySelector('.modalCard');

var changeModeCheckbox = document.querySelectorAll('.change');
var checkbox = document.querySelectorAll('.toggle');
var changeQuoteType = document.querySelector('#changeQuoteType');

// for bg
var CONTAINER = document.querySelector('.container');

var twitter = document.getElementById('twitter');
changeQuoteType.addEventListener('click', function (e) {
    swal("Change Was Saved", "Success to change the type of the quote!", "success");
});

// new Quote button element
var newQuoteBtn = document.querySelector('.newQuote');

var quote = function () {
    function quote(_quote, type) {
        _classCallCheck(this, quote);

        this._quote = _quote;
        this.quoteText = document.querySelector('.quote');
        this.authorText = document.querySelector('.author');
        this._type = type;

        this._x = 0;
    }

    _createClass(quote, [{
        key: 'getQuote',
        value: function getQuote() {
            var array = this._quote[this._type];
            var randomIndex = Math.floor(Math.random() * array.length);
            if (this._x != array.length) {
                this.quoteText.textContent = array[this._x];
                this._x++;
                console.log(this._x);
            }
        }
    }, {
        key: 'quote',
        get: function get() {
            return this._quote;
        }
    }, {
        key: 'array',
        get: function get() {
            return this._array;
        }
    }, {
        key: 'type',
        get: function get() {
            return this._type;
        },
        set: function set(newType) {
            this._type = newType;
        }
    }]);

    return quote;
}();

var Quote = new quote(_quotes.quotes);
checkTypeOfQuote();
Quote.getQuote();
newQuoteBtn.addEventListener('click', function () {
    Quote._x != Quote._quote[Quote._type].length ? animate() : swal("Hmmm Looks like you've reached the end..", "");;
});

function animate() {
    var quote = document.querySelector('.quote');
    var author = document.querySelector('.author');

    quote.classList.remove('animate');
    author.classList.remove('animate');

    quote.classList.add('animatee');
    author.classList.add('animatee');

    setTimeout(function () {
        Quote.getQuote();

        quote.classList.add('animate');
        author.classList.add('animate');

        quote.classList.remove('animatee');
        author.classList.remove('animatee');
    }, 1001);
}
checkbox.forEach(function (e) {
    if (e.checked) {
        checkDarkMode();
        checkTypeOfQuote();
        e.nextElementSibling.classList.add('active');
    } else {
        e.nextElementSibling.classList.remove('active');
    }
});

changeModeCheckbox.forEach(function (e) {
    e.addEventListener('click', function (e) {
        if (e.target.className == 'toggle') {
            console.log(e.target.checked);
            console.log(e.target.value);
            var b = e.target.nextElementSibling;
            checkDarkMode();
            checkTypeOfQuote();
            if (e.target.checked) {
                b.classList.toggle('active');
            } else {
                b.classList.remove('active');
            }
        }
    });
});

function checkDarkMode() {
    var darkModeBtn = document.getElementById('darkMode');
    if (darkModeBtn.checked) {
        document.body.classList.add('darkMode');
    } else {
        document.body.classList.remove('darkMode');
    }
}

function checkTypeOfQuote() {
    if (changeQuoteType.checked) {
        console.log('Checked !');
        Quote.type = 'quotesTentangBullying';
        Quote._x = 0;
        container.classList.add('bullying');
    } else {
        console.log('UNCHECK :(');
        Quote.type = 'quotesMotivasiBelajar';
        Quote._x = 0;
        container.classList.remove('bullying');
    }
}

settingsBtn.addEventListener('click', function () {
    showSettingsPopup();
    closeSettingsPopup();
});

function showSettingsPopup() {
    container.classList.toggle('popup');
    modalCard.classList.remove('remove');
    modal.classList.toggle('add');
    modalCard.classList.toggle('animateA');
    setTimeout(function () {
        modalCard.classList.toggle('animateA');
    }, 3100);
    document.body.classList.toggle('popup');
}

function closeSettingsPopup(params) {
    closeModal.addEventListener('click', function () {
        modalCard.classList.add('remove');
        setTimeout(function () {
            container.classList.remove('popup');
            modal.classList.remove('add');
            document.body.classList.remove('popup');
        }, 3050);
    });
}