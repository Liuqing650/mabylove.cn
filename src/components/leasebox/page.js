import React from 'react';
import {connect} from 'dva';
import {createForm} from 'rc-form';
import router from 'umi/router';
import {Toast, Button, WhiteSpace} from 'antd-mobile';
import FormItems from 'Components/form';
import * as utils from 'Helpers/utils';
import styles from './index.less';

const LeaseBox = ({
	dispatch,
	form,
	leasebox
}) => {
  const {submitData, isSubmit, isUpdate, type, orderId, companyId} = leasebox;
	// console.log('submitData----->', submitData);

	// 保存数据
  const onSave = () => {
    const value = form.getFieldsValue();
    dispatch({
      type: 'leasebox/saveForm',
      payload: value
    });
  };

  const onChange = (data) => {
    dispatch({
      type: 'leasebox/change',
      payload: data
    });
  };

  const onAddOrder = (data) => {
    if (isUpdate) {
      data.orderId = orderId;
      dispatch({
        type: 'leasebox/modifyOrder',
        payload: data
      });
    } else {
      dispatch({
        type: 'leasebox/addOrder',
        payload: data
      });
    }
  };
	// 提交数据
  const onSubmit = () => {
    form.validateFields({force: true}, (error) => {
      if (!error) {
        const value = form.getFieldsValue();
        value.requiredDate = utils.handleDateToStr(value.requiredDate);
        value.orderType = type;
        if (companyId) {
          value.createCompanyId = companyId;
        }
        // console.log('submit--->', value);
        onAddOrder(value);
				// form.resetFields();
      } else {
        Toast.fail('请检查必填项是否填写完整！', 1);
      }
    });
  };
  const inputConfig = [
    {
      name: '需求信息',
      inputs: [
        {
          name: 'productType',
          type: 'text',
          itemType: 'select',
          rules: [
						{required: true, message: '产品型号不能为空！'}
          ],
          required: true,
          label: '产品型号',
          arrow: 'horizontal',
          value: submitData.productType || '',
          space: false,
          searchBar: true,
          onClick(config) {
            console.log(config);
            onChange({config});
            const query = {
              productType: submitData.productType || '',
              model: 'leasebox',
              type
            };
            if (companyId) {
              query.companyId = companyId;
            }
            router.push({ pathname: '/select/productModel', query });
          }
        },
        {
          name: 'orderNum',
          type: 'number',
          itemType: 'input',
          placeholder: '请输入需求数量',
          value: submitData.orderNum || null,
          rules: [
            { required: true, message: '需求数量不能为空！' },
            { validator: utils.validNumber }
          ],
          required: true,
          label: '需求数量',
          space: false
        },
        {
          name: 'requiredDate',
          type: 'date',
          itemType: 'date',
          title: '请选择需求时间',
          value: submitData.requiredDate || null,
          rules: [
						{required: true, message: '需求时间不能为空！'}
          ],
          required: true,
          label: '需求时间',
          space: false,
          onChange(data) {
            submitData.requiredDate = data;
            onChange({submitData});
          }
        }
      ]
    },
    {
      name: '联系人',
      inputs: [
        {
          name: 'contact',
          type: 'text',
          itemType: 'input',
          placeholder: '请输入联系人',
          value: submitData.contact || null,
          rules: [
            { required: true, message: '联系人不能为空！' }
          ],
          required: true,
          label: '联系人',
          space: false
        },
        {
          name: 'phone',
          type: 'number',
          itemType: 'input',
          maxLength: 11,
          placeholder: '请输入联系电话',
          value: submitData.phone || null,
          rules: [
						{required: true, message: '联系电话不能为空！'},
            { validator: utils.validPhone }
          ],
          required: true,
          label: '联系电话',
          space: false
        }
      ]
    },
    {
      name: '备注说明',
      inputs: [
        {
          name: 'remark',
          type: 'text',
          itemType: 'textArea',
          placeholder: '此处可输入备注',
          value: submitData.remark || null,
          rules: [],
          required: false,
          rows: 2,
          label: null,
          space: false
        }
      ]
    }
  ];
  const inputItemsProps = {
    configArr: inputConfig,
    form,
    onBlur() { // 保存数据
      onSave();
			// console.log('本地数据---->', localStorage.leasebox);
    }
  };
  return (
    <div className={styles.wrap}>
      <form>
        <FormItems {...inputItemsProps} />
        <WhiteSpace size="xl" />
        <Button disabled={isSubmit} type="primary" onClick={onSubmit}>{isUpdate ? '修改订单' : '立即下单'}</Button>
      </form>
    </div>
  );
};

export default connect(({leasebox}) => ({leasebox}))(createForm()(LeaseBox));
