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

findIdenticalDigitalNumber(11655);
