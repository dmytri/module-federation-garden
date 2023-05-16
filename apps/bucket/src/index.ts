import { join } from 'path'
import * as url from 'url'
import fs from 'node:fs/promises'

import Fastify, { FastifyRequest } from 'fastify'
import Static from '@fastify/static'
import { fsa } from '@chunkd/fs'
import multer from 'fastify-multer'

import { File } from 'fastify-multer/lib/interfaces'
import { request } from 'http'

declare module 'fastify' {
	export interface FastifyRequest {
		files: File[]
	}
}

interface RouteParameters {
	appName: string
}

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const fastify = Fastify({
	logger: true
})

const upload = multer()

fastify.register(multer.contentParser)

fastify.register(Static, {
	root: join(__dirname, '../'),
	prefix: '/public/'
})

async function writeFiles(args: {
	fieldname: string
	originalname: string
	buffer: Buffer
	version: string | string[]
}) {
	const { fieldname, originalname, buffer, version } = args
	await fsa.write(
		`${join(__dirname, '../')}/${fieldname}/${version}/${originalname}`,
		buffer
	)
	return 'ok'
}

fastify.get('/health', async (req, reply) => {
	return { status: 'ok' }
})

fastify.post('/', { preHandler: upload.any() }, async (req, reply) => {
	const files = req.files
	const version = req.headers['x-version'] || '1.0.0'

	for (const object of files) {
		const { fieldname, buffer, originalname } = object
		if (!buffer) throw new Error('Missing data')
		await writeFiles({ fieldname, originalname, buffer, version })
	}
	return { status: 'ok' }
})

fastify.get(
	'/:appName',
	async (req: FastifyRequest<{ Params: RouteParameters }>, reply) => {
		reply.header('Content-Type', 'application/json')
		try {
			const files = await fs.readdir(
				`${join(__dirname, '../')}${req.params.appName}`
			)
			return files.filter(file => parseInt(file) >= 0)
		} catch (err) {
			fastify.log.error(err)
			reply.status(500).send({ error: 'Failed to read directory' })
		}
	}
)

fastify.listen({ host: '0.0.0.0', port: 5001 }, err => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
