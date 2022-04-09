import axios from 'axios'
import Int32 from 'mongoose-int32'
import mongoose from 'mongoose'

import { connect, disconnect } from './db-connect'
import {provision} from '#/database'
import AxiosMockAdapter from 'axios-mock-adapter'

Int32.loadType(mongoose)

// const fetchMockJest = require('fetch-mock-jest')

// jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
// global.fetchMock = require('node-fetch')
// global.axiosMock = new AxiosMockAdapter(axios)

beforeAll(async () => {
    await connect()
    await provision()
    global.axiosMock = new AxiosMockAdapter(axios)
});

afterAll(async () => {
    // await unprovision()
    await disconnect()
})

afterEach(() => {
    // global.fetchMock.mockReset()
    global.axiosMock.reset()
})

