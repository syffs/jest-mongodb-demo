import 'tsconfig-paths/register'

import app from '~/api'
import config from '~/config'
import loaders, {logger} from '~/loaders'

async function main() {
    await loaders()

    app.listen(config.port, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
                    ${app.get('env')} mode
      ################################################
    `)
    })
}

main().catch(err => logger.error('start-server: exception caught in extremis: ', err))



