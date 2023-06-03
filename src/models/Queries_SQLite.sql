-- SQLite
-- Busca pelo preco total
SELECT agendamentos.idtipo_servico AS servico, 
SUM(preco) AS total 
FROM agendamentos 
INNER JOIN tipo_servicos ON agendamentos.idtipo_servico = tipo_servicos.id 
WHERE agendamentos.id = 1

-- Agendamentos por veiculo
SELECT agendamentos.id, tipo_servicos.id AS tipo_servico_id, 
tipo_servicos.nome AS tipo_servico_nome, finalizacoes.valor_total,
COUNT(tipo_servicos.id) quantidade,
agendamentos.status
FROM agendamentos
INNER JOIN veiculos ON agendamentos.idveiculo = veiculos.id
INNER JOIN tipo_servicos ON agendamentos.idtipo_servico = tipo_servicos.id
LEFT JOIN finalizacoes ON agendamentos.id = finalizacoes.id_agendamento
WHERE veiculos.placa = 'JKL-2345'
  AND agendamentos.created_at BETWEEN '2023-05-01' AND '2023-06-31'
GROUP BY tipo_servicos.nome

-- Agendamentos por Cliente
SELECT clientes.nome AS Nome, 
COUNT(agendamentos.id) AS Total_Agendamentos, 
SUM(finalizacoes.valor_total) Total 
from agendamentos
INNER JOIN veiculos ON agendamentos.idveiculo = veiculos.id
INNER JOIN clientes ON veiculos.id = clientes.id
INNER JOIN finalizacoes ON agendamentos.id = finalizacoes.id_agendamento
WHERE agendamentos.created_at BETWEEN '2023-05-01' AND '2023-06-31'
GROUP BY clientes.nome

-- Receita por filial
SELECT agendamentos.idtipo_servico AS tipo_servico_id, tipo_servicos.nome AS tipo_servico_nome,
SUM(finalizacoes.valor_total) AS receita
FROM agendamentos
INNER JOIN finalizacoes ON agendamentos.id = finalizacoes.id_agendamento
INNER JOIN funcionarios ON agendamentos.idfuncionario = funcionarios.id
INNER JOIN filiais ON funcionarios.idfilial = filiais.id
INNER JOIN tipo_servicos ON agendamentos.idtipo_servico = tipo_servicos.id
WHERE filiais.nome = 'Filial B'
  AND agendamentos.data_entrada BETWEEN '2023-05-01' AND '2023-06-31'
  AND finalizacoes.conf_pag IS true
GROUP BY agendamentos.idtipo_servico, tipo_servicos.nome

-- Receita Total
SELECT filiais.nome AS nome_filial, COUNT(agendamentos.id) AS quantidade_agendamentos, SUM(finalizacoes.valor_total) AS valor_total_servicos
FROM agendamentos
INNER JOIN finalizacoes ON agendamentos.id = finalizacoes.id_agendamento
INNER JOIN funcionarios ON agendamentos.idfuncionario = funcionarios.id
INNER JOIN filiais ON funcionarios.idfilial = filiais.id
WHERE agendamentos.data_entrada BETWEEN '2023-05-01' AND '2023-06-31'
AND finalizacoes.conf_pag IS true
GROUP BY filiais.nome