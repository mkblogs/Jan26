const express = require('express')
const router = express.Router()
const Story = require('../models/Story')


// @desc Show add page
// @route GET /stories/add
router.get('/add', (req, res) => {
    res.render('stories/add')
})

// @desc Process add form
// @route POST /stories
router.post('/', async (req, res) => {
    try {
       // req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/stories')

    } catch (err) {
        console.error(err)
        res.render('error/500')

    }
})

// @desc Show all stories
// @route GET /stories/add
router.get('/',  async (req, res) => {
    try {
        const stories = await Story.find().populate('user').sort({ createdAt: 'desc'}).lean()
        res.render('stories/index',{
            stories}) 
    } catch (err) {
        console.error(err)
        res.render('error/500')
        
    }
})

// @desc Show single story
// @route GET /stories/:id
router.get('/:id',  async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
        .populate('user')
        .lean()

        if(!story) {
            return res.render('error/404')
        }

        res.render('stories/show',{
            story
        })
    } catch (error) {
        console.error(err)
        res.render('error/404')
    }
})

// @desc Show edit page
// @route GET /stories/edit/:id
router.get('/edit/:id',  async (req, res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id
        }).lean()
    
        if (!story) {
            return res.render('errro/404')
        }
    
        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            res.render('stories/edit', {story,})
        }
    } catch (err) {
        console.error(err)
        return res.render('error/505')
    }
    
})

// @desc Update story
// @route PUT /stories/:id
router.put('/:id',  async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('errro/404')
        }
    
        if (story.user != req.user.id) {
            story = await Story.findOneAndUpdate({ _id: req.params.id}, {$push: {rep1: req.body}}, {
                new: true,
                runValidators: true
                })
    
            res.redirect('/welcome')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id}, req.body, {
                new: true,
                runValidators: true
                })
    
            res.redirect('/welcome')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/505')
    }

})

// @desc Update story
// @route PUT /stories/:id
router.put('/:id/response', async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('errro/404')
        }
    
        story = await Story.findOneAndUpdate({ _id: req.params.id}, {$push: {rep1: req.body}}, {
            new: true,
            runValidators: true
        })
       
        return  res.status(200).send("success");
        
    } catch (err) {
        console.error(err)
        return res.render('error/505')
    }

})


// @desc Delete story
// @route DELETE /stories/:id
router.delete('/:id',  async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id})
        res.redirect('/welcome')
    } catch (err) {
        console.error(err)
        return res.render('error/505')
    }
})

// @desc User stories 
// @route GET /stories/user/:userId
router.get('/user/:userId',  async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .lean()

        res.render('stories/index',{
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router