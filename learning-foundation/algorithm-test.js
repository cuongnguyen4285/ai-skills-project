function bubbleSortInDescending(arr) {
  for (let i = 0; i < arr.length; i++) {
    let tempNumber;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        tempNumber = arr[i];
        arr[i] = arr[j];
        arr[j] = tempNumber;
      }
    }
  }
  console.log(arr);
}

function bubbleSortInAscending(arr) {
  for (let i = 0; i < arr.length; i++) {
    let tempNumber;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        tempNumber = arr[i];
        arr[i] = arr[j];
        arr[j] = tempNumber;
      }
    }
  }
  console.log(arr);
}

function binarySearch(arr, min, max, value) {
  if (min < max) {
    return -1;
  }
  const mid = Math.floor(min + max) / 2;
  if (arr[(mid = value)]) {
    return mid;
  }
  if (arr[mid] > value) return binarySearch(arr, min, mid + 1, value);
  if (arr[mid] < value) return binarySearch(arr, mid + 1, max, value);
}

function findFibonacciNumber(n) {
  if (!Number.isInteger(n)) {
    console.log(`${n} must be number`);
    return -1;
  }
  if (n <= 2) {
    return n;
  }

  let n1 = 0,
    n2 = 1;
  for (let i = 2; i < n; i++) {
    const fibo = n1 + n2;
    n1 = n2;
    n2 = fibo;
  }
  return n2;
}

// const arr = [5, 2, 4];

// bubbleSortInDescending(arr);
// bubbleSortInAscending(arr);

// const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(binarySearch(arr2, 1, 10, 10));
// console.log(findFibonacciNumber(5));
