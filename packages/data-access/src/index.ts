import Fastify, { FastifyRequest, FastifyReply } from 'fastify'
import { postgraphile, PostGraphileResponseFastify3, PostGraphileResponse } from 'postgraphile'

const database = process.env.PGDATABASE
const username = process.env.PGUSER
const password = process.env.PGPASSWORD

const middleware = postgraphile(`postgres://${username}:${password}@db/${database}`, `public`, {
	subscriptions: true,
	watchPg: true,
	dynamicJson: true,
	ignoreRBAC: false,
	showErrorStack: 'json',
	graphiql: true,
	enhanceGraphiql: true
})

const fastify = Fastify({ logger: true })

const convertHandler = (handler: (res: PostGraphileResponse) => Promise<void>) => (
  request: FastifyRequest,
  reply: FastifyReply,
) =>
	handler(new PostGraphileResponseFastify3(request, reply))

fastify.options(
	middleware.graphqlRoute,
	convertHandler(middleware.graphqlRouteHandler)
)

fastify.post(
	middleware.graphqlRoute,
	convertHandler(middleware.graphqlRouteHandler)
)

if (middleware.options.graphiql) {
	if (middleware.graphiqlRouteHandler) {
		fastify.head(
			middleware.graphiqlRoute,
			convertHandler(middleware.graphiqlRouteHandler)
		)
		fastify.get(
			middleware.graphiqlRoute,
			convertHandler(middleware.graphiqlRouteHandler)
		)
	}
}

if (middleware.options.watchPg) {
	if (middleware.eventStreamRouteHandler) {
		fastify.options(
			middleware.eventStreamRoute,
			convertHandler(middleware.eventStreamRouteHandler)
		)
		fastify.get(
			middleware.eventStreamRoute,
			convertHandler(middleware.eventStreamRouteHandler)
		)
	}
}

fastify.get('/health', async (req, reply) => {
	return { status: 'ok' }
})

fastify.listen({ host: '0.0.0.0', port: 5000 }, (err, address) => {
	if (err) {
		fastify.log.error(String(err))
		process.exit(1)
	}
	console.log(
		`PostGraphiQL available at ${address}${middleware.graphiqlRoute}`
	)
})
