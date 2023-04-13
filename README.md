# Teste de engenharia Grupo SBF

Essa repositório contém o monorepo criado para o teste de engenharia de software do grupo SBF.

Dentro do nosso monorepo temos, por hora, apenas uma aplicação. O serviço de conversão de moedas, que consiste básicamente em um serviço GraphQL que, por hora, tem duas funções, A principal é a que recebe um valor em real e converte esse valor para as moedas préviamente cadastradas, e a outra é a função de cadastrar moedas.

Esse monorepo foi criado utilizando utilando Yarn Workspace, que é uma funcionalidade do Yarn que permite agrupar múltiplas aplicações em um único repositório.

### Ferramentas necessárias para rodar a aplicação

A aplicação foi criada e testada com as ferramentas com as versões abaixo:
- Node v14.6.0 - pode ser instalado utilizando o NVM conforme a [documentação](https://github.com/nvm-sh/nvm)
- [Docker](https://www.docker.com/) v20.10.2
- [Docker Compose](https://docs.docker.com/compose/) v1.27.4
- [git](https://git-scm.com/) v2.15.0

#### Ferramentas auxiliares (opcionais)
- [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download)

### Rodando a aplicação localmente

Primeiramente é preciso baixar o repositório em sua máquina. Para isso, rode o comando a seguir no seu terminal/prompt de comando:

```sh
git clone git@github.com:lflimeira/eng-gruposbf-backend-javascript.git
```

Depois que o clone do repositório for realizado, acesse a pasta do projeto, com o comando a seguir em seu terminal/prompt de comando:

```sh
cd eng-gruposbf-backend-javascript
```

Pronto, agora você esta dentro do repositório do projeto. Antes de começar a rodar a aplicação, precisamos fazer algumas preparações:

- Garanta que o Docker esteja rodando em sua máquina. 
- Na pasta `services/currency-exchange` existe o arquivo `.env.example`. Renomeie esse arquivo para `.env`.
- Agora temos duas opções, ou criamos uma cópia do arquivo `.env` na pasta raiz do projeto apenas com a variavels de ambiente `GH_PAT_TOKEN="FAKE_GH_PAT_TOKEN"` ou podemos fazer o export dessa variável na máquina com o comando a seguir em seu terminal/prompt de comando:

```sh
export GH_PAT_TOKEN="FAKE_GH_PAT_TOKEN"
```

Vale ressaltar que se optar pela segunda opção, toda a instância do terminal/prompt de comando em que for rodar a aplicação, necessitará desse export.

- Agora precisamos instalar as dependências do projeto. Execute o comando a seguir em seu terminal/prompt de comando:

```sh
yarn install
```

- Com as dependências instaladas, precisamos realizar o build do projeto. Execute o comando a seguir em em seu terminal/prompt de comando:

```sh
yarn build
```

- Chegou a hora de rodarmos a aplicação. Execute o comando a seguir em seu terminal/prompt de comando:

```sh
make service
```

ou 

```sh
docker-compose up -d currency-exchange
```

Executando o comando anterior, o resultado que deve aparecer no seu terminal/prompt de comando, deve ser o seguinte:
```
docker-compose up -d currency-exchange
Creating network "eng-gruposbf-backend-javascript_default" with the default driver
Creating network "currency-exchange" with the default driver
Creating eng-gruposbf-backend-javascript_database_1 ... done
Creating eng-gruposbf-backend-javascript_currency-exchange_1 ... done
```

Se aparecer a seguinte mensagem:

```
docker-compose up -d currency-exchange
Traceback (most recent call last):
  File "site-packages/urllib3/connectionpool.py", line 677, in urlopen
  File "site-packages/urllib3/connectionpool.py", line 392, in _make_request
  File "http/client.py", line 1252, in request
  File "http/client.py", line 1298, in _send_request
  File "http/client.py", line 1247, in endheaders
  File "http/client.py", line 1026, in _send_output
  File "http/client.py", line 966, in send
  File "site-packages/docker/transport/unixconn.py", line 43, in connect
ConnectionRefusedError: [Errno 61] Connection refused
...
```

Verifique novamente se o docker esta execuntando (provavelmente não está), após garantir que o docker esteja rodando, volte os passos e execute novamente.

Caso tudo ocorra sem problemas, para confirmar se a aplicação esta rodando, você pode executar o comando a seguir no seu terminal/prompt de comando:

```sh
docker-compose logs -f currency-exchange
```

E deve receber o seguinte resultado:

```sh
Attaching to eng-gruposbf-backend-javascript_currency-exchange_1
currency-exchange_1  | npm WARN exec The following package was not found and will be installed: nodemon@2.0.22
currency-exchange_1  | [nodemon] 2.0.22
currency-exchange_1  | [nodemon] to restart at any time, enter `rs`
currency-exchange_1  | [nodemon] watching path(s): *.*
currency-exchange_1  | [nodemon] watching extensions: js,mjs,json
currency-exchange_1  | [nodemon] starting `node build/src/index.mjs`
currency-exchange_1  | database root 123456 27017
currency-exchange_1  | {
currency-exchange_1  |   "timestamp": "2023-04-12T02:09:13.258Z",
currency-exchange_1  |   "message": "[Currency Exchange Service]: 🚀 Server ready at http://localhost:5003/",
currency-exchange_1  |   "source": "file:///build/src/index.mjs:110821"
currency-exchange_1  | }
```

Com esse comando executando, também é possível acompanhar os logs da aplicação, que em produção seriam enviados para uma ferramenta de monitoramento e análise, como o Datadog ou outras com a mesma função.


### Utilizando a aplicação

Com a a aplicação rodando, nós precisamos chamar a query e mutation para realizar as ações esperadas por elas. Para isso, podemos utilizar a ferramenta que mais nos agrada para fazer as requisições. Eu particularmente utilizo o Insomnia, mas vou deixar duas opções o cURL para rodar em seu terminal/prompt de comando e as requests para serem inseridas no Insomnia.

#### Adicionar uma nova moeda na aplicação.

```sh
curl --request POST \
  --url http://localhost:5003/ \
  --header 'Content-Type: application/json' \
  --data '{"query":"mutation addCurrency($input: AddCurrencyInput!) {\n  addCurrency(input: $input) {\n    currencyCode\n    country\n  }\n}","variables":{"input":{"currencyCode":"INR","country":"Índia"}},"operationName":"addCurrency"}'
```

ou 

```graphql
methodo: POST
URL: http://localhost:5003
Body:
mutation addCurrency($input: AddCurrencyInput!) {
  addCurrency(input: $input) {
    currencyCode
    country
  }
}

Query Variables:
{
	"input": {
		"currencyCode": "INR",
		"country": "Índia"
	}
}
```

O retorno deve ser:

```graphql
{
  "data": {
    "addCurrency": {
      "currencyCode": "INR",
      "country": "Índia"
    }
  }
}
```

#### Consultar valores convertidos para cada país.

```sh
curl --request POST \
  --url http://localhost:5003/ \
  --header 'Content-Type: application/json' \
  --data '{"query":"query listCurrenciesExchange($input: ListCurrenciesExchangeInput!) {\n  listCurrenciesExchange(input: $input) {\n    currencyCode\n    country\n    amount\n  }\n}","variables":{"input":{"amount":1}},"operationName":"listCurrenciesExchange"}'
```

ou 

```graphql
methodo: POST
URL: http://localhost:5003
Body:
query listCurrenciesExchange($input: ListCurrenciesExchangeInput!) {
  listCurrenciesExchange(input: $input) {
    currencyCode
    country
    amount
  }
}

Query Variables:
{
	"input": {
		"amount": 1
	}
}
```

O retorno deve ser:

```graphql
{
  "data": {
    "listCurrenciesExchange": [
      {
        "currencyCode": "EUR",
        "country": "Países da União Europeia",
        "amount": 0.18
      },
      {
        "currencyCode": "USD",
        "country": "Estados Unidos",
        "amount": 0.2
      },
      {
        "currencyCode": "INR",
        "country": "Índia",
        "amount": 16.67
      }
    ]
  }
}
```

### Explicação sobre a arquitetura do projeto

A aplicação está dividída entre 3 diretórios principais para a arquitetura de código.

- ports
- packages
- services

#### Ports

Nesse diretório, contém o código dos pacotes que são deployados no [Github Packages](https://github.com/lflimeira?tab=packages). Normalmente, são partes do código que podem e são utilizadas de forma padronizada dentro de todos os serviços, como por exemplo o pacote `Logger` que é responsável por estruturar e padronizar os logs das nossas aplicações, outro exemplo é o port de mongodb que pode ser utilizada por toda aplicação que for persistir dados no MongoDB.

De forma geral, esse é o principal escopo dessa camada da aplicação. Vale deixar destacado que cada port pode ser deployado de forma separada no Github Packages através do script `.github/workflows/publish.yml`.

#### Packages

Nesse diretório, é onde esta centralizado o código core das nossas aplicações, dentro dele possuí a pasta `domains`, e pode conter também pasta de `clients`, para o caso de querermos criar SDKs de interface para nossos services (explicarei mais sobre a camada de services mais adiante), para que outros serviços possam consumir nossa aplicação de uma forma mais padronizada.

Seguindo adiante com nossa explicação, vamos focar na pasta `domains`, que como o próprio nome já diz, é onde colocamos os domínios do nosso monorepo, os domínios costumam ter um escopo bem definído, como, por exemplo `Users`, `Accounts`, `Currency` e outros. De forma geral, cada domínio funciona de forma independente e pode ser utilizado em diferentes serviços caso seja necessário, é nos domínios que ficam as regras de negócio específicas do mesmo.

Os domínios podem ter pors próprias caso tenha algum serviço externo que seja utilizado apenas para aquele domínio.

#### Services

Esse diretório, é o responsável por centralizar todos os serviços que nosso monorepo dispõe, os serviços podem ter interfaces diferentes e configurações próprias. 

No nosso caso por exemplo temos apenas um serviço que é servido como uma interface GraphQL, mas poderíamos por exemplo, ter um service de consumer que será trigado por uma fila, e poderá utilizar o domínio de `User`, ou poderíamos ter um service que serve uma aplicação rest. Enfim, todos os serviços disponíveis no produto, ficam agrupados nessa pasta.

### Possíveis melhorias

Existem algumas coisas que não incluí no projeto, mas que acredito que vale a penas serem citados/mapeados como possíveis melhorias de implementação para uma aplicação para produção.

- Criar um diretório na raiz do projeto chamada `infrastructure`, nesse diretório estaria centralizado a infraestrutura de todos os serviços codificada utilizando terraform.
- Melhorar e simplificar os passos para rodar a aplicação localmente, uma proposta seria ter um docker-compose para o CI, e outro para rodar a aplicação localmente, isso simplificaria os passos para subir a aplicação, uma terceira opção seria ter um docker-compose para produção caso tenhamos serviços que rodem em um Fargate por exemplo.
- Fazer o deploy para staging e production, os aquivos para esse deploy em lambdas aws via github actions, já existem nos paths `.github/workflows/release.yml` e `.github/workflows/stg.yml`, mas não vão funcionar pois a infraestrutura não está provisionada na AWS.
- Fazer o envio dos logs e outras métricas para uma ferramenta como Datadog ou similares, para isso, precisaria ter a infra provisionada e configurada para tal.
- Criar testes E2E para os principais fluxos da aplicação, como é uma aplicação simples, seriam os testes de inserção de moedas e consulta dos valores com câmbio, para não depender da estabilidade da API de terceiros, poderia ser feito com o [Nock](https://github.com/nock/nock) no lugar da requisição para a API, isso garantiria maior estabilidade durante o processo de CI/CD.




