const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc Welcome
// @route GET /welcome

router.get('/', async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' }).populate('user').sort({ createdAt: 'desc'}).lean().limit(5)        
        const pstories = await Story.find({ status: 'private' }).populate('user').sort({ createdAt: 'desc'}).lean().limit(5)
        let today = new Date(); //
        today.setHours(0,0,0,0);
        const lstories = await Story.find({ status: 'public', createdAt: { $gte: today}
        }).populate('user').sort({ createdAt: 'desc'}).lean().limit(5)
        res.render('welcome',{
            stories, pstories, lstories}) 
    } catch (err) {
        console.error(err)
        res.render('error/500')
        
    }
})

module.exports = router