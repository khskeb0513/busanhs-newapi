/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_regid', {
		seq: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		state: {
			type: DataTypes.STRING(1),
			allowNull: true
		},
		id: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		regid: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'app_regid',
		schema: 'dbo',
		timestamps: false
	});
};
