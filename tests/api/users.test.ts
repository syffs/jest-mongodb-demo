import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '~/api'
import loaders from '~/loaders'

describe('stores-api', () => {

    beforeAll(async () => {
        await loaders()
        console.log("readyState:", mongoose.connection.readyState)
        await global.dbManager.provision()
    })
    afterAll(async () => {
        await global.dbManager.unprovision()
        await mongoose.connection.close()
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
