// models
const models = require('../../models');
const Comment = models.Comment;

// utils
const padZero = require('../../utils/padZero');

function createComment(req, res, next) {
    const payload = req.body;
    Comment.create(payload)
        .then(commentData => {
            const commentId = commentData.dataValues.commentId;
            const padCommentId = padZero(commentId);
            console.log("PAdd value ", padCommentId);
            const newPath = payload.path + padCommentId + '.';
            return Comment.update({
                path: newPath
            }, {
                    where: {
                        commentId
                    }
                })
        })
        .then(data => {
            res.json({
                success: true
            });
        })
        .catch(err => {
            next(err);
        });
}

module.exports = createComment;