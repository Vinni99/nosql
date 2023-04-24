const router = require('express').Router();


const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');


router.route('/').get(getAllThoughts).post(createThought);


router.route('/:id').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);


router.route('/:thoughtId/reactions').post(addReaction);


router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

