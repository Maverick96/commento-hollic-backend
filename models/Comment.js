module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        commentId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    Comment.associate = function (models) {
        // associations can be defined here
        const User = models.User;
        User.hasMany(Comment, { foreignKey: 'userId', sourceKey: 'userId' });
    };
    return Comment;
};
