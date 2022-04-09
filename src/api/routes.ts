import axios from 'axios'
// import fetch from 'node-fetch'
import {Router} from 'express'
import {User} from '~/users/user.model'

const router = Router({mergeParams: true})

router.get('/users/:userId', async (req, res, next) => {
    const user = await User.findOne({id: req.params.userId}).lean()

    res.json(user)
})

// router.get('/services/fetch', async (req, res, next) => {
//     const result = await fetch('https://api.sampleapis.com/wines/reds').then(res => res.json())
//
//     res.json(result)
// })

const sampleApi = axios.create({
    baseURL: 'https://api.sampleapis.com/',
    headers: {
        'Content-Type': 'application/json',
    }
})
router.get('/services/axios', async (req, res, next) => {
    const result = await sampleApi.get('/wines/reds')

    res.json(result.data)
})

export default router
