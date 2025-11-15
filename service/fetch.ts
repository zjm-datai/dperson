
import { IOtherOptions } from './base';

export const ContentType = {
  json: 'application/json',
  stream: 'text/event-stream',
  audio: 'audio/mpeg',
  form: 'application/x-www-form-urlencoded; charset=UTF-8',
  download: 'application/octet-stream', // for download
  downloadZip: 'application/zip', // for download
  upload: 'multipart/form-data', // for upload
}

export type FetchOptionType = Omit<RequestInit, 'body'> & {
  params?: Record<string, any>
  body?: BodyInit | Record<string, any> | null
}

export const getBaseOptions = (): RequestInit => ({
  method: 'GET',
  mode: 'cors',
  credentials: 'include', // always send cookies、HTTP Basic authentication.
  headers: new Headers({
    'Content-Type': ContentType.json,
  }),
  redirect: 'follow',
})

async function base<T>(url: string, options: FetchOptionType = {}, otherOptions: IOtherOptions = {}): Promise<T> {
    const baseOptions = getBaseOptions()

    const { params, body, headers, ...init } = Object.assign({}, baseOptions, options)

    const {
        isPublicAPI = false,
        isMarketplaceAPI = false,
        bodyStringify = true,
        needAllResponseContent,
        deleteContentType,
        getAbortController,
    } = otherOptions
}