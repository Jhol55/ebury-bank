export const checkCreditCardNumber = (num: string): boolean => {
  const arr = (num.replaceAll(' ', '') + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x));
  const lastDigit = arr.splice(0, 1)[0];
  const sum = arr.reduce(
    (acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + (val * 2 > 9 ? val * 2 - 9 : val * 2),
    0
  );
  return (sum + lastDigit) % 10 === 0;
};


