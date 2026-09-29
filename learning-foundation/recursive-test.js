function countDown(n) {
  if (n < 1) return;
  console.log(n);
  countDown(n - 1);
}

function sum(n) {
  if (n < 1) return 0;
  return sum(n - 1) + n;
}

countDown(3);
console.log(sum(4));

function findFibonacci(n) {
  if (isNaN(n)) {
    console.log(`${n} must be number`);
    return -1;
  }
  if (n < 2) {
    return n;
  }

  return findFibonacci(n - 1) + findFibonacci(n - 2);
}
