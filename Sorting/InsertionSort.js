// 插入排序
export default function InsertionSort(arr) {
  let len = arr.length
  let array = [...arr]
  for(let i = 1; i < len; i++) {
    let curr = i
    while(array[curr] < array[curr - 1]) {
      let temp = array[curr]
      array[curr] = array[curr - 1]
      array[curr - 1] = temp
      curr -= 1
    }
  }
  return array
}