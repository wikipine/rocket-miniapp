/**
 * 数组处理函数
 */
const array = {}

/**
 * js版 in_array
 * @param search
 * @param arr
 * @returns {boolean}
 */
array.inArray = function (search, arr) {
  for (const i in arr) {
    if (arr[i] === search) {
      return true
    }
  }
  return false
}

/**
 * 判断是否为数组
 * @param {*} value 
 * @returns 
 */
array.isArray = function (value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}

/**
 * 生成笛卡尔积
 * @returns {*}
 */
array.descartes = function (value) {
  if( value.length < 2 ) return value[0] || [];

  return [].reduce.call(value, function(col, set) {
    let res = [];
    col.forEach(function(c) {
      set.forEach(function(s) {
        let t = [].concat( Array.isArray(c) ? c : [c] );
        t.push(s);
        res.push(t);
      })});
    return res;
  });
}

/**
 * 数组去重
 * @returns {*}
 */
array.unique = function (value) {
  return Array.from(new Set(value));
}

export default array
