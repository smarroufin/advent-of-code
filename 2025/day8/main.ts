import { run } from '../utils'

type Box = [number, number, number]
type Circuit = number[]

function distance(a: Box, b: Box) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const dz = b[2] - a[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

function circuitIndexes(circuits: Circuit[], aId: number, bId: number): [number, number] {
  let aCircuit = -1
  let bCircuit = -1
  for (let j = 0; j < circuits.length; j++) {
    if (circuits[j].includes(aId))
      aCircuit = j
    if (circuits[j].includes(bId))
      bCircuit = j
    if (aCircuit !== -1 && bCircuit !== -1)
      break
  }
  return [aCircuit, bCircuit]
}


run((input: string) => {
  const boxes: Box[] = input.split('\n')
    .filter(Boolean)
    .map((line) => line.split(',').map(Number) as Box)

  const allPairs: [number, number, number][] = []
  for (let aId = 0; aId < boxes.length - 1; aId++) {
    for (let bId = aId + 1; bId < boxes.length; bId++) {
      const d = distance(boxes[aId], boxes[bId])
      allPairs.push([d, aId, bId])
    }
  }
  allPairs.sort((a, b) => a[0] - b[0])

  const shortestPairs = allPairs.slice(0, 1000)
  const circuits1: Circuit[] = []
  for (let i = 0; i < shortestPairs.length; i++) {
    const aId = shortestPairs[i][1]
    const bId = shortestPairs[i][2]
    const [aCircuit, bCircuit] = circuitIndexes(circuits1, aId, bId)
    if (aCircuit === -1 && bCircuit === -1) {
      circuits1.push([aId, bId])
    } else if (aCircuit === -1) {
      circuits1[bCircuit].push(aId)
    } else if (bCircuit === -1) {
      circuits1[aCircuit].push(bId)
    } else if (aCircuit !== bCircuit) {
      circuits1[aCircuit].push(...circuits1[bCircuit])
      circuits1.splice(bCircuit, 1)
    }
  }
  const sum1 = circuits1
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .map(circuit => circuit.length)
    .reduce((acc, size) => acc * size)

  const circuits2: Circuit[] = boxes.map((_, index) => [index])
  let lastPair: [number, number, number] | undefined
  for (let i = 0; i < allPairs.length; i++) {
    const aId = allPairs[i][1]
    const bId = allPairs[i][2]
    const [aCircuit, bCircuit] = circuitIndexes(circuits2, aId, bId)
    if (aCircuit === bCircuit) {
      continue
    }
    circuits2[aCircuit].push(...circuits2[bCircuit])
    circuits2.splice(bCircuit, 1)
    if (circuits2.length === 1) {
      lastPair = allPairs[i]
      break
    }
  }
  const sum2 = boxes[lastPair![1]][0] * boxes[lastPair![2]][0]

  console.log('part1:', sum1)
  console.log('part2:', sum2)
})

