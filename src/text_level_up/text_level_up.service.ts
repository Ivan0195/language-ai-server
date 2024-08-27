import {HttpException, Injectable, OnApplicationBootstrap} from '@nestjs/common';
import * as fs from 'fs';

interface PromptsData {
    prompts: Array<{id: string, text: string}>
}

@Injectable()
export class TextLevelUpService implements OnApplicationBootstrap {

    promptsData: PromptsData

    onApplicationBootstrap(): any {
       const text = fs.readFileSync('./src/text_level_up/cash/prompts.txt', {encoding: "utf-8"})
        this.promptsData = JSON.parse(text)
    }

    addPrompt(prompt: {id: string, text: string}) {
        if(this.promptsData.prompts.map(el => el.id).includes(prompt.id)) {
            throw new HttpException('Prompt with this id already exists', 422);
        }
        this.promptsData.prompts.push(prompt)
        fs.writeFileSync('./src/text_level_up/cash/prompts.txt', JSON.stringify(this.promptsData))
        return 'Prompt Added Successfully'
    }

    async improveText({text, promptId}: {text: string, promptId: string}) {
        const { LlamaContext, LlamaModel } = await import('node-llama-cpp');
        const model = new LlamaModel({
            modelPath: './src/ai/weights/Mistral-7B-Instruct-v0.2.Q3_K_S.gguf',
            gpuLayers: 999,
            seed: 1,
        });
        const context = new LlamaContext({
            model: model,
            contextSize: 20000,
            batchSize: 30000,
        });

        const vectors = context.encode(
            `[INST]${this.promptsData.prompts.find((el) => el.id === promptId).text} ${text}[/INST]`,
        );

        if (vectors.length > 20000) {
            throw new HttpException('Text is too long', 413);
        }

        const answer = [];
        for await (const val of context.evaluate(vectors, {
            temperature: 0.8,
            topP: 0.95,
            topK: 40,
        })) {
            answer.push(val);
            if (answer.length > 3072) {
                break;
            }
        }
        const decodedAnswer = await context.decode(answer);
        return decodedAnswer;
    }
}
