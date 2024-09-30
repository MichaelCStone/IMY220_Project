// api.js
import express from 'express';

const router = express.Router();

// Get all songs
router.get('/songs', async (req, res) => {
    const songsCollection = req.app.locals.songsCollection;
    try {
        const songs = await songsCollection.find({}).toArray();
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create a new song
// router.post('/songs', async (req, res) => {
//     const songsCollection = req.app.locals.songsCollection;
//     try {
//         const newSong = req.body;
//         const result = await songsCollection.insertOne(newSong);
//         res.status(201).json(result.ops[0]);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// Export the router
export default router;