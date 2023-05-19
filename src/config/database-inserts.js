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

databaseInserts(); // comentar quando estiver em ambiente de produção (não criar tabelas e não inserir registros de teste)

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

        //CLIENTE
        const cliente1 = await Cliente.create({
            NOME: "Camila Silva",
            CPF: "123.456.789-04",
            TELEFONE: "(11) 1111-1111",
            EMAIL: "camila.silva@gmail.com",
            QTD_LAVAGEM: 0,
            SENHA: "senha13",
            RUA: "Rua dos Flores",
            NUMERO: 100,
            CIDADE: "São Paulo",
            BAIRRO: "Vila Olímpia",
            DATA_NASCIMENTO: "1995-02-10"
            });
            
            const cliente2 = await Cliente.create({
            NOME: "Paulo Oliveira",
            CPF: "987.654.321-03",
            TELEFONE: "(11) 2222-2222",
            EMAIL: "paulo.oliveira@gmail.com",
            QTD_LAVAGEM: 2,
            SENHA: "senha1",
            RUA: "Rua das Palmeiras",
            NUMERO: 200,
            CIDADE: "São Paulo",
            BAIRRO: "Moema",
            DATA_NASCIMENTO: "1987-05-20"
            });
            
            const cliente3 = await Cliente.create({
            NOME: "Ana Souza",
            CPF: "789.123.456-02",
            TELEFONE: "(11) 3333-3333",
            EMAIL: "ana.souza@gmail.com",
            QTD_LAVAGEM: 5,
            SENHA: "senha1",
            RUA: "Rua dos Pinheiros",
            NUMERO: 300,
            CIDADE: "São Paulo",
            BAIRRO: "Pinheiros",
            DATA_NASCIMENTO: "1990-11-15"
            });
            
            const cliente4 = await Cliente.create({
            NOME: "Lucas Santos",
            CPF: "456.789.123-00",
            TELEFONE: "(11) 4444-4444",
            EMAIL: "lucas.santos@gmail.com",
            QTD_LAVAGEM: 1,
            SENHA: "123456",
            RUA: "Rua das Amendoeiras",
            NUMERO: 400,
            CIDADE: "São Paulo",
            BAIRRO: "Morumbi",
            DATA_NASCIMENTO: "1985-07-25"
            });
            
            const cliente5 = await Cliente.create({
            NOME: "Juliana Almeida",
            CPF: "654.321.987-01",
            TELEFONE: "(11) 5555-5555",
            EMAIL: "juliana.almeida@gmail.com",
            QTD_LAVAGEM: 3,
            SENHA: "senh567",
            RUA: "Rua das Azaleias",
            NUMERO: 500,
            CIDADE: "São Paulo",
            BAIRRO: "Jardins",
            DATA_NASCIMENTO: "1992-03-02"
            });
            
            const cliente6 = await Cliente.create({
              NOME: "Alison Mozer",
              CPF: "149.094.167-30",
              TELEFONE: "(11) 5555-5555",
              EMAIL: "alison.mozer@gmail.com",
              QTD_LAVAGEM: 3,
              SENHA: "12345678",
              RUA: "Rua das Azaleias",
              NUMERO: 500,
              CIDADE: "São Paulo",
              BAIRRO: "Jardins",
              DATA_NASCIMENTO: "2001-06-11"
              });
            
            //FILIAL
            const filial1 = await Filial.create({
                NOME: "Filial A",
                LIMITE_DIARIO: 1000,
                RUA: "Rua A",
                BAIRRO: "Bairro A",
                CIDADE: "Cidade A",
                NUMERO: 123,
                CNPJ: "12.345.678/0001-90"
              });
              
              const filial2 = await Filial.create({
                NOME: "Filial B",
                LIMITE_DIARIO: 2000,
                RUA: "Rua B",
                BAIRRO: "Bairro B",
                CIDADE: "Cidade B",
                NUMERO: 456,
                CNPJ: "98.765.432/0001-21"
              });
              
              const filial3 = await Filial.create({
                NOME: "Filial C",
                LIMITE_DIARIO: 3000,
                RUA: "Rua C",
                BAIRRO: "Bairro C",
                CIDADE: "Cidade C",
                NUMERO: 789,
                CNPJ: "23.456.789/0001-54"
              });
              //TIPOSERVICO
                const lavagemSimples = await TipoServico.create({ NOME: "Lavagem Simples", PRECO: 30.00, DESCRICAO: "Lavagem com água, sabão e secagem com pano.", TEMPO_MEDIO: 30 });
                const lavagemCompleta = await TipoServico.create({ NOME: "Lavagem Completa", PRECO: 60.00, DESCRICAO: "Lavagem completa com água, sabão, cera e secagem com pano.", TEMPO_MEDIO: 60 });
                const limpezaInternaNivel1 = await TipoServico.create({ NOME: "Limpeza Interna Nível 1", PRECO: 50.00, DESCRICAO: "Limpeza interna básica do veículo, incluindo bancos e tapetes.", TEMPO_MEDIO: 60 });
                const limpezaInternaNivel2 = await TipoServico.create({ NOME: "Limpeza Interna Nível 2", PRECO: 80.00, DESCRICAO: "Limpeza interna completa do veículo, incluindo bancos, tapetes e painel.", TEMPO_MEDIO: 120 });
              //FUNCIONARIO
              const funcionario1 = await Funcionario.create({
                NOME: 'João Silva',
                CPF: '123.456.789-00',
                TELEFONE: '(31) 99999-9999',
                EMAIL: 'joao.silva@example.com',
                SENHA: '123456',
                RUA: 'Rua dos Funcionários',
                NUMERO: 123,
                CIDADE: 'Belo Horizonte',
                BAIRRO: 'Savassi',
                DATA_NASCIMENTO: '1990-01-01',
                IDFILIAL: 1 // id da filial previamente cadastrada
              });
              const funcionario2 = await Funcionario.create({
                NOME: 'Maria Souza',
                CPF: '987.654.321-00',
                TELEFONE: '(31) 88888-8888',
                EMAIL: 'maria.souza@example.com',
                SENHA: 'abcdef',
                RUA: 'Rua dos Trabalhadores',
                NUMERO: 456,
                CIDADE: 'Contagem',
                BAIRRO: 'Centro',
                DATA_NASCIMENTO: '1985-03-15',
                IDFILIAL: 2 // id da filial previamente cadastrada
              });
              const funcionario3 = Funcionario.create({
                NOME: "Ana Silva",
                CPF: "123.456.789-00",
                TELEFONE: "(11) 98765-4321",
                EMAIL: "ana.silva@example.com",
                SENHA: "minhasenha",
                RUA: "Rua das Flores",
                NUMERO: 123,
                CIDADE: "São Paulo",
                BAIRRO: "Jardim Paulista",
                DATA_NASCIMENTO: "1990-05-10",
                IDFILIAL: 1 // assumindo que a filial de ID 1 já foi cadastrada anteriormente
              });
              
              const funcionario4 = Funcionario.create({
                NOME: "João Santos",
                CPF: "987.654.321-00",
                TELEFONE: "(21) 99876-5432",
                EMAIL: "joao.santos@example.com",
                SENHA: "outrasenha",
                RUA: "Av. Brasil",
                NUMERO: 456,
                CIDADE: "Rio de Janeiro",
                BAIRRO: "Copacabana",
                DATA_NASCIMENTO: "1995-02-15",
                IDFILIAL: 2 // assumindo que a filial de ID 2 já foi cadastrada anteriormente
              });
              
              const funcionario5 = Funcionario.create({
                NOME: "Pedro Oliveira",
                CPF: "111.222.333-44",
                TELEFONE: "(81) 98765-4321",
                EMAIL: "pedro.oliveira@example.com",
                SENHA: "senha123",
                RUA: "Rua da Paz",
                NUMERO: 789,
                CIDADE: "Recife",
                BAIRRO: "Boa Viagem",
                DATA_NASCIMENTO: "1988-09-23",
                IDFILIAL: 3 // assumindo que a filial de ID 3 já foi cadastrada anteriormente
              });
              
              const funcionario6 = Funcionario.create({
                NOME: "Marina Oliveira",
                CPF: "222.333.444-55",
                TELEFONE: "(12) 3456-7890",
                EMAIL: "marina.oliveira@example.com",
                SENHA: "outrasenha",
                RUA: "Rua dos Girassóis",
                NUMERO: 456,
                CIDADE: "Taubaté",
                BAIRRO: "Jardim das Nações",
                DATA_NASCIMENTO: "1992-11-30",
                IDFILIAL: 2 // assumindo que a filial de ID 4 já foi cadastrada anteriormente
              });
              
              const funcionario7 = Funcionario.create({
                NOME: "Lucas Souza",
                CPF: "444.555.666-77",
                TELEFONE: "(31) 98765-4321",
                EMAIL: "lucas.souza@example.com",
                SENHA: "minhasenha",
                RUA: "Rua das Palmeiras",
                NUMERO: 789,
                CIDADE: "Belo Horizonte",
                BAIRRO: "Savassi",
                DATA_NASCIMENTO: "1994-04-17",
                IDFILIAL: 3 // assumindo que a filial de ID 5 já foi cadastrada anteriormente
              });
              
              const funcionario8 = Funcionario.create({
                NOME: "Alison Mozer",
                CPF: "149.094.167-30",
                TELEFONE: "(31) 98765-4321",
                EMAIL: "alison.mozer@example.com",
                SENHA: "12345678",
                RUA: "Rua das Palmeiras",
                NUMERO: 789,
                CIDADE: "Belo Horizonte",
                BAIRRO: "Savassi",
                DATA_NASCIMENTO: "2001-06-11",
                IDFILIAL: 3 // assumindo que a filial de ID 5 já foi cadastrada anteriormente
              });
              //VEICULO
                const veiculo1 = Veiculo.create({
                PLACA: "ABC1234",
                MARCA: "Fiat",
                MODELO: "Uno",
                COR: "Azul",
                ANO: 2021,
                IDCLIENTE: 1
                });
                const veiculo2 = Veiculo.create({
                PLACA: "DEF5678",
                MARCA: "Volkswagen",
                MODELO: "Gol",
                COR: "Preto",
                ANO: 2018,
                IDCLIENTE: 2
                });
                const veiculo3 = Veiculo.create({
                PLACA: "GHI9101",
                MARCA: "Ford",
                MODELO: "Fiesta",
                COR: "Prata",
                ANO: 2020,
                IDCLIENTE: 1
                });
                const veiculo4 = Veiculo.create({
                PLACA: "JKL2345",
                MARCA: "Chevrolet",
                MODELO: "Onix",
                COR: "Vermelho",
                ANO: 2019,
                IDCLIENTE: 3
                });
                const veiculo5 = Veiculo.create({
                PLACA: "MNO6789",
                MARCA: "Renault",
                MODELO: "Sandero",
                COR: "Branco",
                ANO: 2022,
                IDCLIENTE: 2
                });
                const veiculo6 = Veiculo.create({
                PLACA: "ABC6789",
                MARCA: "Volkswagen",
                MODELO: "Parati",
                COR: "Prata",
                ANO: 2010,
                IDCLIENTE: 6
                });
                //STATUS
                const status1 = Status.create({
                  STATUS: "AGENDADO"
                })
                const status2 = Status.create({
                  STATUS: "PAGO"
                })
                const status3 = Status.create({
                  STATUS: "FINALIZADO"
                })
                //FORMA_PAGAMENTO
                const FormaPagamento1 = FormaPagamento.create({
                  FORMA_PAG	: "DINHEIRO"
                })
                const FormaPagamento2 = FormaPagamento.create({
                  FORMA_PAG	: "CARTAO"
                })
                
    })();
}    

export default databaseInserts;