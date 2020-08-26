/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('nocheckday', {
		noCheckDay: {
			type: DataTypes.DATE,
			allowNull: false,
			primaryKey: true
		},
		bigo: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		gubun: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'nocheckday',
		schema: 'dbo',
		timestamps: false
	});
};
