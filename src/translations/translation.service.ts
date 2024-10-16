import { Injectable } from '@nestjs/common';
import Axios from 'axios';

@Injectable()
export class TranslationService {
  async translate(prompt: {
    originalLanguage: string;
    languageToTranslate: string;
    text: string;
  }) {
    const body = {
      prompt: `[INST]translate word \"${prompt.text}\" from ${prompt.originalLanguage} to ${prompt.languageToTranslate} and give short sentence with this word in ${prompt.languageToTranslate}[/INST]`,
      grammar:
        'root ::= "{ \\"original_word\\": " string ", \\"translate\\": " string ", \\"usage_example\\": " string " }"\nstring ::= "\\"" char* "\\""\nchar ::= [^"\\\\\\n\\r] | escape\nescape ::= "\\\\" (["\\\\/bfnrt] | "u" hex hex hex hex)\nhex ::= [0-9a-fA-F]',
    };
    const result = await Axios.post(
      'https://pleasant-bluejay-next.ngrok-free.app/makerDocker/completion',
      body,
    );
    console.log(result);
    return result.data.content;
  }
}
