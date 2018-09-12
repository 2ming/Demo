// 冒泡排序
export default function BubbleSort(arr) {
  let len = arr.length
  let array = [...arr]
  for(let i = 1; i < len; i++) {
    let flag = false
    for(let j = 0; j < len - i; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        flag = true
      }
    }
    // 优化冒泡
    if(!flag) {
      return array
    }
  }
}