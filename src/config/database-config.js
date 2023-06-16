
// Configuração do bando de dados no ambiente de teste
// export const dbConfig = {
//   dialect: 'sqlite',
//   storage: 'database.sqlite',
//   define: {
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true
//   }
// };

/*
// Configuração do banco de dados no ambiente de desenvolvimento
export const dbConfig = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'scv-backend-node-sequelize',
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true
  }
};
*/

// Configuração do banco de dados no ambiente de produção
export const dbConfig = {
  dialect: "postgres",
  host: "dpg-ci660v5ph6ekv7sl170g-a.oregon-postgres.render.com",
  username: "sclv_lava_jato_user",
  password: "AyX47JhdSq5MObqoNGreG2Ydgw7Tedir",
  database: "sclv_lava_jato",
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  },
  dialectOptions: {
    ssl: true,
  },
};