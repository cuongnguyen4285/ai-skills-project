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

function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const total = nums[i] + nums[j];
      if (total === target) {
        const message = `${nums[i]} + ${nums[j]} === ${target}, return [${i}, ${j}]`;
        console.log(message);
        return [i, j];
      }
    }
  }
}

function lengthOfLongestSubstring(s: string): number {
  const char = new Set<string>();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (char.has(s[right])) {
      char.delete(s[left]);
      left++;
    }
    char.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

function reverse(x: number): number {
  const isNegative = x < 0;
  let strNumber = Math.abs(x).toString();
  let reverse = "";

  for (let i = strNumber.length - 1; i >= 0; i--) {
    reverse += strNumber[i];
  }

  const result = Number(reverse);
  const minInt = -(2 ** 31);
  const maxInt = 2 ** 31 - 1;

  if (result < minInt || result > maxInt) {
    return 0;
  }

  return isNegative ? -result : result;
}

function isValid(s: string): boolean {
  const stack: string[] = [];
  const map = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  for (const char of s) {
    if (map.has(char)) {
      if (stack.pop() !== map.get(char)) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const indexMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (indexMap.has(num)) {
      const prevIndex = indexMap.get(num)!;
      if (i - prevIndex <= k) {
        return true;
      }
    }

    indexMap.set(num, i);
  }

  return false;
}

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  let dummy = new ListNode();
  let current = dummy;

  if (list1 === null && list2 === null) {
    return null;
  }

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = list1 !== null ? list1 : list2;
  return dummy.next;
}

function isPalindrome(x: number): boolean {
  const str = x.toString();

  const mid = Math.floor(str.length / 2);
  let lastIndex = str.length - 1;

  for (let i = 0; i <= mid; i++) {
    if (str[i] === str[lastIndex]) {
      lastIndex--;
    } else {
      return false;
    }
  }

  return true;
}

function romanToInt(s: string): number {
  const romanMap = new Map<string, number>([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const current = romanMap.get(s[i]);
    const next = romanMap.get(s[i + 1]);

    if (current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

function intToRoman(num: number): string {
  const romanMap = new Map<number, string>([
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ]);

  let result = "";

  for (const [value, symbol] of romanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

function removeDuplicates(nums: number[]): number {
  const numMap = new Map<number, boolean>();
  let k = 0;

  for (const num of nums) {
    if (!numMap.has(num)) {
      numMap.set(num, true);

      nums[k] = num;
      k++;
    }
  }

  return k;
}
