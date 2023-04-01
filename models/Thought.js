const {  Schema, model, Types } = require('mongoose');


// Create a schema for the thought model

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                // set custom id to avoid confusion with parent thought _id
                reactionId: {
                    type: Schema.Types.ObjectId,
                    default: () => new Types.ObjectId()
                },
                reactionBody: {
                    type: String,
                    required: true,
                    maxlength: 280
                },
                username: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (createdAtVal) => dateFormat(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of reactions on retrieval

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;