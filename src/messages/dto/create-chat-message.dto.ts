import { CreateMessageDto } from "./create-message.dto";

export class CreateChatMessageDto extends CreateMessageDto {
    ref: number;
}
