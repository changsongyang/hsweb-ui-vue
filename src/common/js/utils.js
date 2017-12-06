export function encodeQueryParam (data) {
  var queryParam = {}
  var index = 0
  for (var f in data) {
    if (data[f] === '') continue
    if (f.indexOf('$LIKE') !== -1 && data[f].indexOf('%') === -1) data[f] = '%' + data[f] + '%'
    if (f.indexOf('$START') !== -1) data[f] = '%' + data[f]
    if (f.indexOf('$END') !== -1) data[f] = data[f] + '%'
    queryParam['terms[' + (index) + '].column'] = f
    queryParam['terms[' + (index) + '].value'] = data[f]
    index++
  }
  return queryParam
}
