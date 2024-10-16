import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Controller('translationApi')
export class TranslationController {
  constructor(private readonly translation: TranslationService) {}

  @Post('translate')
  translate(
    @Body()
    prompt: {
      originalLanguage: string;
      languageToTranslate: string;
      text: string;
    },
  ) {
    try {
      return this.translation.translate(prompt);
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }
}
