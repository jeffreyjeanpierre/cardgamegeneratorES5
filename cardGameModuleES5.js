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
function Card(configuration) {
    // face cards and suits
    const KING = 13;
    const QUEEN = 12;
    const JACK = 11;
    const ACE = 1;
    const JOKER = 4;
    const CLUBS = 3;
    const DIAMONDS = 2;
    const HEARTS = 1;
    const SPADES = 0;

    const suit;
    const value;

    this.KING = KING;
    this.QUEEN = QUEEN;
    this.JACK = JACK;
    this.ACE = ACE;
    this.JOKER = JOKER;
    this.CLUBS = CLUBS;
    this.DIAMONDS = DIAMONDS;
    this.HEART = HEART;
    this.SPADES = SPADES;
    this.getSuit = getSuit;
    this.getValue = getValue;
    this.getSuitAsString = getSuitAsString;
    this.getValueAsString = getValueAsString;
    this.toString = toString;
    setupCards(configuration);

    // helper functions
    function getSuit(){ return suit; }
    function getValue(){ return value; }
    function toString() { 
        if (suit == JOKER) {
            if (value == 1) {
                return "Joker";
            }
            else { 
                return getValueAsString() + " of " + getSuitAsString();
            }
        }
    }
    function getSuitAsString(){ 
        switch(suit){
            case SPADES: return "Spades";
            case DIAMONDS: return "Diamonds";
            case HEARTS: return "Hearts";
            case CLUBS: return "Clubs";
            default: return "Joker";
        }
    }
    function getValueAsString() {
        if (suit == JOKER){
            return "" + value; // necessary?
        }
        else {
            switch(value) {
                case 1: return "Ace";
                case 2: return "2";
                case 3: return "3";
                case 4: return "4";
                case 5: return "5";
                case 6: return "6";
                case 7: return "7";
                case 8: return "8";
                case 9: return "9";
                case 10: return "10";
                case 11: return "11";
                case 12: return "12";
                default: return "King";
            }
        }
    }
    function setupCards(config) {
        if (config) {
            if (config.suit != SPADES && config.suit != HEARTS && config.suit != DIAMONDS && 
                config.suit != CLUBS && config.suit != JOKER)
                console.log("Illegal playing card suit");
            if (config.suit != JOKER && (config.suit < 1 || config.suit > 13))
                console.log("Illegal playing card value");
            value = config.value;
            suit = config.suit;
        }
        else {
            suit = JOKER;
            value = 1;
        }
    }

}

/* Hand Class */
function Hand() {
    this.clear = clear;
    this.addCard = addCard;
    this.removeCard = removeCard;
    this.getCardCount = getCardCount;
    this.getCard = getCard;
    this.sortBySuit = sortBySuit;
    this.sortByValue = sortByValue;
    setupHand();

    // Private attributes
    var hand;
    var maxHandLength;


    // Private functionality
    function clear(){ hand = []; }
    function removeCardByPosition(handPosition){
        var position = card.position;
        if(!position) { console.log('can not remove null card to a hand'); return; }
        hand.splice(position, 1);
    }
    function removeCardByCard(card){
        var position = card.position;
        if(!position || position < 0 || position > hand.length) { console.log('can not remove an invalid card from a hand'); return; }
        hand.splice(position, 1);
    }
    function addCardByPosition(handPosition){
        var newCard = {
            position: handPosition
            // add other keys for new card object here
        };
        
        if (!position || position < 0 || position > hand.length) { console.log('can not add null card to a hand'); return; }
         // create fn to get new card which reads length of hand
        // if (maxHandLength && (hand.length + 1) <= maxHandLength){

        // }
        hand[hand.length] = newCard;
    }
    function addCardByCard(card){ // TODO: finish addCard implementation
        var newCard = {
            position: card.position
            // add other keys for new card object here
        };
        
        if (!position || position < 0 || position > hand.length) { console.log('can not add null card to a hand'); return; }
         // create fn to get new card which reads length of hand
        // if (maxHandLength && (hand.length + 1) <= maxHandLength){

        // }
        hand[hand.length] = newCard;
        
    }
    function getCardByPosition(handPosition){
        var position = handPosition;
        if (!position || position < 0 || position > hand.length) { console.log('can not get invalid card from a hand'); return; }
        return hand[position];
    }
    function getCardByCard(card){
        var position = card.position;
        if (!position || position < 0 || position > hand.length) { console.log('can not get invalid card from a hand'); return; }
        return hand[position];
    }
    function sortBySuit(){
        var newHand = [];
        while (hand.length > 0) {
            var pos = 0;  // Position of minimal card.
            var card = hand[0];  // Minimal card.
            for (var i = 1; i < hand.length; i++) {
                var card1 = hand[i];
                if ( card1.getSuit() < card.getSuit() ||
                        (card1.getSuit() == card.getSuit() && card1.getValue() < card.getValue()) ) {
                    pos = i;
                    card = card1;
                }
            }
            hand.splice(pos, 1);
            newHand.push(card);
        }
        hand = newHand;
    }
    function sortByValue(){
        var newHand = [];
        while (hand.length > 0) {
            var pos = 0;  // Position of minimal card.
            var card = hand[0];  // Minimal card.
            for (var i = 1; i < hand.length; i++) {
                var card1 = hand[i];
                if ( card1.getValue() < card.getValue() ||
                        (card1.getValue() == card.getValue() && card1.getSuit() < card.getSuit()) ) {
                    pos = i;
                    card = card1;
                }
            }
            hand.splice(pos, 1);
            newHand.push(c);
        }
        hand = newHand;
    }
    function setupHand(){ hand = []; }
    function getCardCount() {
        return hand.length-1;
    }
}
