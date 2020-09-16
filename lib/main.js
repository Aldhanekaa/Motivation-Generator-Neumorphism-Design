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
var twitter = document.getElementById('twitter');
changeQuoteType.addEventListener('click', function (e) {
    swal("Change Was Saved", "Success to change the type of the quote!", "success");
});

// new Quote button element
var newQuoteBtn = document.querySelector('.newQuote');

var quote = function () {
    function quote(_quote) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'quotesMotivasiBelajar';

        _classCallCheck(this, quote);

        this._quote = _quote;
        this.quoteText = document.querySelector('.quote');
        this.authorText = document.querySelector('.author');
        this._type = type;

        this._array = [];
    }

    _createClass(quote, [{
        key: 'getQuote',
        value: function getQuote() {
            var array = this._quote[this._type];
            var randomIndex = Math.floor(Math.random() * array.length);
            console.log(array);
            console.log(this._type);
            if (!this._array.includes(randomIndex)) {
                this._array.push(randomIndex);
                var _quote2 = array[randomIndex].quote;
                var author = array[randomIndex].author;
                twitter.setAttribute('href', 'https://twitter.com/intent/tweet?text="' + _quote2 + '"');
                this.quoteText.textContent = _quote2;
                this.authorText.textContent = '- ' + author;
            } else {
                if (this._array.length == array.length) {
                    console.log('berakhir disini!');
                    swal("Hmmm Looks like you've reached the end..", "");
                } else {
                    this.getQuote();
                }
            };
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
Quote.getQuote();
newQuoteBtn.addEventListener('click', function () {
    Quote.array.length == Quote.quote[Quote.type].length ? swal("Looks like you've reached the end..") : animate();
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
        console.log('DI CEK!');
        Quote.type = 'quotesTentangBullying';
        Quote._array = [];
    } else {
        console.log('UNCHECK :(');
        Quote.type = 'quotesMotivasiBelajar';
        Quote._array = [];
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