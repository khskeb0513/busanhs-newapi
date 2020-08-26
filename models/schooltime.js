/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('schooltime', {
		DayGubun: {
			type: DataTypes.STRING(1),
			allowNull: false,
			primaryKey: true
		},
		FirstINTime: {
			type: DataTypes.STRING(8),
			allowNull: true
		},
		SecondINTime: {
			type: DataTypes.STRING(8),
			allowNull: true
		},
		OutTime: {
			type: DataTypes.STRING(8),
			allowNull: true
		},
		DBTime: {
			type: DataTypes.STRING(8),
			allowNull: true
		},
		Bigo: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'schooltime',
		schema: 'dbo',
		timestamps: false
	});
};
