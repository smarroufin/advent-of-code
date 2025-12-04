import { run } from '../utils'

function getBankJoltage(bank: number[]): number {
  let max = 0
  for (let i = 0; i < bank.length - 1; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const value = bank[i] * 10 + bank[j]
      if (value > max) {
        max = value
      }
    }
  }
  return max
}

function getBankJoltageNoLimit({ bank, bankIndex, maxValue, baseValue, level }: { bank: number[], bankIndex: number, maxValue: number, baseValue: number, level: number }): number {
  const levelMult = level === 1 ? 1 : Math.pow(10, level - 1)
  for (let i = bankIndex; i <= bank.length - level; i++) {
    const levelValue = baseValue + bank[i] * levelMult
    const maxNormalized = Math.floor(maxValue / levelMult) * levelMult
    if (levelValue < maxNormalized) {
      continue
    }
    maxValue = Math.max(maxValue, levelValue)
    if (level !== 1) {
      maxValue = getBankJoltageNoLimit({ bank, bankIndex: i + 1, maxValue, baseValue: levelValue, level: level - 1 })
    }
  }
  return maxValue
}

run((input: string) => {
  const banks: number[][] = input
    .split('\n')
    .filter(Boolean)
    .map(bank => bank.split('').map(char => parseInt(char)))
  const totalJoltage = banks.reduce((acc, bank) => acc + getBankJoltage(bank), 0)
  const totalJoltageNoLimit = banks.reduce((acc, bank) => acc + getBankJoltageNoLimit({ bank, bankIndex: 0, maxValue: 0, baseValue: 0, level: 12 }), 0)
  console.log('part1:', totalJoltage)
  console.log('part2:', totalJoltageNoLimit)
})

