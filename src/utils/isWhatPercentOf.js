export function isWhatPercentOf(numA, numB) {
  return ((parseFloat(numA) / parseFloat(numB)) * 100).toFixed(2);
}
