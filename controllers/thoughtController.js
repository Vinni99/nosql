const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one thought by id

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => {
            !dbThoughtData ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create thought

    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // update thought by id

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(user)
        )
        .catch(err => res.status(400).json(err));
    },

    // delete thought

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then ((dbThoughtData) => 
            !dbThoughtData ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(dbThoughtData)

       )
        .catch(err => res.status(400).json(err));
    },

    // add reaction

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) =>
            !dbThoughtData ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(dbThoughtData)
        )
        .catch(err => res.status(400).json(err));
    },

    // delete reaction

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) =>
            !dbThoughtData ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(dbThoughtData)
        )
        .catch(err => res.status(400).json(err));
    }
};
