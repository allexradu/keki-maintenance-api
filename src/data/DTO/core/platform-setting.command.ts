export class PlatformSetting {
    code: string
    title: string
    description?: string
    uuidValue?: string
    textValue?: string
    numericValue?: number
    keyValuePairs?: string
    booleanValue?: boolean
    disabled?: boolean

    constructor(data: PlatformSetting) {
        this.code = data.code
        this.title = data.title
        this.description = data.description
        this.uuidValue = data.uuidValue
        this.textValue = data.textValue
        this.numericValue = data.numericValue
        this.keyValuePairs = data.keyValuePairs
        this.booleanValue = data.booleanValue
        this.disabled = data.disabled
    }
}
