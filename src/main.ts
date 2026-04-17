import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RABBITMQ_URL } from './common/constant/email.constant';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL!],
      queue: 'email_queue',
      queueOptions: {
        durable: false,
      },
      socketOptions: {
        connectionOptions: {
            clientProperties: {
                connection_name: "email-on"
            }
        }
    }
    },
  });
  await app.listen();
}
bootstrap();
