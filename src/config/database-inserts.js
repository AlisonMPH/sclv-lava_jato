import Sequelize from 'sequelize';
import { dbConfig } from "../config/database-config.js";

import { Filial } from '../models/Filial.js';
import { Cliente } from '../models/Cliente.js';
import { Funcionario } from '../models/Funcionario.js';
import { Veiculo } from '../models/Veiculo.js';
import { TipoServico } from '../models/TipoServico.js';
import { AgendamentoServico } from '../models/AgendamentoServico.js';
import { FinalizacaoServico } from '../models/FinalizacaoServico.js';
import { Status } from '../models/Status.js';
import { FormaPagamento } from '../models/FormaPagamento.js';
import * as fs from 'fs';

//databaseInserts(); // comentar quando estiver em ambiente de produção (não criar tabelas e não inserir registros de teste)

function databaseInserts() {

    const sequelize = new Sequelize(dbConfig);

    Filial.init(sequelize);
    Cliente.init(sequelize);
    Funcionario.init(sequelize);
    Veiculo.init(sequelize);
    TipoServico.init(sequelize);
    AgendamentoServico.init(sequelize);
    FinalizacaoServico.init(sequelize);
    FormaPagamento.init(sequelize);
    Status.init(sequelize);

    Funcionario.associate(sequelize.models);
    Veiculo.associate(sequelize.models);
    AgendamentoServico.associate(sequelize.models);
    FinalizacaoServico.associate(sequelize.models);
    
    (async () => {
        await sequelize.sync({ force: true });

    })();
}    

export default databaseInserts;