import supertest from 'supertest'

import config from '~/config'
import app from '~/api'
import loaders from '~/loaders'

describe('stores-api', () => {

    beforeAll(async () => {
        // console.log('uri:', process.env.MONGODB_URI)
        await loaders()
        await global.dbManager.provision()
    })
    afterAll(async () => {
        await global.dbManager.unprovision()
    })

    it('should return fetched user', async () => {
        const userId = 'usr_aLBqK5cNC4R30Zjf4zmQX4HS'
        const res = await supertest(app)
            .get(`/users/${userId}`)

        expect(res.status).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining({
                email: 'bar@foo.bar',
            })
        )
    })
})