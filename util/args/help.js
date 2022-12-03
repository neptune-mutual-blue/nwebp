const chalk = require('chalk')
const { getOptions } = require('./options')
const { getCommand } = require('./command')

const printHelp = () => {
  console.log(chalk.blue.bold('Please ensure you have `cwebp` CLI installed'))
  console.log('Download it from here: https://developers.google.com/speed/webp/download')
  console.log()

  console.log(chalk.black.bold('Usage:'))
  console.log(getCommand())
  console.log()

  console.log(chalk.black.bold('Options:'))
  console.log()

  console.log(getOptions())
}

module.exports = { printHelp }
