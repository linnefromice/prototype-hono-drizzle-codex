import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface SnapshotData {
  [key: string]: string
}

/**
 * Parse Vitest snapshot file format
 * Format: exports[`test name`] = `snapshot data`
 */
function parseSnapshotFile(filepath: string): SnapshotData {
  const content = readFileSync(filepath, 'utf-8')
  const snapshots: SnapshotData = {}

  // Match Vitest snapshot format: exports[`...`] = `...`;
  const regex = /exports\[`(.+?)`\]\s*=\s*`\n?([\s\S]+?)\n?`;/g
  let match

  while ((match = regex.exec(content)) !== null) {
    const [, name, data] = match
    snapshots[name] = data
  }

  return snapshots
}

/**
 * Convert test name to readable title
 * Example: "Users API > GET /users/:id > returns user by id > GET /users/:id - found user 1"
 * Output: "GET /users/:id - Returns user by id"
 */
function formatTestName(testName: string): string {
  // Remove the trailing " 1" or similar numbers
  const cleaned = testName.replace(/\s+\d+$/, '')

  // Split by >
  const parts = cleaned.split(' > ')

  // Take the last meaningful parts
  if (parts.length >= 3) {
    const endpoint = parts[parts.length - 1] || parts[parts.length - 2]
    const description = parts[parts.length - 2] || parts[parts.length - 1]

    // Clean up and format
    const method = endpoint.match(/(GET|POST|PUT|DELETE|PATCH)/)?.[0] || ''
    const path = endpoint.match(/\/[\w/:]+/)?.[0] || ''

    if (method && path) {
      return `${method} ${path} - ${description}`
    }
  }

  return cleaned
}

/**
 * Generate Markdown documentation from snapshots
 */
function generateMarkdown(name: string, snapshots: SnapshotData): string {
  const title = name.charAt(0).toUpperCase() + name.slice(1)

  let markdown = `# ${title} API Snapshots\n\n`
  markdown += `## Overview\n\n`
  markdown += `This page shows the snapshot test results for the ${title} API endpoints.\n\n`
  markdown += `All dynamic values (UUIDs and timestamps) are normalized using placeholders:\n`
  markdown += `- \`<UUID:1>\`, \`<UUID:2>\` - Normalized UUIDs\n`
  markdown += `- \`<DATETIME:1>\`, \`<DATETIME:2>\` - Normalized timestamps\n\n`
  markdown += `::: tip\n`
  markdown += `These snapshots represent the expected API response structure. Any changes to these structures will cause snapshot tests to fail, ensuring API stability.\n`
  markdown += `:::\n\n`

  // Group snapshots by test suite if possible
  const entries = Object.entries(snapshots)

  for (const [testName, data] of entries) {
    const formattedTitle = formatTestName(testName)

    markdown += `## ${formattedTitle}\n\n`
    markdown += '```json\n'
    markdown += data
    markdown += '\n```\n\n'
  }

  return markdown
}

/**
 * Main function to generate snapshot documentation
 */
function main() {
  const snapshotDir = join(__dirname, '../../backend/src/routes/__snapshots__')
  const outputDir = join(__dirname, '../docs/snapshots')

  // Create output directory if it doesn't exist
  try {
    mkdirSync(outputDir, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }

  // Find all .snap files
  const files = readdirSync(snapshotDir).filter(f => f.endsWith('.snap'))

  console.log(`Found ${files.length} snapshot files`)

  for (const file of files) {
    // Extract name from filename (e.g., "users.test.ts.snap" -> "users")
    const name = file.replace('.test.ts.snap', '')
    const filepath = join(snapshotDir, file)

    console.log(`Processing ${name}...`)

    try {
      const snapshots = parseSnapshotFile(filepath)
      const markdown = generateMarkdown(name, snapshots)

      const outputPath = join(outputDir, `${name}.md`)
      writeFileSync(outputPath, markdown, 'utf-8')

      console.log(`✓ Generated ${name}.md (${Object.keys(snapshots).length} snapshots)`)
    } catch (error) {
      console.error(`✗ Error processing ${name}:`, error)
    }
  }

  console.log('\\nSnapshot documentation generation complete!')
}

main()
