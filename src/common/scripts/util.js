export function saveData (id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    let sellerId = seller[id]
    if (!sellerId) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.setItem('__seller__', JSON.stringify(seller))
}

export function getData (id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)
  let sellerId = seller[id]
  if (!sellerId) {
    return def
  }
  if (!sellerId[key]) {
    return def
  }
  return sellerId[key]
}

export function getQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let hash = window.location.hash
  let r = hash.substr(hash.indexOf('?') + 1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
