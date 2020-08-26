/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('card_no_check', {
		job_date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'card_no_check',
		schema: 'dbo',
		timestamps: false
	});
};
