import { run } from '../utils'

run((input: string) => {
  const devices = input.split('\n')
    .filter(Boolean)
    .reduce<Record<string, string[]>>((acc, line) => {
      const [key, values] = line.split(':')
      acc[key] = values.split(' ').filter(Boolean)
      return acc
    }, {})

  const startDeviceOutputs1 = devices['you']
  if (startDeviceOutputs1) {
    let pathsCount = 0
    function searchForPath(currentPath: string[]) {
      const lastDevice = currentPath[currentPath.length - 1]
      const lastDeviceOutputs = devices[lastDevice]
      for (let i = 0; i < lastDeviceOutputs.length; i++) {
        const device = lastDeviceOutputs[i]
        if (device === 'out') {
          pathsCount++
        } else {
          searchForPath([...currentPath, device])
        }
      }
    }
    for (let i = 0; i < startDeviceOutputs1.length; i++) {
      const device = startDeviceOutputs1[i]
      searchForPath([device])
    }
    console.log('part1:', pathsCount)
  }

  const startDeviceOutputs2 = devices['svr']
  if (startDeviceOutputs2) {
    let pathsCount = 0
    function searchForProblematicPath(currentPath: string[]) {
      const lastDevice = currentPath[currentPath.length - 1]
      const lastDeviceOutputs = devices[lastDevice]
      for (let i = 0; i < lastDeviceOutputs.length; i++) {
        const device = lastDeviceOutputs[i]
        if (device === 'out') {
          if (currentPath.includes('dac') && currentPath.includes('fft')) {
            pathsCount++
          }
        } else {
          searchForProblematicPath([...currentPath, device])
        }
      }
    }
    for (let i = 0; i < startDeviceOutputs2.length; i++) {
      const device = startDeviceOutputs2[i]
      searchForProblematicPath([device])
    }
    console.log('part2:', pathsCount)
  }
})

