// 选择排序
export default function SelectionSort(arr) {
  let len = arr.length
  let array = [...arr]
  let i, j
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (array[i] > array[j]) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
    return array
  }
}