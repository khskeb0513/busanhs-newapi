/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('writedb', {
		writeDate: {
			type: DataTypes.STRING(8),
			allowNull: false,
			primaryKey: true
		},
		bigo: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'writedb',
		schema: 'dbo',
		timestamps: false
	});
};
