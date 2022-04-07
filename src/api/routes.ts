import {Router} from 'express'
import {User} from '~/users/user.model'

const router = Router({mergeParams: true})

router.get('/users/:userId', async (req, res, next) => {
    const user = await User.findOne({id: req.params.userId}).lean()

    res.json(user)
})

export default router
