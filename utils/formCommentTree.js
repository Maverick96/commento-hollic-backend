function formTree(rows) {
    const threads = [];
    rows.map(row => {
        row.dataValues.replies = [];
        if (row['parentId'] === 0) {
            threads.push(row);
        } else {
            let obj = threads[threads.length - 1];
            for (let i = 1; i < row.level - 1; i++) {
                obj = obj.dataValues.replies[obj.dataValues.replies.length - 1];
            }
            obj.dataValues.replies.push(row);
        }
    });
    return threads;
}

module.exports = formTree;