import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {TextLevelUpService} from "./text_level_up.service";
import {TextLevelUpController} from "./text_level_up.controller";

@Module({
    imports: [ConfigModule],
    controllers: [TextLevelUpController],
    providers: [TextLevelUpService],
})
export class TextLevelUpModule {}
