import {Status} from '@/type'

// 自定义错误结构
class CustomError extends Error {
  public get body(): any {
    return this._body
  }

  public set body(value: any) {
    this._body = value
  }

  public get code(): number {
    return this._code
  }

  public set code(value: any) {
    this._code = value
  }

  public _code: number
  public _body: any

  public constructor(code: number, message: string, body: any) {
    super(message)
    this._code = code
    this._body = body
  }
}

const HEADERS = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Origin': location.origin,
  'Access-Control-Allow-Origin': location.origin,
}
// 携带Params参数的请求
const METHODS_PARAMS = ['GET', 'DELETE']
// 携带Body请求体的请求
const METHODS_BODY = ['POST', 'PUT', 'PATCH']
// 请求方法
const METHODS = [...METHODS_BODY, ...METHODS_PARAMS]

/** Fetcher
 * @description 请求封装
 * @since 11/04/2023 8:47 am
 * @param {string} uri 请求地址
 * @param {string} method 请求方法
 * @param {Record<string, string>} headers 请求头
 * @param {Record<string, any>} options 其他配置
 *
 * @Error {CustomError} 错误状态
 * @returns {Promise<Status<any>>} 返回响应
 *  */
export const fetcher = <T>(
  uri: string = import.meta.env.VITE_APP_BASE,
  method = 'GET',
  headers?: Record<string, string>,
  options?: Record<string, any>,
): ((body: any, query?: string, params?: string) => Promise<Status<T>>) => {
  if (!METHODS.includes(method.toUpperCase())) {
    throw new Error(`请传入正确的请求方法! 请求方法为:${METHODS}其中之一`)
  } else if (METHODS_BODY.includes(method.toUpperCase())) {
    return (body: Record<string, any> | string) => {
      return bodyMethod(
        uri,
        method,
        body as Record<string, any>,
        headers,
        options,
      ).then((res) => parseResponse<T>(res))
    }
  }
  return (query: string, params?: string) => {
    return paramsMethod(uri, method, query, params, headers, options).then(
      (res) => parseResponse<T>(res),
    )
  }
}

/** Body Query
 * @description 携带请求体的请求
 * @since 11/04/2023 8:42 am
 * @param {string} uri 请求地址
 * @param {string} method 请求方法
 * @param {Record<string, string>} body 请求体
 * @param {Record<string, string>} headers 请求头
 * @param {Record<string, any>} options 其他配置
 *
 * @Error {CustomError} 错误状态
 * @returns {Promise<Response>} 返回响应
 *  */
const bodyMethod = async (
  uri: string = import.meta.env.VITE_APP_BASE,
  method = 'POST',
  body: Record<string, string>,
  headers?: Record<string, string>,
  options?: Record<string, any>,
): Promise<Response> => {
  return await fetch(uri, {
    method,
    headers: {
      ...HEADERS,
      ...headers,
    },
    body: JSON.stringify(body),
    ...options,
  })
}

/** Params Query
 * @description 携带参数的请求
 * @since 11/04/2023 8:45 am
 * @param {string} uri 请求地址
 * @param {string} method 请求方法
 * @param {string} query 请求参数
 * @param {string} params 请求参数
 * @param {Record<string, string>} headers 请求头
 * @param {Record<string, any>} options 其他配置
 *
 * @Error {CustomError} 错误状态
 * @returns {Promise<Response>} 返回响应
 *  */
const paramsMethod = async (
  uri: string = import.meta.env.VITE_APP_BASE,
  method = 'GET',
  query: string,
  params?: string,
  headers?: {[key: string]: string},
  options?: Record<string, any>,
): Promise<Response> => {
  const paramsStr = params ? `&params=${params}` : ''
  return await fetch(`${uri}?query=${query}${paramsStr}`, {
    method,
    headers: {
      ...HEADERS,
      ...headers,
    },
    ...options,
  })
}

/**  Parse Response
 * @description 解析响应
 * @since 11/04/2023 10:29 pm
 * @param {Response} response 响应
 * @returns {Promise<Status<any>>} 返回基于标准的响应的结构体T
 *  */
const parseResponse = async <T>(response: Response): Promise<Status<T>> => {
  const res: Status<T> = await response.json()
  const body: Partial<Response> = {
    status: response.status,
    statusText: response.statusText,
    redirected: response.redirected,
    headers: response.headers,
    type: response.type,
    url: response.url,
  }
  if (res.code >= 200 && res.code <= 299) {
    return res
  } else if (res.code === 401) {
    throw new CustomError(res.code, '未登录', body)
  } else if (res.code === 403) {
    throw new CustomError(res.code, '无权限', body)
  }
  throw new CustomError(res.code, '网络请求错误', body)
}
