import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { TextLevelUpService } from './text_level_up.service';

@Controller('textImprove')
export class TextLevelUpController {
  constructor(private readonly textLevelUp: TextLevelUpService) {}

  @Post('addPrompt')
  addPrompt(
    @Body()
    prompt: {
      id: string;
      text: string;
    },
  ) {
    try {
      return this.textLevelUp.addPrompt(prompt);
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Post('testPrompt')
  testPrompt(
    @Body()
    body: {
      prompt: string;
      text: string;
    },
  ) {
    try {
      return this.textLevelUp.testPrompt(body);
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Post('getModelResult')
  improveText(
    @Body()
    body: {
      promptId: string;
      text: string;
    },
  ) {
    try {
      return this.textLevelUp.improveText(body);
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Get('getPrompts')
  getPrompts() {
    return this.textLevelUp.getPrompts();
  }

  @Post('removePrompt')
  removePrompt(
    @Body()
    body: {
      promptId: string;
    },
  ) {
    try {
      return this.textLevelUp.removePrompt(body.promptId);
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Post('replacePrompt')
  replacePrompt(
    @Body()
    body: {
      id: string;
      text: string;
    },
  ) {
    try {
      return this.textLevelUp.replacePrompt(body);
    } catch (err) {
      if (err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException(err, 500);
    }
  }
}
