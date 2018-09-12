// 快速排序
export default function QuickSort(arr) {
  let len = arr.length - 1
  let array = [...arr]

  function sort(left, right) {
    let mid = array[left]
    let l = left, r = right

    while (l < r) {
      while (l < r && array[r] >= mid) {
        r--
      }
      while (l < r && array[l] <= mid) {
        l++
      }

      if(l < r) {
        let temp = array[l]
        array[l] = array[r]
        array[r] = temp
      }
    }
    array[left] = array[l]
    array[l] = mid
    sort(left, l - 1)
    sort(l + 1, right)
  }
  sort(0, len)

  return array
  
}