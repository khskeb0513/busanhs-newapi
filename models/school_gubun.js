/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('school_gubun', {
		s_name: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		s_code: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		sequelize,
		tableName: 'school_gubun',
		schema: 'dbo',
		timestamps: false
	});
};
