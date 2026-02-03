export class WebHookMessagePayloadDto {
    id: string
    timestamp: number
    from: string
    fromMe: boolean
    source: string
    body: string
    to: string | null
    participant: string | null
    hasMedia: boolean
    media: any | null
    ack: number
    ackName: string
    replyTo: any | null
    _data: any
}

export class MeDto {
    id: string
    pushName: string
    lid: string
    jid: string
}

export class EnvironmentDto {
    version: string
    engine: string
    tier: string
    browser: string | null
}

export class WebHookMessageDto {
    id: string
    timestamp: number
    event: string
    session: string
    metadata: object
    me: MeDto
    payload: WebHookMessagePayloadDto
    environment: EnvironmentDto
}