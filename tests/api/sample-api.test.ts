import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import supertest from 'supertest'

import app from '~/api'

const axiosMock = new AxiosMockAdapter(axios)

const {fetchMock} = (global as any)

describe('sample-api', () => {
    // it('should return fetchMock data', async () => {
    //     fetchMock.get('begin:https://api.sampleapis.com', (url, opts, req) => ({
    //         body: {
    //             "winery": "Ernesto Ruffo",
    //             "wine": "Amarone della Valpolicella Riserva N.V.",
    //             "rating": {
    //                 "average": "4.9",
    //                 "reviews": "75 ratings"
    //             },
    //             "location": "Italy\n·\nAmarone della Valpolicella",
    //             "image": "https://images.vivino.com/thumbs/nC9V6L2mQQSq0s-wZLcaxw_pb_x300.png",
    //             "id": 2
    //         },
    //         status: 200
    //     }))
    //     const res = await supertest(app)
    //         .get('/services/fetch')
    //
    //     expect(res.status).toEqual(200)
    //     expect(res.body).toEqual(
    //         expect.objectContaining({
    //             winery: 'Ernesto Ruffo'
    //         })
    //     )
    // })

    it('should return axiosMock data', async () => {
        // global.mockAxios.onGet(new RegExp('https://api\.wakam\.com/.*/getPrice'))
        axiosMock.onGet(new RegExp('https://api\.sampleapis\.com.*'))
            .reply(config => {
                return [200, {
                    "winery": "Ernesto Ruffo",
                    "wine": "Amarone della Valpolicella Riserva N.V.",
                    "rating": {
                        "average": "4.9",
                        "reviews": "75 ratings"
                    },
                    "location": "Italy\n·\nAmarone della Valpolicella",
                    "image": "https://images.vivino.com/thumbs/nC9V6L2mQQSq0s-wZLcaxw_pb_x300.png",
                    "id": 2
                }]
            })

        const res = await supertest(app)
            .get('/services/axios')

        expect(global.axiosMock.history.get.length).toBe(1)
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining({
                winery: 'Ernesto Ruffo'
            })
        )
    })
})
