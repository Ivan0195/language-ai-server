import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextLevelUpModule } from './text_level_up/text_level_up.module';
import { TranslationModule } from './translations/translation.module';

@Module({
  imports: [TextLevelUpModule, TranslationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
