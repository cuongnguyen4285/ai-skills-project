function findIdenticalDigitalNumber(number: number): boolean {
  const digits = number.toString().split("");

  for (let i = 0; i < digits.length; i++) {
    if (number[i] === number[i + 1]) {
      console.log(`${digits[i]} ${digits[i + 1]}`);
      return true;
    }
  }
  return false;
}

function countNumberOfTimesFirstAndLastDigitAreSame(arr: number[]) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    const digit = arr[i].toString();
    if (digit[0] === digit[digit.length - 1]) {
      count++;
    }
  }
  return count;
}

findIdenticalDigitalNumber(11655);

const arr = [11, 234, 345, 565];
console.log(countNumberOfTimesFirstAndLastDigitAreSame(arr));
