/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('discip_code', {
		key_num: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		d_text: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		st_point: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		ed_point: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'discip_code',
		schema: 'dbo',
		timestamps: false
	});
};
