const router = require('express').Router()
const photo = require('./controllers/photo')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(`./albums/${req.body.album}`)) fs.mkdir(`./albums/${req.body.album}`)
        cb(null, `./albums/${req.body.album}`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const fs = require('fs-extra')

const upload = multer({ storage })
router.get('/health', (req, res) => {
    res.json({
        message: 'OK'
    })
})

router.get('/photos/list', photo.getList)
router.post('/photos', upload.array('documents'), photo.upload)
router.delete('/photos', photo.deletes)
router.get('/photos/:Album/:FileName', photo.getFile)
router.delete('/photos/:Album/:FileName', photo.delete)

module.exports = router