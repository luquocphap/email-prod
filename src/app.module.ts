import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './modules-microservice/email/email.module';
import { transporter } from './common/nodemailer/init.nodemailer';

@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit{
  async onModuleInit() {
      try {
        await transporter.verify();
        console.log("Server is ready to take our messages");
      } catch (err) {
        console.error("Verification failed:", err);
      }
  }
}
