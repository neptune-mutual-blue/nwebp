const chalk = require('chalk')
const { parseArgs } = require('node:util')
const { printHelp } = require('./help')
const { options, optionFallback } = require('./options')

const getArgs = async () => {
  try {
    const returns = optionFallback

    const { values } = parseArgs({ options })
    const { help } = values

    if (help || JSON.stringify(values) === '{}') {
      printHelp()
      return
    }

    for (const prop in values) {
      const { parse } = options[prop]
      const fallback = values[prop]

      const value = typeof parse === 'function' ? await parse(fallback) : fallback

      returns[prop] = value
    }

    return returns
  } catch (error) {
    console.error(chalk.red.bold('Error', error.message))
    console.log()
    printHelp()
  }

  return {}
}

module.exports = { getArgs }
