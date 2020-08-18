const fs = require('fs')
module.exports = {
    getList: async (req, res) => {
        try {
            const folders = fs.readdirSync('./albums')
            let data = []
            folders.forEach(file => {
                if (file !== 'placeholder') {
                    const folder = file.charAt(0).toUpperCase() + file.slice(1)
                    const files = fs.readdirSync(`./albums/${file}`)
                    files.forEach(i => {
                        data.push({
                            album: folder,
                            name: i,
                            path: `/albums/${folder}/${i}`,
                            raw: `http://localhost:8888/photos/${file}/${i}`
                        })
                    })
                }
            })
            res.json({
                message: 'OK',
                documents: data
            })
        } catch (err) {
            res.json({
                message: err.message
            })
        }
    },

    getFile: async (req, res) => {
        try {
            const { Album, FileName } = req.params
            const img = fs.readFileSync(`./albums/${Album}/${FileName}`)
            res.json({
                img
            })
        } catch (err) {
            res.json({
                message: err.message
            })
        }
    },

    upload: async (req, res) => {
        try {
            let data = []
            const album = req.body.album.toLowerCase()
            req.files.forEach(file => {
                data.push({
                    album: album,
                    name: file.filename,
                    path: file.path,
                    raw: `http://localhost:8888/photos/${album}/${file.filename}`
                })
            })
            res.json({
                message: 'OK',
                data
            })
        } catch (err) {
            res.json({
                message: err.message
            })
        }
    },

    delete: async (req, res) => {
        try {
            const { Album, FileName } = req.params
            fs.unlinkSync(`./albums/${Album}/${FileName}`)
            res.json({
                message: 'OK'
            })

        } catch (err) {
            res.json({
                message: err.message
            })
        }
    },

    deletes: async (req, res) => {
        try {
            req.body.forEach(data => {
                fs.unlinkSync(`./albums/${data.album}/${data.documents}`)
            })
            res.json({
                message: 'OK'
            })
        } catch (err) {
            res.json({
                message: err.message
            })
        }
    }
}