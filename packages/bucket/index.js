import path from 'path'
import * as url from 'url'
import fs from 'node:fs/promises'

import Fastify from 'fastify'
import Static from '@fastify/static'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const fastify = Fastify({
	logger: true
})

fastify.register(Static, {
	root: path.join(__dirname),
	prefix: '/public/'
})



fastify.get('/health', async (req, reply) => {
	return { status: 'ok' }
})

fastify.get('/', async (req, reply) => {
	reply.header('Content-Type', 'application/json')
	try {
		const files = await fs.readdir(__dirname)
		return files.filter(file =>  parseInt(file) >= 0)
	} catch (err) {
		fastify.log.error(err)
		reply.status(500).send({ error: 'Failed to read directory' })
	}
})

fastify.listen({  host:'0.0.0.0', port: 5003 }, err => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
