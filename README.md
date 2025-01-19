# Plataforma de Gerenciamento de Gastos com IA

Este projeto consiste em uma plataforma para gestão de despesas pessoais, onde o usuário pode tirar uma foto de uma nota fiscal, fazer o upload e visualizar o valor atualizado automaticamente no dashboard de controle financeiro. O sistema integra OCR para reconhecer informações das notas fiscais e exibe dados em um dashboard interativo.

## Objetivo do Projeto

Desenvolver uma plataforma eficiente para gestão de finanças pessoais com upload de imagens e extração automatizada de dados financeiros, utilizando tecnologias modernas de front-end e back-end.

## 🔨 Funcionalidades

- **Upload de Imagens**: Permite que o usuário envie uma imagem da nota fiscal.
- **Reconhecimento de Caracteres (OCR)**: Utiliza uma API de OCR (Google Vision API ou Gemini) para extrair o valor da nota fiscal.
- **Atualização Automática do Dashboard**: Adiciona o valor reconhecido ao controle financeiro, exibindo o total no dashboard.
- **Histórico de Transações**: Exibe o histórico de gastos com detalhes de data, valor e categoria.
- **Autenticação de Usuário**: Para que cada usuário tenha um dashboard personalizado.

## ✔️ Tecnologias Utilizadas

### Frontend
- **React** com **Vite**
- **Redux** ou **Context API** para gerenciamento de estado
- **Styled Components** para estilização
- **React Dropzone** para o upload de imagens

### Backend
- **Node.js** e **Express** para a API
- **Google Vision API** ou **Gemini** para OCR
- **MongoDB** para persistência de dados

### Infraestrutura e Deploy
- **Google Cloud Platform (GCP)**
  - **Google Cloud Functions** para processamento assíncrono de imagens
  - **Google Cloud Storage** para armazenar imagens enviadas
  - **Firestore** para banco de dados de transações

## Estrutura de Arquivos

.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── app.js
│   ├── package.json
└── README.md


## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/plataforma-gerenciamento-gastos.git

```sh
   npm install
```

## Critérios de Aceite

1. Upload de Imagem da Nota Fiscal
Dado que a usuária está autenticada e acessa a funcionalidade de upload,
Quando a usuária faz o upload de uma imagem válida da nota fiscal,
Então o sistema deve exibir uma mensagem de confirmação de envio e iniciar o processamento OCR para extrair os dados.

2. Processamento OCR (Reconhecimento de Texto)
Dado que o upload de uma imagem foi concluído,
Quando o sistema processa a imagem através da API OCR (Google Vision ou Gemini),
Então o valor reconhecido na imagem deve ser extraído e associado à conta da usuária.

3. Atualização Automática do Dashboard
Dado que o valor foi extraído com sucesso de uma nota fiscal,
Quando o processamento é concluído e os dados são salvos no banco,
Então o dashboard da usuária deve ser atualizado automaticamente com o novo valor, somando-o ao total de gastos.

4. Histórico de Transações
Dado que a usuária tem transações registradas no sistema,
Quando a usuária acessa a tela de histórico de transações,
Então o sistema deve exibir uma lista de todas as transações, incluindo a data, o valor e a categoria de cada uma.

5. Autenticação e Autorização de Usuário
Dado que uma usuária tenta acessar o sistema,
Quando ela insere suas credenciais válidas e faz login,
Então o sistema deve autenticar a usuária e redirecioná-la ao seu dashboard personalizado, garantindo o acesso apenas a suas transações.

6. Validação de Upload de Imagem
Dado que a usuária tenta fazer upload de um arquivo,
Quando o arquivo enviado não é uma imagem válida (não está nos formatos suportados ou o tamanho é excessivo),
Então o sistema deve exibir uma mensagem de erro orientando sobre os requisitos de upload e impedir o envio até que as condições sejam atendidas.

7. Persistência de Dados
Dado que uma transação foi adicionada com sucesso,
Quando o sistema armazena o valor e os detalhes no banco de dados,
Então esses dados devem ser persistidos no histórico, permitindo recuperação futura mesmo após logout ou atualização do sistema.