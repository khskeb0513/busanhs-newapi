/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('New_student', {
		st_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		class: {
			type: DataTypes.STRING(1),
			allowNull: true
		},
		ban: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		num: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		subject: {
			type: DataTypes.STRING(30),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'New_student',
		schema: 'dbo',
		timestamps: false
	});
};
