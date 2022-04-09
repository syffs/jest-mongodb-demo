import supertest from 'supertest'

import app from '~/api'

describe('users-bis-api', () => {

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
