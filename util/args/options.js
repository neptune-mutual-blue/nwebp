const path = require('path')
const io = require('../io')
const PADDING = 64

const optionFallback = {
  root: process.cwd(),
  recursive: true,
  deleteSource: false,
  quality: 80
}

const parseBool = async (x) => {
  const truth = ['t', 'true', 'y', 'yes', '1']
  return truth.includes(x.toLowerCase())
}

const options = {
  help: {
    type: 'boolean',
    short: 'h',
    value: '',
    description: 'Displays help'
  },
  root: {
    type: 'string',
    short: 'r',
    value: 'path-to-folder',
    description: 'Search image files under this directory',
    parse: async (x) => {
      const resolved = path.resolve(x)

      if (await io.exists(x) === false) {
        throw new Error(`Invalid path: ${resolved}`)
      }

      return resolved
    }
  },
  recursive: {
    type: 'string',
    short: 'R',
    value: 'true|false',
    description: 'Performs a recursive search',
    parse: parseBool
  },
  deleteSource: {
    type: 'string',
    short: 'd',
    value: 'true|false',
    description: 'Deletes source files after conversion',
    parse: parseBool
  },
  quality: {
    type: 'string',
    short: 'q',
    value: '0-100',
    description: 'Quality of the converted image',
    parse: async (x) => {
      const value = parseInt(x, 10)

      if (isNaN(value)) {
        throw new Error(`Invalid quality: ${x}`)
      }

      if (value < 0 || value > 100) {
        throw new Error('Quality must be between 0 and 100')
      }

      return value
    }
  }
}

const getOptions = () => {
  const builder = []

  for (const prop in options) {
    const el = options[prop]
    const { type, value, short, description } = el
    const line = `--${prop} or -${short}${value ? ` <${value}>` : ''} (${type})`
    const padding = PADDING - line.length

    builder.push(`${line}${'.'.repeat(padding)}${description}`)
  }

  return builder.join('\n')
}

module.exports = { optionFallback, options, getOptions }
