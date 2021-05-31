import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  // *************** Approach 1 Start *****************
  constructor(@Inject('HELLO_SERVICE') private client: ClientKafka) {}
  // *************** Approach 1 End *****************

  // *************** Approach 2 Start *****************
  //   constructor(private readonly appService: AppService) {}

  //   @Client({
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         clientId: 'kafkaSample',
  //         brokers: ['localhost:9092'],
  //       },
  //       consumer: {
  //         groupId: 'my-kafka-consumer', // Should be the same thing we give in consumer
  //       },
  //     },
  //   })
  //   client: ClientKafka;
  // *************** Approach 2 End *****************

  async onModuleInit() {
    this.client.subscribeToResponseOf('my-first-topic');
    await this.client.connect();
  }

  @Get()
  getHello() {
    return this.client.send('my-first-topic', 'Hello Kafka'); // args - topic, message
  }
}
