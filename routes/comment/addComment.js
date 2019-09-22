// models
const models = require('../../models');
const Comment = models.Comment;

// utils
const padZero = require('../../utils/padZero');

function createComment(req, res, next) {
    const payload = req.body;
    payload['userId'] = req.authData.userId;
    payload['name'] = req.authData.name;
    let commentData = {};
    Comment.create(payload)
        .then(comment => {
            commentData = comment;
            const commentId = commentData.dataValues.commentId;
            const padCommentId = padZero(commentId);
            console.log("PAdd value ", padCommentId);
            const newPath = payload.path + padCommentId + '.';
            commentData.dataValues.path = newPath;
            commentData.dataValues.replies = [];
            return Comment.update({
                path: newPath
            }, {
                    where: {
                        commentId
                    }
                })
        })
        .then(data => {
            console.log("DATA!", data)
            res.json({
                success: true,
                data: commentData
            });
        })
        .catch(err => {
            next(err);
        });
}

module.exports = createComment;