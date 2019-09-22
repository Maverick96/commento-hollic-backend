const models = require('../../models');
const Comment = models.Comment;

function editComment(req, res, next) {
    const commentId = req.body.commentId;
    const text = req.body.text;
    const userId = req.authData.userId;
    Comment.update({
        text
    }, {
            where: {
                commentId,
                userId
            }
        })
        .then(commentData => {
            console.log("Comment Data", commentData);
            if (commentData[0]) {
                res.json({
                    success: true
                });
            } else {
                next(new Error("Invalid Comment ID"))
            }
        })
        .catch(err => {
            next(err);
        })
}

module.exports = editComment;