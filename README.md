<div align="center">

# Hotel API — Production-Ready Backend

**API RESTful em Node.js com TypeScript, arquitetura em camadas e integração multi-stack**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-30-C21325?style=for-the-badge&logo=jest&logoColor=white)

<br/>

*BFF (Backend For Frontend) robusto com Repository Pattern, JWT Authentication e total compatibilidade com ecossistema PHP/Java hoteleiro.*

[Funcionalidades](#funcionalidades) •
[Arquitetura](#arquitetura) •
[Segurança](#segurança) •
[Como Rodar](#como-rodar-localmente)

</div>

---

## Sobre o Projeto

Este é o backend evoluído do ecossistema hoteleiro, migrado de uma estrutura simples para uma **Arquitetura em Camadas (Layered Architecture)**. O sistema serve como o core de serviços para o App Mobile, compartilhando o mesmo banco de dados relacional das versões Web (PHP) e Desktop (Java).

### Diferencial Estratégico
O projeto resolve o desafio de interoperabilidade: ele valida hashes de senha gerados originalmente em PHP (BCrypt $2y$) dentro de um ambiente Node.js, permitindo uma transição suave de tecnologias sem perda de dados ou necessidade de reset de senhas dos usuários.

---

## Funcionalidades

- **Auth System**: Login e Cadastro de clientes com persistência em MySQL.
- **Profile Management**: Edição de perfil e troca de senha autenticada.
- **Quartos & Disponibilidade**: Consulta em tempo real de quartos integrada ao banco hoteleiro.
- **Reservas**: Gestão de ordens de serviço e agendamentos.
- **Middleware de Segurança**: Validação de JWT em rotas privadas com injeção de payload no request.
- **Database Pooling**: Gestão eficiente de conexões com suporte a SSL para ambientes de produção.

---

## Arquitetura

A arquitetura segue o princípio de separação de responsabilidades:

- **Controllers**: Gerenciam o ciclo de Request/Response e validação de entrada.
- **Repositories**: Isolam a lógica de acesso a dados (SQL Queries) usando `mysql2/promise`.
- **Routes**: Modularizadas por domínio (Login, Quartos, Reservas).
- **Utils**: Encapsulam lógicas de criptografia (Bcrypt) e tokens (JWT).
- **Tests**: Suíte de testes de integração com Jest validando endpoints reais.

---

## Segurança

- **Hashing**: Implementação de BCrypt com salt de 10 rounds.
- **Tokens**: JWT (JSON Web Tokens) com algoritmo HS256 para sessões stateless.
- **Proteção SQL**: 100% das queries utilizam Prepared Statements para prevenir SQL Injection.
- **CORS**: Configurado para aceitar requisições apenas de origens autorizadas.

---

## Como Rodar Localmente

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ThaysonSouza/nodeBack.git
cd nodeBack

# Instale as dependências
npm install

# Configure o .env (DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET, PORT)

# Rode em modo dev
npm run dev

# Rode os testes
npm test
```

---

## Aprendizados

Neste projeto aprendi o domínio em:

- Implementação de **Layered Architecture** em Node.js com TypeScript.
- Gestão de conexões assíncronas com **MySQL Pooling** e SSL.
- Padronização de **BFF (Backend For Frontend)** para consumo mobile.
- Resolução de conflitos de criptografia entre stacks (PHP vs Node).
- Criação de testes de integração automatizados com Jest.

---

## Autor

Desenvolvido por **Thayson Sousa**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thayson-sousa)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ThaysonSouza)

---

<div align="center">
  <sub>Projeto desenvolvido durante trajetória no Senac Sorocaba</sub>
</div>
