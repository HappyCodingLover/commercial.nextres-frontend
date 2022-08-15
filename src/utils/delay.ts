export const delay = (n: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success')
    }, n * 1000)
  })
}
