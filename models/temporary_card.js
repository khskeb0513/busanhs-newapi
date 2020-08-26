/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('temporary_card', {
		t_id: {
			type: DataTypes.STRING(6),
			allowNull: false,
			primaryKey: true
		},
		rf_num: {
			type: DataTypes.STRING(14),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'temporary_card',
		schema: 'dbo',
		timestamps: false
	});
};
