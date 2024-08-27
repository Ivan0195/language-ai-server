import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextLevelUpModule } from './text_level_up/text_level_up.module';

@Module({
  imports: [TextLevelUpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
