export function GetQuarter (month) {
  switch (true) {
    case [1, 2, 3].includes(month):
      return 1
    case [4, 5, 6].includes(month):
      return 2
    case [7, 8, 9].includes(month):
      return 3
    case [10, 11, 12].includes(month):
      return 4
  }
}
