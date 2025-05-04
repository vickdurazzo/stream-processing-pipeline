const express = require('express'); //Framework para criação de APIs
const { Kafka } = require('kafkajs'); //cliente Kafka para Node.js
const { faker } = require('@faker-js/faker'); //Biblioteca para gerar dados falsos

//instanciacao da aplicacao e definicao da porta
const app = express();
const PORT = 3000;

// Kafka config
const kafka = new Kafka({ brokers: ['kafka:9092'] }); // Define o broker Kafka. O broker é como um servidor que recebe e armazena as mensagens para entrega dessas mensagens aos consumidor que no caso do projeto será o spark streaming
const producer = kafka.producer(); //instanciacao do produtor que ira enviar as mensagens para o broker

async function startKafka() {
  await producer.connect(); //conecta o produtor ao broker

  //nesta função temos o loop de envio de mensagens a cada 1 segundo
  setInterval(async () => {
    for (let i = 0; i < 100; i++) {
      //gera dados falsos
      const product = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        image: faker.image.urlLoremFlickr({ category: 'product' }),
        createdAt: new Date()
      };

      //conversao do objeto para JSON e envio para o topico "products" do Kafka
      await producer.send({
        topic: 'products',
        messages: [{ value: JSON.stringify(product) }]
      });

      //console.log("Enviado:", product.name);
    }
  }, 1000);
}


startKafka(); //inicializacao da funcao de envio de mensagens

app.listen(PORT, () => {
  console.log(`API em execução na porta ${PORT}`);
}); //inicializacao da api, auxilia manter o processo "ativo"
