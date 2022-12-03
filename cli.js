#!/usr/bin/env node

const io = require('./util/io')
const { getArgs } = require('./util/args')
const { exec } = require('child_process')
const chalk = require('chalk')

const processImage = async (source, deleteSource) => {
  const destination = `${source.split('.').shift()}.webp`

  const command = `cwebp -q 80 ${source} -o ${destination}`

  return new Promise((resolve, reject) => {
    exec(command, async (error) => {
      if (error) {
        reject(error)
        return
      }

      console.log(chalk.green.bold('Converted', destination))

      if (deleteSource) {
        console.log(chalk.red.bold('Deleting', source))
        io.deleteFile(source)
      }

      resolve(destination)
    })
  })
}

const getFileList = async (args) => {
  const { root, recursive } = args
  const extensions = ['png', 'jpg', 'jpeg']
  const files = recursive ? await io.findFilesRecursive(extensions, root) : await io.findFiles(extensions, root)

  return files
}

const main = async () => {
  console.log(chalk.inverse.bold(' Neptune Mutual webp Converter '))
  console.log('https://neptunemutual.com/tools/nwebp')
  console.log()

  const args = await getArgs()

  if (!args || JSON.stringify(args) === '{}') {
    return
  }

  const files = await getFileList(args)
  const promises = files.map(x => processImage(x, args.deleteSource))

  await Promise.allSettled(promises)

  console.log(chalk.green('Done'))
}

main()
