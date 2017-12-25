// Deck, plain JS constructor
function Deck (includeJokers) {    
    /* Begin Constructor */
    setupDeck(includeJokers);
    this.shuffle = shuffleDeck;
    this.shuffleStyle = 'default';
    this.cardsLeft = cardsLeft;
    this.hasJokers = hasJokers;
    this.dealCard = dealCard;
    /* End constructor */


    // private attributes
    var deck; // array of 52-54 cards (54 for including jokers)
    var cardsUsed; // tracks # of cards dealt
    var cardCount;

    // helper functions
    function cardsLeft () { return deck.length - cardsUsed }
    function hasJokers () { return (deck.length == 54); }
    function dealCard () { 
        if (cardsUsed == deck.length ) { console.log('no cards left in deck'); }
        cardsUsed++;
        return deck[cardsUsed - 1];
    }
    function setupDeck(includeJokers) {
        if (includeJokers){
            deck =  new Card(54);
            deck[52]= new Card(1, Card.JOKER);
            deck[53]= new Card(2, Card.JOKER);
        }
        else { 
            deck =  new Card(52); }
        cardCount = 0;
        for (var suit = 0; suit <= 3; suit++ ) {
            for (var value = 1; value <= 13; value++ ) {
                deck[cardCount] = new Card(value,suit);
                cardCount++;
            }
        }
        cardsUserd = 0;
    }
    
    /* Begin private Shuffler */
    var Shuffler = { 'default' : defaultShuffle }; // add shuffleStyle keys with no values here
	function shuffleDeck(style){
        // first verify a style was provided and is valid
        style = checkStyle(style);

        // then shuffle deck
        Shuffler[style](); // need to enter hand here?

        // finally override default instance shuffle style
        this.shuffleStyle = style;

        // helper functions for shuffleDeck
        function checkStyle (shuffleStyle){
            if ((!shuffleStyle) ||
                (typeOf(shuffleStyle) != 'string') ||
                (!(shuffleStyle in this.Shuffler)))
                { return 'default'; }
        
            return shuffleStyle;
        }
    }
    function defaultShuffle (){ // TODO: Fix shuffle
        for (var i = deck.length-1; i > 0; i--) {
            var rand = (Math.random()*(i+1));
            var temp = deck[i];
            deck[i] = deck[rand];
            deck[rand] = temp;
        }
        cardsUsed = 0;
    }
    /* End Shuffler */
}

/* Card Class */
function Card(amount) { return new Array(amount); }

/* Hand Class */
function Hand() {
    this.clear = clear;
    this.addCard = addCard;
    this.removeCard = removeCard;
    this.getCardCount = getCardCount;
    this.getCard = getCard;
    this.sortBySuit = sortBySuit;
    this.sortByValue = sortByValue;

    function clear(){}
    function removeCard(card, handPosition){}
    function addCard(card, handPosition){}
    function getCard(handPosition){}
    function sortBySuit(){}
    function sortByValue(){}
}
