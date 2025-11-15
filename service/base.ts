

import { asyncRunSafe } from '@/utils'

export type IOtherOptions = {
    isPublicAPI?: boolean

}

const baseFetch = base

export const request = async<T>(url: string, options = {}, otherOptions?: IOtherOptions) => {
    try {
        const otherOptionsForBaseFetch = otherOptions || {}
        const [err, resp] = await asyncRunSafe<T>(baseFetch(url, options, otherOptionsForBasreFetch))
    }
}


export const post = <T>(url: string, options = {}, otherOptions?: IOtherOptions) => {
    return request<T>(url, Object.assign({}, options, { method: 'POST' }), otherOptions)
}