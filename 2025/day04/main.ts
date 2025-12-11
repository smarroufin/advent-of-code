import { run } from '../utils'

function isRollRemovable(grid: string[], x: number, y: number) {
  let neighborRollsCount = 0
  for (let y2 = y - 1; y2 <= y + 1; y2++) {
    if (y2 >= 0 && y2 < grid.length) {
      for (let x2 = x - 1; x2 <= x + 1; x2++) {
        if (x2 >= 0 && x2 < grid[y2].length) {
          if (x2 === x && y2 === y) continue
          if (grid[y2][x2] === '@') {
            neighborRollsCount++
            if (neighborRollsCount === 4) break
          }
        }
      }
    }
  }
  return neighborRollsCount < 4
}

run((input: string) => {
  const grid = input.split('\n')
  let removableRolls = 0
  let removedRolls = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '@') {
        const isRemovable = isRollRemovable(grid, x, y)
        if (isRemovable) {
          ++removableRolls
        }
      }
    }
  }
  let removedARoll = false
  do {
    removedARoll = false
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '@') {
          const isRemovable = isRollRemovable(grid, x, y)
          if (isRemovable) {
            grid[y] = grid[y].substring(0, x) + '.' + grid[y].substring(x + 1)
            ++removedRolls
            removedARoll = true
          }
        }
      }
    }
  } while (removedARoll)
  console.log('part1:', removableRolls)
  console.log('part2:', removedRolls)
})

