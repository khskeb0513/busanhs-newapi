/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('community_users', {
		user_id: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(75),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		st_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		data: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'community_users',
		schema: 'dbo',
		timestamps: false
	});
};
