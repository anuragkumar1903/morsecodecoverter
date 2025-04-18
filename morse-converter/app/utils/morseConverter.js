const MORSE_CODE_DICT = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.',
  'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---',
  'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---',
  'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
  'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--',
  'z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '0': '-----', ', ': '--..--',
  '.': '.-.-.-', '?': '..--..', '/': '-..-.', '-': '-....-',
  '(': '-.--.', ')': '-.--.-', ' ': '/',
};

function textToMorse(text) {
  if (typeof text !== 'string') {
    return "Invalid input: Input must be a string.";
  }
  text = text.toLowerCase();
  let morse = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (MORSE_CODE_DICT[char]) {
      morse += MORSE_CODE_DICT[char] + ' ';
    } else {
      return `Invalid character: '${char}' in input text.`;
    }
  }
  return morse.trim();
}

function morseToText(morse) {
  if (typeof morse !== 'string') {
    return "Invalid input: Input must be a string.";
  }
  const morseWords = morse.split(' / ');
  let text = '';
  for (const morseWord of morseWords) {
    const morseChars = morseWord.split(' ');
    let word = '';
    for (const morseChar of morseChars) {
      const char = Object.keys(MORSE_CODE_DICT).find(key => MORSE_CODE_DICT[key] === morseChar);
      if (char) {
        word += char;
      } else if (morseChar !== '')
       {
        return `Invalid Morse code character: '${morseChar}' in input Morse code.`;
      }
    }
    text += word + ' ';
  }
  return text.trim();
}

module.exports = {
  textToMorse,
  morseToText,
};