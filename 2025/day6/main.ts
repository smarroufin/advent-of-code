import { run } from '../utils'

function compute(operator: string, numbers: number[]) {
  switch (operator) {
    case '+':
      return numbers.reduce((a, b) => a + b)
    case '*':
      return numbers.reduce((a, b) => a * b)
  }
  throw new Error(`Unknown operator ${operator}`)
}

run((input: string) => {
  const lines = input.split('\n').filter(Boolean)
  const numbersLines = lines.slice(0, -1)
  const operatorsLine = lines[lines.length - 1]

  let sum1 = 0
  let sum2 = 0
  let startIndex = 0
  for (let i = 0; i < operatorsLine.length; i++) {
    const isEnd = i === operatorsLine.length - 1
    const isDivider = operatorsLine[i] === ' ' && operatorsLine[i + 1] !== ' '
    if (isEnd || isDivider) {
      const endIndex = isEnd ? i + 1 : i
      const operator = operatorsLine[startIndex]
      const numbers1 = numbersLines.map((line) => Number(line.slice(startIndex, endIndex)))
      const numbers2: number[] = []
      for (let j = startIndex; j < endIndex; j++) {
        numbers2.push(Number(numbersLines.map((line) => line[j]).join('')))
      }
      sum1 += compute(operator, numbers1)
      sum2 += compute(operator, numbers2)
      startIndex = i + 1
    }
  }

  console.log('part1:', sum1)
  console.log('part2:', sum2)
})

