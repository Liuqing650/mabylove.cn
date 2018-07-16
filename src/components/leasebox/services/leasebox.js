import {request, config} from 'Utis';

// 创建订单
export function createOrder(params) {
  return request(`${config.host}/order`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

// 订单查询
export function getOrderList(params) {
  if (params.companyId) {
    return request(`${config.host}/company/${params.companyId}/orderList?orderId=${params.orderId}&status=${params.status}`, {
      method: 'GET'
    });
  }
  return request(`${config.host}/order/list?orderId=${params.orderId}&status=${params.status}`, {
    method: 'GET'
  });
}

// 更新订单
export function modifyOrder(params, orderId) {
  return request(`${config.host}/order/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify(params)
  });
}
