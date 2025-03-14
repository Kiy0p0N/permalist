# Permalist

![Exemplo de execução](/image/example.gif)

## Descrição
Este é um aplicativo de lista de tarefas simples desenvolvido com Node.js, Express e PostgreSQL. Ele permite adicionar, editar e excluir itens de uma lista armazenada no banco de dados.

## Tecnologias Utilizadas
- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript Templates)
- body-parser

## Funcionalidades
- [X] Adicionar novas tarefas à lista
- [X] Editar tarefas existentes
- [X] Excluir tarefas
- [X] Persistência dos dados utilizando PostgreSQL

## Como Executar o Projeto
### Pré-requisitos
- Node.js instalado
- PostgreSQL instalado e configurado

### Configuração do Banco de Dados
1. Crie um banco de dados chamado `permalist` no PostgreSQL.
2. Dentro do banco de dados, crie a tabela `items` com a seguinte estrutura:
   ```sql
   CREATE TABLE items (
       id SERIAL PRIMARY KEY,
       title VARCHAR(30)
   );
   ```

### Instalação e Execução
1. Clone este repositório:
   ```sh
   git clone https://github.com/Kiy0p0N/to-do-list.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd seu-repositório
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Execute o servidor:
   ```sh
   node index.js
   ```
5. Acesse `http://localhost:3000` no navegador para visualizar a aplicação.

## Exemplo de Uso
Ao abrir a aplicação, você verá uma lista de tarefas. Para adicionar uma nova tarefa, basta digitar o nome e pressionar o botão de adição. Você também pode editar ou excluir tarefas clicando nos botões correspondentes.

---
Se precisar de melhorias ou suporte, fique à vontade para contribuir ou abrir uma issue! 🚀
