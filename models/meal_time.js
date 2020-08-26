/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('meal_time', {
		m_time: {
			type: DataTypes.STRING(8),
			allowNull: false
		},
		e_time: {
			type: DataTypes.STRING(8),
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'meal_time',
		schema: 'dbo',
		timestamps: false
	});
};
