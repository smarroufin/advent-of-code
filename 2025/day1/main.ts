import { run } from '../utils'

function part1(moves: number[]) {
  let position = 50
  let zeroCount = 0
  for (const move of moves) {
    position += move
    if (position > 0) {
      position = position % 100
    } else {
      position = (-position % 100) * -1
    }
    if (position === 0) {
      zeroCount++
    }
  }
  return zeroCount
}

function part2(moves: number[]) {
  let position = 50
  let zeroCount = 0
  for (const move of moves) {
    const wasZero = position === 0
    const absMove = Math.abs(move)
    const ignoredTurns = Math.floor(absMove / 100)
    const flattenedMove = (absMove % 100) * (move < 0 ? -1 : 1)
    zeroCount += ignoredTurns
    if (!flattenedMove) {
      continue
    }
    position += flattenedMove
    if (position > 99) {
      position -= 100
      zeroCount++
    } else if (position < 0) {
      position += 100
      if (!wasZero) zeroCount++
    } else if (position === 0) {
      zeroCount++
    }
  }
  return zeroCount
}

run((input: string) => {
  console.time('execution')
  const moves = input
    .split('\n')
    .filter(Boolean)
    .map((line) => Number(line.slice(1)) * (line[0] === 'L' ? -1 : 1))
  const result1 = part1(moves)
  const result2 = part2(moves)
  console.timeEnd('execution')
  console.log('part1:', result1)
  console.log('part2:', result2)
})

