/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dtproperties', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		objectid: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		property: {
			type: DataTypes.STRING(64),
			allowNull: false,
			primaryKey: true
		},
		value: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		uvalue: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		lvalue: {
			type: DataTypes.BLOB,
			allowNull: true
		},
		version: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	}, {
		sequelize,
		tableName: 'dtproperties',
		schema: 'dbo',
		timestamps: false
	});
};
