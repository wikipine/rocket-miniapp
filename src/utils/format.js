/**
 * 格式化函数
 */
const format = {};

/**
 * 数字万结尾
 * @param {*} value
 */
format.numberTenThousand = (value) => {
  if (value >= 10000) {
    // 大于1万的情况
    const formattedValue = (value / 10000).toFixed(1);
    return `${formattedValue}万`;
  } else {
    // 小于1万的情况
    return value.toString();
  }
};

export default format;
