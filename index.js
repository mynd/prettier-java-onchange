const commander = require('commander')
const fs = require('fs')
const { onchange } = require('onchange')

const main = (dir, options, ...params) => {
  const command = 'npx prettier -w --config .prettierrc.java.json {{file}}'.split(' ')
  const exclude = ['**/target/**']
  const filter = ['change']
  if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
    dir = dir.replace(/[\\/]*$/, '/**/*.java')
  }
  const matches = [dir]
  const verbose = !options.quiet
  onchange({
    ...options,
    command,
    filter,
    matches,
    verbose,
  })
}

commander
  .argument('<dir>')
  .option('-a, --add')
  .option('--await-write-finish <ms>')
  .option('-j, --jobs <number>')
  .option('-o, --outpipe <command>')
  .option('-p, --poll <ms>')
  .option('-q, --quiet')
  .action(main)
  .parse()
