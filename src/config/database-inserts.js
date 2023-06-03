import { Sequelize } from 'sequelize';
import { dbConfig } from "../config/database-config.js";

import { Filial } from '../models/Filial.js';
import { Cliente } from '../models/Cliente.js';
import { Funcionario } from '../models/Funcionario.js';
import { Veiculo } from '../models/Veiculo.js';
import { TipoServico } from '../models/TipoServico.js';
import { AgendamentoServico } from '../models/AgendamentoServico.js';
import { Finalizacoes } from '../models/Finalizacoes.js';
import { Status } from '../models/Status.js';
import { FormaPagamento } from '../models/FormaPagamento.js';
import * as fs from 'fs';

const sequelize = new Sequelize(dbConfig);

Filial.init(sequelize);
Cliente.init(sequelize);
Funcionario.init(sequelize);
Veiculo.init(sequelize);
TipoServico.init(sequelize);
AgendamentoServico.init(sequelize);
Finalizacoes.init(sequelize);
FormaPagamento.init(sequelize);
Status.init(sequelize);

Funcionario.associate(sequelize.models);
Veiculo.associate(sequelize.models);
AgendamentoServico.associate(sequelize.models);
Finalizacoes.associate(sequelize.models);

//databaseInserts(); // comentar quando estiver em ambiente de produção (não criar tabelas e não inserir registros de teste)

function databaseInserts() {
  (async () => {
    await sequelize.sync({ force: true });

    //CLIENTE
    const cliente1 = await Cliente.create({
      nome: "Camila Silva",
      cpf: "123.456.789-00",
      telefone: "(11) 1111-1111",
      email: "camila.silva@gmail.com",
      qtd_lavagem: 0,
      senha: "senha13",
      rua: "rua dos Flores",
      numero: 100,
      cidade: "São Paulo",
      bairro: "Vila Olímpia",
      data_nascimento: "1995-02-10"
    });

    const cliente2 = await Cliente.create({
      nome: "Paulo Oliveira",
      cpf: "987.654.321-00",
      telefone: "(11) 2222-2222",
      email: "paulo.oliveira@gmail.com",
      qtd_lavagem: 2,
      senha: "senha1",
      rua: "rua das Palmeiras",
      numero: 200,
      cidade: "São Paulo",
      bairro: "Moema",
      data_nascimento: "1987-05-20"
    });

    const cliente3 = await Cliente.create({
      nome: "Ana Souza",
      cpf: "789.123.456-00",
      telefone: "(11) 3333-3333",
      email: "ana.souza@gmail.com",
      qtd_lavagem: 5,
      senha: "senha1",
      rua: "rua dos Pinheiros",
      numero: 300,
      cidade: "São Paulo",
      bairro: "Pinheiros",
      data_nascimento: "1990-11-15"
    });

    const cliente4 = await Cliente.create({
      nome: "Lucas Santos",
      cpf: "444.555.666-77",
      telefone: "(11) 4444-4444",
      email: "lucas.santos@gmail.com",
      qtd_lavagem: 1,
      senha: "123456",
      rua: "rua das Amendoeiras",
      numero: 400,
      cidade: "São Paulo",
      bairro: "Morumbi",
      data_nascimento: "1985-07-25"
    });

    const cliente5 = await Cliente.create({
      nome: "Juliana Almeida",
      cpf: "654.321.987-00",
      telefone: "(11) 5555-5555",
      email: "juliana.almeida@gmail.com",
      qtd_lavagem: 3,
      senha: "senh567",
      rua: "rua das Azaleias",
      numero: 500,
      cidade: "São Paulo",
      bairro: "Jardins",
      data_nascimento: "1992-03-02"
    });

    //FILIAL
    const filial1 = await Filial.create({
      nome: "Filial A",
      limite_diario: 1000,
      rua: "rua A",
      bairro: "bairro A",
      cidade: "cidade A",
      numero: 123,
      cnpj: "12.345.678/0001-90"
    });

    const filial2 = await Filial.create({
      nome: "Filial B",
      limite_diario: 2000,
      rua: "rua B",
      bairro: "bairro B",
      cidade: "cidade B",
      numero: 456,
      cnpj: "98.765.432/0001-21"
    });

    const filial3 = await Filial.create({
      nome: "Filial C",
      limite_diario: 3000,
      rua: "rua C",
      bairro: "bairro C",
      cidade: "cidade C",
      numero: 789,
      cnpj: "23.456.789/0001-54"
    });
    //TIPOSERVICO
    const lavagemSimples = await TipoServico.create({ nome: "Lavagem Simples", preco: 30.00, descricao: "Lavagem com água, sabão e secagem com pano.", tempo_medio: 30 });
    const lavagemCompleta = await TipoServico.create({ nome: "Lavagem Completa", preco: 60.00, descricao: "Lavagem completa com água, sabão, cera e secagem com pano.", tempo_medio: 60 });
    const limpezaInternaNivel1 = await TipoServico.create({ nome: "Limpeza Interna Nível 1", preco: 50.00, descricao: "Limpeza interna básica do veículo, incluindo bancos e tapetes.", tempo_medio: 60 });
    const limpezaInternaNivel2 = await TipoServico.create({ nome: "Limpeza Interna Nível 2", preco: 80.00, descricao: "Limpeza interna completa do veículo, incluindo bancos, tapetes e painel.", tempo_medio: 120 });
    //FUNCIONARIO
    const funcionario1 = await Funcionario.create({
      nome: 'João Silva',
      cpf: '123.456.789-00',
      telefone: '(31) 99999-9999',
      email: 'joao.silva@example.com',
      senha: '123456',
      rua: 'rua dos Funcionários',
      numero: 123,
      cidade: 'Belo Horizonte',
      bairro: 'Savassi',
      data_nascimento: '1990-01-01',
      idfilial: 1 // id da filial previamente cadastrada
    });
    const funcionario2 = await Funcionario.create({
      nome: 'Maria Souza',
      cpf: '987.654.321-00',
      telefone: '(31) 88888-8888',
      email: 'maria.souza@example.com',
      senha: 'abcdef',
      rua: 'rua dos Trabalhadores',
      numero: 456,
      cidade: 'Contagem',
      bairro: 'Centro',
      data_nascimento: '1985-03-15',
      idfilial: 2 // id da filial previamente cadastrada
    });
    const funcionario3 = Funcionario.create({
      nome: "Ana Silva",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      email: "ana.silva@example.com",
      senha: "minhasenha",
      rua: "rua das Flores",
      numero: 123,
      cidade: "São Paulo",
      bairro: "Jardim Paulista",
      data_nascimento: "1990-05-10",
      idfilial: 1 // assumindo que a filial de ID 1 já foi cadastrada anteriormente
    });

    const funcionario4 = Funcionario.create({
      nome: "João Santos",
      cpf: "987.654.321-00",
      telefone: "(21) 99876-5432",
      email: "joao.santos@example.com",
      senha: "outrasenha",
      rua: "Av. Brasil",
      numero: 456,
      cidade: "Rio de Janeiro",
      bairro: "Copacabana",
      data_nascimento: "1995-02-15",
      idfilial: 2 // assumindo que a filial de ID 2 já foi cadastrada anteriormente
    });

    const funcionario5 = Funcionario.create({
      nome: "Pedro Oliveira",
      cpf: "111.222.333-44",
      telefone: "(81) 98765-4321",
      email: "pedro.oliveira@example.com",
      senha: "senha123",
      rua: "rua da Paz",
      numero: 789,
      cidade: "Recife",
      bairro: "Boa Viagem",
      data_nascimento: "1988-09-23",
      idfilial: 3 // assumindo que a filial de ID 3 já foi cadastrada anteriormente
    });

    const funcionario6 = Funcionario.create({
      nome: "Marina Oliveira",
      cpf: "222.333.444-55",
      telefone: "(12) 3456-7890",
      email: "marina.oliveira@example.com",
      senha: "outrasenha",
      rua: "rua dos Girassóis",
      numero: 456,
      cidade: "Taubaté",
      bairro: "Jardim das Nações",
      data_nascimento: "1992-11-30",
      idfilial: 2 // assumindo que a filial de ID 4 já foi cadastrada anteriormente
    });

    const funcionario7 = Funcionario.create({
      nome: "Lucas Souza",
      cpf: "444.555.666-77",
      telefone: "(31) 98765-4321",
      email: "lucas.souza@example.com",
      senha: "minhasenha",
      rua: "rua das Palmeiras",
      numero: 789,
      cidade: "Belo Horizonte",
      bairro: "Savassi",
      data_nascimento: "1994-04-17",
      idfilial: 3 // assumindo que a filial de ID 5 já foi cadastrada anteriormente
    });
    //VEICULO
    const veiculo1 = Veiculo.create({
      placa: "ABC1234",
      marca: "Fiat",
      modelo: "Uno",
      cor: "Azul",
      ano: 2021,
      idcliente: 1
    });
    const veiculo2 = Veiculo.create({
      placa: "DEF5678",
      marca: "Volkswagen",
      modelo: "Gol",
      cor: "Preto",
      ano: 2018,
      idcliente: 2
    });
    const veiculo3 = Veiculo.create({
      placa: "GHI9101",
      marca: "Ford",
      modelo: "Fiesta",
      cor: "Prata",
      ano: 2020,
      idcliente: 1
    });
    const veiculo4 = Veiculo.create({
      placa: "JKL2345",
      marca: "Chevrolet",
      modelo: "Onix",
      cor: "Vermelho",
      ano: 2019,
      idcliente: 3
    });
    const veiculo5 = Veiculo.create({
      placa: "MNO6789",
      marca: "Renault",
      modelo: "Sandero",
      cor: "Branco",
      ano: 2022,
      idcliente: 2
    });

    //AGENDAMENTO
    const agendamento1 = await AgendamentoServico.create({
      data_entrada: "2022-04-12",
      observacoes_entrada: "Ahshhsjahj",
      idfuncionario: 2,
      idveiculo: 1,
      idtipo_servico: 1
    });

    const agendamento2 = await AgendamentoServico.create({
      data_entrada: "2022-04-12",
      observacoes_entrada: "Teste 2",
      idfuncionario: 1,
      idveiculo: 2,
      idtipo_servico: 1
    });

    const formaPagamentoCartao = FormaPagamento.create({
      forma_pag: "Cartão"
    });

    const formaPagamentoPix = FormaPagamento.create({
      forma_pag: "Pix"
    });


  })();
}

export default sequelize;