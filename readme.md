# Projeto: Pipeline de Streaming (Api Node.js + Kafka + Spark)

Este projeto demonstra um pipeline de dados em tempo real usando:

- Uma **API Node.js** que gera produtos falsos com o `faker` e envia para o Kafka
- Um **Apache Kafka** para transporte das mensagens
- Um **Spark Structured Streaming** que lê os dados do Kafka, processa e grava em formato Parquet

## Tecnologias Utilizadas

- Node.js + Express
- Kafka + Zookeeper (imagens Bitnami)
- Apache Spark (via Jupyter Notebook container)
- Docker + Docker Compose

---

## Estrutura do Projeto
```
stream-processing-pipeline/
├── api-node/
│ ├── Dockerfile
│ ├── index.js
│ └── package.json
├── spark/
│ ├── json_to_parquet.ipynb
│ └── analises.ipynb
├── docker-compose.yml
└── README.md
```

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone <link-do-repo>
cd projeto
```
### 2. Suba os containers
1. Isso iniciará: Zookeeper, Kafka, API e o Jupyter Notebook com Spark.

2. A API Node.js começará automaticamente a enviar dados falsos para o Kafka a cada 1 segundo.

```bash
docker-compose up --build
```
### 3. Verificar a ingestão de dados

Acesse o Jupyter Notebook:

- http://localhost:8888 (A senha/token será exibido no terminal)
- Execute as células do notebook json_to_parquet.ipynb

Ou converta e rode o script Python equivalente:

1 - descubra o id do container spark

```bash
docker ps
```

2 - Acesse o container Spark via terminal :

```bash
docker exec -it <nome_ou_id_do_container_spark> bash
```
3 - Dentro do container vá até a pasta onde está o notebook :
```bash
cd /home/jovyan/work
```

4 - Converta o notebook para script Python e rode-o:
```bash
jupyter nbconvert --to script json_to_parquet.ipynb
spark-submit --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0 json_to_parquet.py
```
5 - Use o notebook ```analises.ipynb``` para confirmar a ingestão dos dados


