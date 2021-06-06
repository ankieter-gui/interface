//https://stackoverflow.com/questions/1916218/find-the-longest-common-starting-substring-in-a-set-of-strings
export function commonSubstring(words){
  var iChar, iWord,
    refWord = words[0],
    lRefWord = refWord.length,
    lWords = words.length;
  for (iChar = 0; iChar < lRefWord; iChar += 1) {
    for (iWord = 1; iWord < lWords; iWord += 1) {
      if (refWord[iChar] !== words[iWord][iChar]) {
        return refWord.substring(0, iChar);
      }
    }
  }
  return refWord;
}
