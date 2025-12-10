import { run } from '../utils'

type Button = number[]
interface Machine {
  lights: boolean[]
  buttons: Button[]
  joltages: number[]
}

function areLightsEqual(lights1: boolean[], lights2: boolean[]) {
  return lights1.every((l, i) => l === lights2[i])
}
function pushSequenceOfLightButtons(machine: Machine, sequence: number[]) {
  const lights: boolean[] = machine.lights.map(() => false)
  for (let i = 0; i < sequence.length; i++) {
    const button = machine.buttons[sequence[i]]
    for (let j = 0; j < button.length; j++) {
      lights[button[j]] = !lights[button[j]]
    }
  }
  return areLightsEqual(lights, machine.lights)
}
function findLightsSequences(machine: Machine, presses: number, currentSequence: number[]) {
  for (let buttonIndex = 0; buttonIndex < machine.buttons.length; buttonIndex++) {
    const sequence = [...currentSequence, buttonIndex]
    let success: boolean
    if (sequence.length === presses) {
      success = pushSequenceOfLightButtons(machine, sequence)
    } else {
      success = findLightsSequences(machine, presses, sequence)
    }
    if (success) return true
  }
  return false
}

const SUCCESS = -1
const FAILURE = -2
function compareJoltages(joltages: number[], machineJoltages: number[]) {
  let same = true
  for (let i = 0; i < joltages.length; i++) {
    if (joltages[i] > machineJoltages[i]) {
      return i
    }
    if (joltages[i] !== machineJoltages[i]) {
      same = false
    }
  }
  return same ? SUCCESS : FAILURE
}
function pushSequenceOfJoltageButtons(machine: Machine, sequence: number[]) {
  const joltages: number[] = machine.joltages.map(() => 0)
  for (let i = 0; i < sequence.length; i++) {
    const button = machine.buttons[sequence[i]]
    for (let j = 0; j < button.length; j++) {
      joltages[button[j]]++
    }
  }
  return compareJoltages(joltages, machine.joltages)
}
function findJoltagesSequences(machine: Machine, presses: number, currentSequence: number[]) {
  for (let buttonIndex = 0; buttonIndex < machine.buttons.length; buttonIndex++) {
    const sequence = [...currentSequence, buttonIndex]
    let result: number
    if (sequence.length === presses) {
      result = pushSequenceOfJoltageButtons(machine, sequence)
    } else {
      result = findJoltagesSequences(machine, presses, sequence)
    }
    if (result === SUCCESS) return SUCCESS
    if (result >= 0) return FAILURE
  }
  return FAILURE
}

run((input: string) => {
  const machines: Machine[] = input.split('\n')
    .filter(Boolean)
    .map((line) => {
      const splits = line.split(' ')
      const lights = splits[0]
        .substring(1, splits[0].length - 1)
        .split('')
        .map(l => l === '#')
      const buttons = splits
        .slice(1, splits.length - 1)
        .map((buttons) => {
          return buttons.substring(1, buttons.length - 1)
            .split(',')
            .map(Number)
        })
      const joltages = splits[splits.length - 1]
        .substring(1, splits[splits.length - 1].length - 1)
        .split(',')
        .map(Number)
      return { lights, buttons, joltages }
    })

  let sum1 = 0
  for (const machine of machines) {
    let presses = 0
    while (++presses) {
      const success = findLightsSequences(machine, presses, [])
      if (success) {
        sum1 += presses
        break
      }
    }
  }
  console.log('part1:', sum1)

  let sum2 = 0
  for (const machine of machines) {
    let presses = 1
    while (++presses) {
      const success = findJoltagesSequences(machine, presses, []) === SUCCESS
      if (success) {
        sum2 += presses
        break
      }
    }
  }
  console.log('part2:', sum2)
})

