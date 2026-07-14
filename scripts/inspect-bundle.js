const fs = require('fs')
const path = require('path')

const targetDir = path.join(__dirname, '../.next/server')

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  const fileList = fs.readdirSync(dir)
  for (const file of fileList) {
    const name = path.join(dir, file)
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files)
    } else {
      if (name.endsWith('.js')) {
        files.push(name)
      }
    }
  }
  return files
}

const files = getFiles(targetDir)
files.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size)

console.log('--- Heavy compiled JS Files in .next/server ---')
files.slice(0, 15).forEach(f => {
  const size = fs.statSync(f).size
  console.log(`${(size / 1024 / 1024).toFixed(2)} MB - ${path.relative(targetDir, f)}`)
})
