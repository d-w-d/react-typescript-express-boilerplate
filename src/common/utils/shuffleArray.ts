/**
 * From: https://stackoverflow.com/a/2450976/8620332
 */
export const shuffleArray = (array: any[]) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// Used like so
// var arr = [2, 11, 37, 42];
// arr = shuffleArray(arr);
// console.log(arr);
