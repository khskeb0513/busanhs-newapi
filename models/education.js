/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('education', {
		st_id: {
			type: DataTypes.STRING(13),
			allowNull: false,
			primaryKey: true
		},
		edu_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		edu_st_date: {
			type: DataTypes.DATE,
			allowNull: false,
			primaryKey: true
		},
		edu_ed_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		edu_memo: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'education',
		schema: 'dbo',
		timestamps: false
	});
};
