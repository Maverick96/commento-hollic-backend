const express = require('express');
const router = express.Router();

const list = require('./list');
const editComment = require('./editComment');
const create = require('./addComment');

router.get('/', list);
router.put('/edit', editComment);
router.post('/create', create);

module.exports = router;