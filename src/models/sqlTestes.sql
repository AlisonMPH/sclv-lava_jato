-- SQLite
SELECT C.CPF, C.ID IDCLIENTE, C.QTD_LAVAGEM, C.IS_DEVEDOR, A.IDVEICULO, V.IDCLIENTE FROM CLIENTE C, FUNCIONARIO F, AGENDAMENTO_SERVICO A, VEICULO V
WHERE A.IDVEICULO = V.ID
AND C.CPF = F.CPF

SELECT * FROM CLIENTE;

UPDATE FINALIZACAO_SERVICO SET IDSTATUS = '1' WHERE IDAGENDAMENTO_SERVICO='?'


SELECT * FROM CLIENTE C, FUNCIONARIO F WHERE C.CPF = F.CPF AND C.ID='6';

INSERT INTO FINALIZACAO_SERVICO (DATA_SAIDA)VALUES 

INSERT INTO AGENDAMENTO_SERVICO ( IDFUNCIONARIO, IDVEICULO, IDTIPO_SERVICO,createdAt,updatedAt)
VALUES (1,6,1,'2023-05-19 13:35:02.014 +00:00	','2023-05-19 13:35:02.014 +00:00')

INSERT INTO FINALIZACAO_SERVICO (IDAGENDAMENTO_SERVICO, IDFORMA_PAGAMENTO, IDSTATUS, createdAt,updatedAt)
VALUES (1,1,1,'2023-05-19 13:35:02.014 +00:00	','2023-05-19 13:35:02.014 +00:00')