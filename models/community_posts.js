/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('community_posts', {
		no: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		writer: {
			type: DataTypes.STRING,
			allowNull: false
		},
		good: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		st_id: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		post_data: {
			type: DataTypes.STRING,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'community_posts',
		schema: 'dbo',
		timestamps: false
	});
};
