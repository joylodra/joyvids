export default {
    name: 'postedBy',
    title: 'Posted By',
    type: 'reference',
    to: [{ type: 'user' }],
    fields: [
        {
            name: 'postedBy',
            title: 'Posted By',
            type: 'postedBy '
        },
        {
            name: 'comment',
            title: 'Comment',
            type: 'string'
        },
    ]
};