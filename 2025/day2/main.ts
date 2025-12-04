import { run } from '../utils'

type Range = [number, number]

function isPairPattern(n: number) {
  const str = n.toString()
  if (str.length % 2 !== 0) {
    return false
  }
  const firstHalf = str.slice(0, str.length / 2)
  const secondHalf = str.slice(str.length / 2)
  return firstHalf === secondHalf
}

function isMultiplePattern(n: number) {
  const str = n.toString()
  for (let occurenceLength = Math.floor(str.length / 2); occurenceLength >= 1; occurenceLength--) {
    const nbOccurences = str.length / occurenceLength
    if (nbOccurences % 1 === 0 && nbOccurences >= 2) {
      const reference = str.slice(0, occurenceLength)
      if (str === reference.repeat(nbOccurences)) {
        return true
      }
    }
  }
  return false
}

run((input: string) => {
  const ranges: Range[] = input
    .split(',')
    .map(range => {
      const split = range.split('-')
      return [parseInt(split[0]), parseInt(split[1])]
    })
  const pairPatternIds: number[] = []
  const multiplePatternIds: number[] = []
  for (const range of ranges) {
    const [start, end] = range
    for (let n = start; n <= end; n++) {
      if (isPairPattern(n)) pairPatternIds.push(n)
      if (isMultiplePattern(n)) multiplePatternIds.push(n)
    }
  }
  const pairPatternSum = pairPatternIds.reduce((acc, id) => acc + id, 0)
  const multiplePatternSum = multiplePatternIds.reduce((acc, id) => acc + id, 0)
  console.log('part1:', pairPatternSum)
  console.log('part2:', multiplePatternSum)
})

