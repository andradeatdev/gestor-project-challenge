# Controle de Estoque de Matérias-Primas e Produtos

## Descrição do Problema

Uma indústria que produz diversos produtos precisa controlar o estoque das matérias-primas utilizadas na produção. O sistema deverá permitir:

- Manter o cadastro de produtos e matérias-primas.
- Associar matérias-primas aos produtos, informando a quantidade necessária de cada insumo.
- Consultar quais produtos (e em quais quantidades) podem ser produzidos com o estoque disponível.
- Calcular o valor total da produção sugerida, priorizando produtos de maior valor quando uma matéria-prima pode ser usada em mais de um produto.

### Dados a serem armazenados

- **Produto**: código, nome e valor.
- **Matéria-prima**: código, nome e quantidade em estoque.

## Requisitos

### Requisitos Não Funcionais (RNF)

| Código | Descrição                                                                             |
| ------ | ------------------------------------------------------------------------------------- |
| RNF001 | Sistema Web compatível com Chrome, Firefox e Edge.                                    |
| RNF002 | Arquitetura baseada em API, separando back-end e front-end.                           |
| RNF003 | Front-end responsivo.                                                                 |
| RNF004 | Persistência em SGBD (Postgres, MySQL ou Oracle).                                     |
| RNF005 | Back-end desenvolvido com framework (Spring, Quarkus ou similar).                     |
| RNF006 | Front-end desenvolvido com linguagem ou framework adequado (sugestão: React + Redux). |
| RNF007 | Toda codificação (back-end, front-end e banco) deve ser em inglês.                    |

### Requisitos Funcionais (RF)

| Código | Descrição                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------- |
| RF001  | CRUD de produtos no back-end.                                                                           |
| RF002  | CRUD de matérias-primas no back-end.                                                                    |
| RF003  | CRUD de associação de matérias-primas aos produtos no back-end.                                         |
| RF004  | Consulta dos produtos que podem ser produzidos com o estoque disponível.                                |
| RF005  | Interface gráfica para CRUD de produtos no front-end.                                                   |
| RF006  | Interface gráfica para CRUD de matérias-primas no front-end.                                            |
| RF007  | Interface para associar matérias-primas aos produtos no front-end (pode estar no cadastro de produtos). |
| RF008  | Interface para listar produtos e quantidades produzíveis com o estoque disponível.                      |

## Requisitos Desejáveis

- Testes unitários para back-end e front-end.
- Testes de integração (sugestão: Cypress).

## Entrega do Teste Prático

- Postar códigos publicamente no GitHub ou outra plataforma e fornecer o link.
- Opcional: fornecer link de acesso à aplicação buildada.
- Após envio, poderá haver contato para entrevista com a equipe técnica.
