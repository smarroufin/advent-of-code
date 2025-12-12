import { run } from '../utils'

type PresentGrid = boolean[][]
type TreeGrid = number[]

interface Tree {
  width: number
  height: number
  size: number
  presents: number[]
}

interface Present {
  size: number
  rotations: PresentGrid[]
}

enum Rotation {
  R0 = 0,
  R90 = 1,
  R180 = 2,
  R270 = 3
}

function areGridsEqual(grid1: PresentGrid, grid2: PresentGrid) {
  return grid1.every((line, li) => line.every((cell, ci) => cell === grid2[li][ci]))
}

function uniqGrids(grids: PresentGrid[]) {
  return grids.reduce<PresentGrid[]>((acc, grid) => {
    const found = acc.find(g => areGridsEqual(g, grid))
    if (!found) acc.push(grid)
    return acc
  }, [])
}

function isTreeSizeBigEnough(tree: Tree, presents: Present[]) {
  return tree.presents.reduce((acc, present) => acc + presents[present].size, 0) <= tree.size
}

function rotateGrid(grid: PresentGrid, rotation: Rotation) {
  switch (rotation) {
    case Rotation.R0:
      return grid
    case Rotation.R90:
      return Array(3).fill(0).map((_, x) => grid.map(line => line[x]).reverse())
    case Rotation.R180:
      return grid.map(line => [...line].reverse()).reverse()
    case Rotation.R270:
      return Array(3).fill(0).map((_, x) => grid.map(line => line[line.length - x - 1]))
    default: throw new Error('Unknown rotation')
  }
}

function addPresentGridToTreeGrid(tree: Tree, presentGrid: PresentGrid, treeGrid: TreeGrid, treePosition: number, presentIndex: number) {
  for (let y = 0; y < presentGrid.length; y++) {
    for (let x = 0; x < presentGrid[y].length; x++) {
      if (presentGrid[y][x]) {
        const index = treePosition + y * tree.width + x
        if (treeGrid[index] !== -1) return false
        treeGrid[index] = presentIndex
      }
    }
  }
  return true
}

function addPresentsToTree(tree: Tree, presents: Present[], treeGrid: TreeGrid, presentIndex: number) {
  const present = presents[tree.presents[presentIndex]]
  for (let treePosition = 0; treePosition < tree.size;) {
    const treeX = treePosition % tree.width
    const treeY = Math.floor(treePosition / tree.width)
    if (treeX + 3 > tree.width) {
      treePosition += 2
      continue
    }
    if (treeY + 3 > tree.height) {
      break
    }
    for (let rotation = 0; rotation < present.rotations.length; rotation++) {
      const newTreeGrid = [...treeGrid]
      const added = addPresentGridToTreeGrid(tree, present.rotations[rotation], newTreeGrid, treePosition, presentIndex)
      if (!added) continue
      if (presentIndex === tree.presents.length - 1) {
        return true
      } else {
        if (addPresentsToTree(tree, presents, newTreeGrid, presentIndex + 1)) {
          return true
        }
      }
    }
    treePosition++
  }
  return false
}

run((input: string) => {
  const parts = input.split('\n\n')
  const presents: Present[] = parts.slice(0, -1)
    .map((part) => {
      const lines = part.split('\n')
      const grid = lines.slice(1).map(line => line.split('').map(c => c === '#'))
      const size = grid.reduce((acc, line) => acc + line.filter(c => c).length, 0)
      const rotations = uniqGrids([
        rotateGrid(grid, Rotation.R0),
        rotateGrid(grid, Rotation.R90),
        rotateGrid(grid, Rotation.R180),
        rotateGrid(grid, Rotation.R270)
      ])
      return { size, rotations }
    })
  const trees: Tree[] = parts[parts.length - 1]
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [dimension, presents] = line.split(':')
      const dimensionSplit = dimension.split('x')
      const width = parseInt(dimensionSplit[0])
      const height = parseInt(dimensionSplit[1])
      const presentsCounts = presents.trim().split(' ').map(Number)
      const presentsIndexes: number[] = presentsCounts
        .flatMap((count, index) => {
          if (count === 0) return null
          return Array<number>(count).fill(index)
        })
        .filter(i => i !== null)
      return {
        width,
        height,
        size: width * height,
        presents: presentsIndexes
      }
    })

  const sum = trees.reduce((acc, tree, index) => {
    console.log(`${index + 1}/${trees.length}`)
    if (!isTreeSizeBigEnough(tree, presents)) return acc
    const treeGrid = Array(tree.size).fill(-1)
    const positions = addPresentsToTree(tree, presents, treeGrid, 0)
    if (!positions) return acc
    return acc + 1
  }, 0)

  console.log('part1:', sum)
})

