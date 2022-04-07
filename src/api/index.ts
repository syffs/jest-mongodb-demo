import express, {RequestHandler} from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'

import routes from './routes'
import {logger} from '~/loaders'

const app = express()

app.get('/status', (req, res) => {
    res.json({status: 'ok'}).status(200).end()
})

// The magic package that prevents frontend developers going nuts
// Alternate description:
// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors())

// Some sauce that always add since 2014
// "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
// Maybe not needed anymore ?
app.use(methodOverride())

// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json() as RequestHandler)

app.use(routes)

app.use('/', (req, res) => {
    logger.debug('catch-all(%s): got request %o', req.originalUrl, req.body)
    res.sendStatus(404)
})

export default app
