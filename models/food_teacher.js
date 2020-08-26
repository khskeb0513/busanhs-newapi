/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('food_teacher', {
		tc_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		tc_name: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		tc_cardnum: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'food_teacher',
		schema: 'dbo',
		timestamps: false
	});
};
