import { Status } from '@/type' // 自定义错误结构

// 自定义错误结构
export class CustomError extends Error {
  public _code: number
  public _body: any

  public constructor(code: number, message: string, body: any) {
    super(message)
    this._code = code
    this._body = body
  }

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
}

const HEADERS = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Origin': location.origin,
  'Access-Control-Allow-Origin': location.origin,
}
// 携带Params参数的请求
const METHODS_PARAMS = ['GET', 'DELETE'] as const
// 携带Body请求体的请求
const METHODS_BODY = ['POST', 'PUT', 'PATCH'] as const
// 请求方法
const METHODS = [...METHODS_BODY, ...METHODS_PARAMS] as const

type MethodsParamsReturnType<T> = (params: Record<string, string> | string) => Promise<Status<T> | CustomError>
type MethodsBodyReturnType<T> = (body: Record<string, any>) => Promise<Status<T> | CustomError>

type Fetcher = {
  (uri: string, method: typeof METHODS[number], headers?: Record<string, string>, options?: Record<string, any>): MethodsParamsReturnType<any>
  (uri: string, method: typeof METHODS[number], headers?: Record<string, string>, options?: Record<string, any>): MethodsBodyReturnType<any>
}

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
export const fetcher:Fetcher = (
  uri: string = import.meta.env.VITE_APP_BASE, // 统一资源标识符
  method: typeof METHODS[number] = 'GET', // 请求方法, 默认值为 GET
  headers?: Record<string, string>, // 请求头
  options?: Record<string, any>, // 可选参数
) => {
  // 请求方法不正确抛异常
  if (!METHODS) {
    throw new CustomError(
      400,
      `请传入正确的请求方法! 请求方法为:${METHODS}其中之一`,
      null,
    )
  }

  // 参数请求
  if (METHODS_PARAMS) {
    return (
      params: Record<string, string> | string,
    ): Promise<Status<T> | CustomError> => {
      return paramsMethod(uri, method, params, headers, options).then(
        (res: Response) => parseResponse<T>(res),
      )
    }
  }

  // 携带body体
  return (body: Record<string, any>): Promise<Status<T> | CustomError> => {
    return bodyMethod(uri, method, body, headers, options).then(
      (res: Response) => parseResponse<T>(res),
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
 * @param {string} params 请求参数
 * @param {Record<string, string>} headers 请求头
 * @param {Record<string, any>} options? 其他配置
 *
 * @Error {CustomError} 错误状态
 * @returns {Promise<Response>} 返回响应
 *  */
const paramsMethod = async (
  uri: string = import.meta.env.VITE_APP_BASE,
  method = 'GET',
  params: Record<string, string> | string,
  headers: Record<string, string> | undefined,
  options?: Record<string, any>,
): Promise<Response> => {
  // params键值对
  let queryParams: string | URLSearchParams
  // 如果为字符串，使用默认的query键
  if (typeof params === 'string') {
    queryParams = `?${new URLSearchParams({ 'query': params })}`
  }
  // 如果为对象，则使用传递的对象拼接为URLSearchParams
  else if (typeof params === 'object') {
    queryParams = `?${new URLSearchParams(params)}`
  }
  // 不使用任何params参数
  else {
    queryParams = ''
  }
  return await fetch(`${uri}${queryParams}`, {
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
const parseResponse = async <T>(
  response: Response,
): Promise<Status<T> | CustomError> => {
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
