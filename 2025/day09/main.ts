import { run } from '../utils'

type Vec2 = [x: number, y: number]

function getArea([x1, y1]: Vec2, [x2, y2]: Vec2) {
  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
}

run((input: string) => {
  const positions = input.split('\n')
    .filter(Boolean)
    .map((line) => line.split(',').map(Number) as Vec2)
    .sort((a, b) => a[1] - b[1] || a[0] - b[0])

  let maxArea1 = 0
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const area = getArea(positions[i], positions[j])
      if (area > maxArea1) {
        maxArea1 = area
      }
    }
  }

  console.log('part1:', maxArea1)
})

