// 接口强绑定
const HEADERS: Record<string, string> = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Origin': location.origin,
  'Access-Control-Allow-Origin': location.origin,
}

export default HEADERS
