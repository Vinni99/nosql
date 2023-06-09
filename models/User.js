const { Schema, model, Types } = require('mongoose');

// Create a schema for the user

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,    
            ref: 'User',
        },
    ],
},  
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);


// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the User model using the UserSchema

const User = model('User', userSchema);

// Export the User model

module.exports = User;
