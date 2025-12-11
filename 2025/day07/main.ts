import { run } from '../utils'

run((input: string) => {
  const lines = input.split('\n')
    .filter(Boolean)
    .filter(line => line.includes('^') || line.includes('S'))

  const grid = lines.map(line => line.split(''))
  let sum1 = 0
  for (let y = 1; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '^' && (grid[y - 1]?.[x] === '|' || grid[y - 1]?.[x] === 'S')) {
        sum1++
        if (x > 0) grid[y][x - 1] = '|'
        if (x < grid[y].length - 1) grid[y][x + 1] = '|'
      }
      if (grid[y][x] === '.' && grid[y - 1]?.[x] === '|') {
        grid[y][x] = '|'
      }
    }
  }

  const yEnd = lines.length - 2
  function beam(y: number, x: number) {
    if (lines[y + 1][x] === '.') {
      if (y === yEnd) return 1
      return beam(y + 1, x)
    } else {
      if (y === yEnd) return 2
      return beam(y + 1, x - 1) + beam(y + 1, x + 1)
    }
  }
  const sum2 = beam(0, lines[0].indexOf('S'))

  console.log('part 1:', sum1)
  console.log('part 2:', sum2)
})

