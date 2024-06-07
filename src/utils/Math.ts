export function countDivisors(n: number) {
  let m = n;
  let k = 2;
  let result = 1;
  while (m >= k * k) {
    let i = 1;
    while (m % k == 0) {
      m /= k;
      i++;
    }
    result *= i;
    k += k % 2 + 1  // skip all even numbers except 2
  }
  if (m > 1) {
    result *= 2;
  }
  return result;
}