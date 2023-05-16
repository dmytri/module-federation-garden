import Fastify from 'fastify'

const fastify = Fastify({
	logger: true
})

fastify.get('/health', async (req, reply) => {
	return { status: 'ok' }
})

fastify.listen({ host: '0.0.0.0', port: 5005 }, err => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})

