/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('meal_exit', {
		st_id: {
			type: DataTypes.STRING(26),
			allowNull: false,
			primaryKey: true
		},
		m_date: {
			type: DataTypes.DATE,
			allowNull: false,
			primaryKey: true
		},
		m_time: {
			type: DataTypes.STRING(6),
			allowNull: false
		},
		state: {
			type: DataTypes.STRING(1),
			allowNull: false,
			primaryKey: true
		}
	}, {
		sequelize,
		tableName: 'meal_exit',
		schema: 'dbo',
		timestamps: false
	});
};
