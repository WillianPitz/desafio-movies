# Introdução
Esta API é projetada para possibilitar uma leitura de um arquivo CSV.

## Funcionalidades Principais
- Leitura de CSV: Ler o arquivo CSV dos filmes e inserir em um banco de dados em memória (H2) ao inicializar a aplicação.

# Instalação
1. Clone o repositório:
`git clone https://github.com/willianpitz/desafio-movies.git`
2. acesse a pasta da api: `cd desafio-movies/movies-api`
3. Instale as dependências:
`mvn clean && mvn install` ou `mvn clean ; mvn install`

# Comandos

## Subir as aplicações localmente
Execute o comando:
`mvn spring-boot:run`

## Rodar testes:
Execute o comando:
`mvn verify`

## Gerar relatório de cobertura de testes
Execute o comando no terminal desejado:

### Windows Powershell:
`mvn clean package ; mvn verify ; mvn jacoco:report`

### Outro Terminal:
`mvn clean package && mvn verify && mvn jacoco:report`

Abra o arquivo index.html no diretório: target/site/jacoco/index.html para visualizar a cobertura de testes.

# Documentação de API
http://localhost:8082/swagger-ui.html

# Tecnologias Utilizadas

- Java
- Spring Boot
- H2 Database

# Requisitos técnicos

Para build e executar a aplicação localmente você precisa de:
1.	JDK 17
2.	Maven 3