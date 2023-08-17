const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'recipe',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4, // especifica un UUID generado automaticamente
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			summary: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			healthScore: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			steps: {
				type: DataTypes.ARRAY(DataTypes.JSONB),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};

