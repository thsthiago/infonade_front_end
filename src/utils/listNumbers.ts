export const handleNumberSelect = () => {
  const listNumber = []

  for (let i = 1; i < 36; i++) {
    listNumber.push({
      label: i,
      value: i
    })
  }

  return listNumber
}
