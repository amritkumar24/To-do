import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World! Server is running!');
})


export default router;