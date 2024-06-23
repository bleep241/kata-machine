export default function bs_list(haystack: number[], needle: number): boolean {
  let lo = 0;
  let hi = haystack.length;

  do {
    let mid = (lo + (hi - lo) / 2);
    let val = haystack[mid];

    if (val === needle) {
      return true;
    } else if (val > needle) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  } while (lo < hi);

  return false;
}

console.log(bs_list([2,3,5,6,8,9], 5));