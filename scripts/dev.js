const { spawn } = require('child_process')

function run(command, args, label) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: false
  })

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${label} exited with code ${code}`)
      process.exitCode = code
    }
  })

  return child
}

const isWindows = process.platform === 'win32'
const npmCommand = isWindows ? process.env.ComSpec || 'cmd.exe' : 'npm'
const backendArgs = isWindows
  ? ['/d', '/s', '/c', 'npm run dev --workspace backend']
  : ['run', 'dev', '--workspace', 'backend']
const frontendArgs = isWindows
  ? ['/d', '/s', '/c', 'npm run dev --workspace frontend']
  : ['run', 'dev', '--workspace', 'frontend']

run(npmCommand, backendArgs, 'backend')
run(npmCommand, frontendArgs, 'frontend')