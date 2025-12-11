import { run } from '../utils'

run((input: string) => {
  const split = input.split('\n\n')
  const freshIds = split[0].split('\n')
    .map((range) => range.split('-').map(Number) as [number, number])
  const availableIds = split[1].split('\n')
    .filter(Boolean)
    .map(Number)

  const freshCount = availableIds.reduce((acc, id) => {
    const isFresh = freshIds.some(([min, max]) => id >= min && id <= max)
    return isFresh ? acc + 1 : acc
  }, 0)

  freshIds.sort((a, b) => a[1] - b[1])
  for (let i = freshIds.length - 1; i > 0; i--) {
    const [min] = freshIds[i]
    const [nextMin, nextMax] = freshIds[i - 1]
    if (min < nextMin) {
      freshIds.splice(i - 1, 1)
      continue
    }
    if (min >= nextMin && min <= nextMax) {
      freshIds[i][0] = nextMin
      freshIds.splice(i - 1, 1)
      continue
    }
  }
  const idsCount = freshIds.reduce((acc, [min, max]) => acc + (max - min + 1), 0)

  console.log('part1:', freshCount)
  console.log('part2:', idsCount)
})

