export class WebHookMessageDto {

  event: string
  session: string
  engine: string
  payload: WebHookMessagePayloadDto

}
export class WebHookMessagePayloadDto {
    id: string
    timestamp: number
    from: string
    fromMe: boolean
    to: string 
    chatId: string
    type: string
    body: string
    hasMedia: boolean
    ack: number
    ackName: string
}

/* 
{
  id: 'evt_01k6tbyrqxeat9fsq3qwfm2sxv',
  timestamp: 1759674065661,
  event: 'message',
  session: 'default',
  metadata: {},
  me: {
    id: '559484433460@c.us',
    pushName: 'Amantes Da Lua',
    lid: '248258303660074@lid',
    jid: '559484433460:1@s.whatsapp.net'
  },
  payload: {
    id: 'false_559484091630@c.us_3F7B141C5CCC2D3F70AA',
    timestamp: 1759674065,
    from: '559484091630@c.us',
    fromMe: false,
    source: 'app',
    body: 'matue',
    to: null,
    participant: null,
    hasMedia: false,
    media: {
      Info: [Object],
      Message: [Object],
      IsEphemeral: false,
      IsViewOnce: false,
      IsViewOnceV2: false,
      IsViewOnceV2Extension: false,
      IsDocumentWithCaption: false,
      IsLottieSticker: false,
      IsBotInvoke: false,
      IsEdit: false,
      SourceWebMsg: null,
      UnavailableRequestID: '',
      RetryCount: 0,
      NewsletterMeta: null,
      RawMessage: [Object],
      Status: 3
    },
    ack: 2,
    ackName: 'DEVICE',
    replyTo: null,
    _data: {
      Info: [Object],
      Message: [Object],
      IsEphemeral: false,
      IsViewOnce: false,
      IsViewOnceV2: false,
      IsViewOnceV2Extension: false,
      IsDocumentWithCaption: false,
      IsLottieSticker: false,
      IsBotInvoke: false,
      IsEdit: false,
      SourceWebMsg: null,
      UnavailableRequestID: '',
      RetryCount: 0,
      NewsletterMeta: null,
      RawMessage: [Object],
      Status: 3
    }
  },
  environment: { version: '2025.9.2', engine: 'GOWS', tier: 'CORE', browser: null }
}
*/