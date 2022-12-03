const { options } = require('./options')

const getCommand = () => {
  const builder = ['nwebp']

  for (const prop in options) {
    const el = options[prop]
    const { value, short } = el

    builder.push(`[--${prop} or -${short}${value ? ` <${value}>` : ''}]`)
  }

  return builder.join(' ')
}

module.exports = { getCommand }
