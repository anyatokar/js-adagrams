const Adagrams = {
  drawLetters() {
    const letterQuan = {A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1};
    
    // create a pool of letters to draw from
    let letterPool = [];
    for (let letter in letterQuan) {
      for (let i = 0; i < letterQuan[letter]; i++) {
        letterPool.push(letter);
      };
    };

    // shuffle letter pool, source: https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
    // j is a random integer 0 ≤ j ≤ i
    for (let i = letterPool.length-1; i > 0; i--) {
      let j = Math.floor(Math.random() * i); 
      let temp = letterPool[i];
      letterPool[i] = letterPool[j];
      letterPool[j] = temp;
    };

    // draw 10 letters
    const lettersInHand = letterPool.slice(0, 10);
    return lettersInHand;
  },

  usesAvailableLetters(input, lettersInHand) {
    let handHashMap = {};

    for (let i = 0; i < lettersInHand.length; i++) {
      if (handHashMap[lettersInHand[i]]) {
        handHashMap[lettersInHand[i]] += 1;
      } else {
        handHashMap[lettersInHand[i]] = 1;
      };
    };

    for (let letter of input) {
      if (handHashMap[letter]) {
        handHashMap[letter] -= 1;
      } else {
        console.log(`Insufficient quantity of letter ${letter} in hand.`);
        return false;
      };
    };
    return true;
  },

  // scoreWord
  scoreWord(word) {
    const letterScore = {A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10};

    // establish score and add 8 depending on length
    const add8 = [7, 8, 9, 10];
    let score = 0;
    
    if (add8.includes(word.length)) {
      score += 8;
    };
    
    // calculate score
    for (let letter of word) {
      score += letterScore[letter.toUpperCase()];
    };

    return score;
  },

  highestScoreFrom(words) {
    let winner = {
      word: '',
      score: 0,
    };

    for (let word of words) {
      if (this.scoreWord(word) > winner['score']) {
        winner['word'] = word;
        winner['score'] = this.scoreWord(word);
      } else if (this.scoreWord(word) === winner['score'] && winner['word'].length !== 10) {
        if (word.length === 10) {
          winner['word'] = word;
          winner['score'] = this.scoreWord(word);
        } else if (winner['word'].length > word.length) {
          winner['word'] = word;
          winner['score'] = this.scoreWord(word);
        };
      };
    };
    return winner;
  },
};

// Do not remove this line or your tests will break!
export default Adagrams;
