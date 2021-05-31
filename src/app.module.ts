import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // *************** Approach 1 Start *****************
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka-client',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-consumer',
          },
        },
      },
    ]),
  ],
  // *************** Approach 1 End *****************
  // *************** Approach 2 Start *****************
  // imports: [],
  // *************** Approach 2 End *****************
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
