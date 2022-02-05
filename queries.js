const Pool = require('pg').Pool

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'inspector_object',
    password: 'password',
    port: 5432,
})

const getImages = (req, res) => {
    pool.query('SELECT * FROM images ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}

const getImageById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM images WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }

        if (results.rows.length > 0) {
            response.status(200).json(results.rows[0])
        } else {
            response.status(404).json({message: 'Image not found'})
        }
    })
}

const postImage = (request, response) => {
    const { name, label, isObjectDetectionEnabled } = request.body

    pool.query(
        'INSERT INTO images (name, label, object_detection_enabled) VALUES ($1, $2, $3) RETURNING id, name, label, object_detection_enabled', 
        [name, label, isObjectDetectionEnabled], 
        (error, results) => {
            if (error) {
                throw error
            }

            response.status(201).json(results.rows[0])
        }
    )
}

module.exports = {
    getImages,
    getImageById,
    postImage
}