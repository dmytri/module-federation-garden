#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'url'
import { join, basename } from 'path'
import fetch from 'node-fetch'
import FormData from 'form-data'

async function uploadAssets(
	pkgName: string,
	directoryPath: string,
	version: string
) {
	try {
		const directoryEntries = await readdir(directoryPath, {
			withFileTypes: true
		})

		const filePaths = directoryEntries
			.filter(entry => entry.isFile())
			.map(file => join(directoryPath, file.name))

		const formData = new FormData()

		for (const filePath of filePaths) {
			const fileName = basename(filePath)
			const fileBuffer = await readFile(filePath)
			formData.append(pkgName, fileBuffer, fileName)
		}

		const response = await fetch('http://localhost:5001', {
			method: 'POST',
			body: formData,
			headers: {
				...formData.getHeaders(),
				'x-version': version
			}
		})

		if (response.ok) {
			console.log('Files uploaded successfully')
		} else {
			console.error(`Error: ${response.status} - ${response.statusText}`)
		}
	} catch (error) {
		console.error('Error:', error.message)
	}
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const args = process.argv.slice(-2)

const [version, pkgName] = args

async function main() {
	await uploadAssets(
		pkgName,
		`${join(__dirname, '../../..')}/apps/${pkgName}/dist/assets`,
		version
	)
}
main()
