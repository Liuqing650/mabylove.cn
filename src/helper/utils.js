import {notification} from 'antd';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import 'moment/locale/zh-cn';

const debug = false;
// 消息提示
export function notice(message, status = 'success', duration = 1, description = null) {
  notification[status]({
    message,
    description,
    duration
  });
}

// 模态框
export function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

// 菜单解析
export function analysisMenus(menus, dict) {
  const output = [];
  if (!menus || menus.length === 0) {
    return output;
  } else if (debug) {
    return dict;
  }
  dict.map((item) => {
    const temp = {};
    menus.map((menu) => {
      if (item[menu.menuName]) {
        const menuItem = item[menu.menuName];
        menuItem.code = menu.code;
        temp[menu.menuName] = menuItem;
      }
    });
    output.push(temp);
  });
  return output;
}


/**
 * 平台判断
 * @param {string} expect 期望值
 * @return {boolean | string}  是否为测试平台 | 平台名称
 */
export function platform(expect) {
  let real = '';
  if (/android/i.test(navigator.userAgent)) {
    real = 'Android'; // Android平台下浏览器
  }
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    real = 'iOS'; // iOS平台下浏览器
  }
  if (/Linux/i.test(navigator.userAgent)) {
    real = 'Linux'; // Linux平台下浏览器
  }
  if (/Linux/i.test(navigator.platform)) {
    real = 'Linux system'; // Linux操作系统平台
  }
  if (/MicroMessenger/i.test(navigator.userAgent)) {
    real = 'MicroMessenger'; // 微信平台下浏览器
  }
  if (expect) {
    return expect === real;
  }
  return real;
}

// 时间转换函数
export function handleStrToDate(strDate) {
  if (!strDate) {
    return new Date(moment().format());
  }
  return new Date(moment(strDate).format());
}

export function handleDateToStr(date) {
  if (!date) {
    return null;
  }
  return moment(date).format('YYYY-MM-DD');
}

export function getNowDate(isDate) {
  if (isDate) {
    return new Date(moment().format());
  }
  return moment().format('YYYY-MM-DD');
}

export function getSubDate(backIndex, isDate) {
  if (isDate) {
    return new Date(moment().subtract(backIndex || 1, 'month').format('YYYY-MM-DD'));
  }
  return moment().subtract(backIndex || 1, 'month').format('YYYY-MM-DD');
}


// 手机号码校验
export function validPhone(rule, value, callback) {
  if (value) {
    if (/^1([3-5]|7|8)\d{9}$/.test(value)) {
      callback();
    }
    callback(new Error('联系电话格式有误!'));
  }
  callback();
}

// 数字校验
export function validNumber(rule, value, callback) {
  if (value) {
    if (Number(value) <= 0) {
      callback(new Error('需求数量必须大于0!'));
    }
    callback();
  }
  callback();
}
// 坏箱数量
export function validBrokenNumber(rule, value, callback) {
  if (value) {
    if (Number(value) <= 0) {
      callback(new Error('坏箱数量必须大于0!'));
    }
    callback();
  }
  callback();
}

// 社会信用编码
export function validCode(rule, value, callback) {
  if (value) {
    if (!/^[A-Za-z0-9]+$/.test(value)) {
      callback(new Error('统一社会信用编码由字母和数字组成!'));
    } else if (value.length !== 18) {
      callback(new Error('统一社会信用编码为18位!'));
    }
    callback();
  }
  callback();
}

export function modifyQuery(params) {
  let output = '';
  if (!params || Object.keys(params).length === 0) {
    return output;
  }
  Object.keys(params).map((key, index) => {
    if (params[key]) {
      output += `${!output ? '?' : '&'}${key}=${params[key]}`;
    }
  });
  return output;
}

/**
 * 图片数据处理
 * @param {any} data urls数组或者formData对象
 * @param {boolean} isSubmit 时候为提交数据
 */
export function handlePicData(data, isSubmit) {
  const output = isSubmit ? {} : [];
  const config = ['photo1Url', 'photo2Url', 'photo3Url'];
  const urlsToForm = () => {
    if (!data || data.length === 0) {
      return {};
    }
    config.map((item, index) => {
      output[item] = data[index] ? data[index].url : null;
    });
  };
  const formToUrls = () => {
    if (!data || Object.keys(data).length === 0) {
      return {};
    }
    config.map((item) => {
      if (data[item]) {
        const url = data[item];
        output.push({ url, id: uuidv1() });
      }
    });
  };
  // 执行
  isSubmit ? urlsToForm() : formToUrls();
  return output;
}

// 城市数据提交
export function handleArea(data, isSubmit, areaData) {
  if (isSubmit) {
    const length = data.length;
    return length > 1 ? data[1] : (data[0] || '');
  }
  const loop = (arr, id) => {
    let output = [];
    arr.map((item, index) => {
      if (item.id === id) {
        if (item.leaf) {
          output = loop(arr, item.parentId);
        }
        output.push(item.id);
      }
    });
    return output;
  };
  return loop(areaData, data);
}
