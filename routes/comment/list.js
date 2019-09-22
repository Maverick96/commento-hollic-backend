const models = require('../../models');
const Comment = models.Comment;
const formCommentTree = require('../../utils/formCommentTree');

function listComments(req, res, next) {

    Comment.findAll({
        order: [
            ['path']
        ]
    })
        .then(comments => {
            // console.log("Comments!", comments);
            const result = formCommentTree(comments);
            res.json({
                success: true,
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}

module.exports = listComments;