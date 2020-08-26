/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subject', {
		class: {
			type: DataTypes.CHAR(1),
			allowNull: true
		},
		subject: {
			type: DataTypes.STRING(30),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'subject',
		schema: 'dbo',
		timestamps: false
	});
};
