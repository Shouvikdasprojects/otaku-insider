const fs = require('fs')
const path = require('path')
const targetDir = path.join(__dirname, '../.vercel/output')

function getFiles(dir, files = []) {
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

const { execSync } = require('child_process')

async function main() {
  console.log('⚡️ Starting build assets minification...')
  try {
    if (!fs.existsSync(targetDir)) {
      console.log('⚠️ .vercel/output directory not found. Skipping minification.')
      return
    }

    const files = getFiles(targetDir)
    console.log(`🔍 Found ${files.length} JavaScript files to minify.`)

    for (const file of files) {
      console.log(`📦 Minifying: ${path.relative(targetDir, file)}`)
      try {
        execSync(`npx esbuild "${file}" --minify --allow-overwrite --outfile="${file}"`, { stdio: 'ignore' })
      } catch (err) {
        console.warn(`⚠️ Failed to minify ${file}:`, err.message)
      }
    }
    console.log('✅ Minification complete!')
  } catch (error) {
    console.error('❌ Minification failed:', error)
    process.exit(1)
  }
}

main()
