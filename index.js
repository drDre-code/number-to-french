const specialCaseDictionary = Object.freeze({
  0: "zéro",
  1: "un",
  2: "deux",
  3: "trois",
  4: "quatre",
  5: "cinq",
  6: "six",
  7: "sept",
  8: "huit",
  9: "neuf",
  10: "dix",
  11: "onze",
  12: "douze",
  13: "treize",
  14: "quatorze",
  15: "quinze",
  16: "seize",
  71: "soixante-et-onze",
});

const frenchTensDictionary = Object.freeze({
  10: "dix",
  20: "vingt",
  30: "trente",
  40: "quarante",
  50: "cinquante",
  60: "soixante",
});

const frenchLargeNumbersDictionary = Object.freeze({
  100: "cent",
  1000: "mille",
  1000000: "million",
  1000000000: "milliard",
});

function joinWords(words) {
  return words.join("-");
}

function handleLargeNumber(num, divisor, isSubNumber = false) {
  const largeNum = Math.floor(num / divisor);
  const remainder = num % divisor;
  const frenchWord = [];

  if (largeNum > 1) {
    frenchWord.push(convertNumToFrench(largeNum, true));
  }

  let largeNumInWords = frenchLargeNumbersDictionary[divisor];
  if (remainder !== 0) {
    frenchWord.push(largeNumInWords);
    const remainderWords = convertNumToFrench(remainder, true);
    frenchWord.push(remainderWords);
  } else {
    if (largeNum > 1 && !isSubNumber) {
      largeNumInWords += "s";
    }
    frenchWord.push(largeNumInWords);
  }

  return joinWords(frenchWord);
}

function handleLargeNumbers(num, isSubNumber = false) {
  const divisors = Object.keys(frenchLargeNumbersDictionary)
    .map(Number)
    .sort((a, b) => b - a);
  for (const divisor of divisors) {
    if (num >= divisor) {
      return handleLargeNumber(num, divisor, isSubNumber);
    }
  }
}

// Write a function that takes a number as an argument and returns the number in French.
function convertNumToFrench(num, isSubNumber = false) {
  // Validate input
  if (!Number.isInteger(num)) {
    throw new Error("Input must be an integer");
  }

  if (num < 0) {
    throw new Error("Input must be a non-negative number");
  }

  if (specialCaseDictionary[num] != null) {
    return specialCaseDictionary[num];
  }

  const tens = Math.floor(num / 10) * 10;
  const units = num % 10;

  const frenchWord = [];

  if (num < 70) {
    const tensWord = frenchTensDictionary[tens];
    frenchWord.push(tensWord);
    if (units !== 0) {
      const unitsWord = units === 1 ? "et-un" : specialCaseDictionary[units];
      frenchWord.push(unitsWord);
    }
    return joinWords(frenchWord);
  }

  const twenties = Math.floor(num / 20);
  const ones = num % 20;

  if (num < 100) {
    if (twenties == 3) {
      frenchWord.push(frenchTensDictionary[60]);
    } else {
      frenchWord.push(specialCaseDictionary[twenties]);

      let twentyInWords = frenchTensDictionary[20];
      if (ones === 0 && !isSubNumber) {
        twentyInWords += "s";
      }
      frenchWord.push(twentyInWords);
    }
    if (ones !== 0) {
      const oneWords = convertNumToFrench(ones, true);
      frenchWord.push(oneWords);
    }
    return joinWords(frenchWord);
  }

  if (num >= 100) {
    return handleLargeNumbers(num, isSubNumber);
  }
}

const numberToConvert = 1_000_000_000_000;
console.log(convertNumToFrench(numberToConvert));
