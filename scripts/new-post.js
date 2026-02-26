/* This is a script to create a new post markdown file with front-matter */

import fs from "fs"
import path from "path"

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`Error: No folder name argument provided
Usage: npm run new-post -- <post-name>`)
  process.exit(1)
}

const postName = args[0]
const targetDir = path.join("./src/content/posts/", postName)
const fullPath = path.join(targetDir, "index.md")

if (fs.existsSync(targetDir)) {
  console.error(`Error: Folder ${targetDir} already exists`)
  process.exit(1)
}

fs.mkdirSync(targetDir, { recursive: true })

const content = `---
title: ${postName}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false
lang: ''
obsidian: ''
---
`

fs.writeFileSync(fullPath, content)

console.log(`Post ${fullPath} created`)
