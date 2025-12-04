import { readFile } from 'node:fs/promises'

async function readInput() {
  const filename = process.argv[2]
  if (!filename) {
    throw new Error("No input file specified")
  }
  try {
    return await readFile(filename, "utf8")
  } catch (err) {
    throw new Error(`Error reading input file: ${err}`)
  }
}

export function run(fn: (input: string) => Promise<void> | void) {
  readInput()
    .then(async (input) => {
      console.time('execution')
      await fn(input)
      console.timeEnd('execution')
    })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    })
}

