export function invoiceId(): string {
  const letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers: string = "0123456789"

  let id: string = ""

  for (let i = 0; i < 2; i++) {
    let letter: string = letters.charAt(
      Math.floor(Math.random() * letters.length)
    )
    id += letter
  }

  id += numbers.charAt(Math.floor(Math.random() * numbers.length))

  for (let i = 0; i < 3; i++) {
    let number: string = numbers.charAt(
      Math.floor(Math.random() * numbers.length)
    )
    id += number
  }

  return id
}

export function createdAt(): string {
  let currentDate = new Date()

  let createdDate = new Date(currentDate)
  createdDate.setDate(createdDate.getDate())

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  let monthIndex = createdDate.getMonth()
  let monthName = monthNames[monthIndex]

  let day = ("0" + createdDate.getDate()).slice(-2)
  let createdDateString =
    day + " " + monthName + " " + createdDate.getFullYear()

  return createdDateString
}
export function paymentDueFunc(inputDate: string) {
  const [year, month, day] = inputDate.split("-")

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const monthStr = monthNames[parseInt(month) - 1]

  const outputDate = `Due ${day} ${monthStr} ${year}`
  return outputDate
}

export function validateInputOnlyNumber(event: React.ChangeEvent<HTMLInputElement>) {
  const inputValue = event.target.value
  const onlyNumbers = /^[0-9]*$/

  if (!onlyNumbers.test(inputValue)) {
    event.target.value = inputValue.replace(/\D/g, "") // Faqat raqamlarni qabul qilish
  }
}
