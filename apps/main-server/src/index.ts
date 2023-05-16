import Fastify, { FastifyRequest } from 'fastify'
import semver from 'semver'
import got from 'got'

interface QueryParameters {
	version?: string
}

interface RouteParameters { 
	file: string
}

const fastify = Fastify({
	logger: true
})

function findMatchingVersion(semverRange:string, availableVersions: string[]) {
	if (!semver.validRange(semverRange)) {
		throw new Error('Invalid semver range')
	}

	const matchingVersions = availableVersions.filter(version =>
		semver.satisfies(version, semverRange)
	)

	return matchingVersions.length > 0
		? semver.maxSatisfying(matchingVersions, semverRange)
		: null
}

async function getAvailableVersions(): Promise<string[]> {
	try {
		return await got.get(`http://localhost:5001`).json()
	} catch (error) {
		console.log('error in request to localhost versions', error)
		return []
	}
}

let version = ''

fastify.get('/:file', async function (request: FastifyRequest <{Querystring: QueryParameters; Params: RouteParameters}>, reply) {
	reply.header('Access-Control-Allow-Origin', '*')
	reply.header('Content-Type', 'application/javascript; charset=utf-8')

	if (request.query.version === undefined) {
		return await got
			.get(
				`http://localhost:5001/public/${version}/${request.params.file}`
			)
			.text()
	}

	const versions = await getAvailableVersions() || []

	const match = findMatchingVersion(request.query.version, versions) || ''

	version = match

	const data = await got
		.get(
			`http://localhost:5001/public/${version}/${request.params.file}`
		)
		.text()

	return data
})

fastify.get('/health', async (req, reply) => {
	return { status: 'ok' }
})

fastify.listen({ host: '0.0.0.0', port: 5003 }, err => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
