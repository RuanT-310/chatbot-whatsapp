export class WahaWebHookDto {

  event: "message"
  session: "default"
  engine: "WEBJS"
  payload: WahaWebHookPayloadDto

}
export class WahaWebHookPayloadDto {
    "id": string
    "timestamp": 1640995200000
    "from": string
    "fromMe": boolean
    "to": string 
    "chatId": string
    "type": "chat"
    "body": string
    "hasMedia": boolean
    "ack": 1
    "ackName": "SERVER"
}