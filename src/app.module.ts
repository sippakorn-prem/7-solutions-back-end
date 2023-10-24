import { Module } from '@nestjs/common';
import { UserModule } from './services/user';

@Module({
	imports: [UserModule],
})
export class AppModule {}
