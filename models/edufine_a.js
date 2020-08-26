/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('edufine_a', {
		key_num: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		st_id: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
		edu_sel: {
			type: DataTypes.STRING(1),
			allowNull: true
		},
		money_sel: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		two_sel: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		u_money: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'edufine_a',
		schema: 'dbo',
		timestamps: false
	});
};
