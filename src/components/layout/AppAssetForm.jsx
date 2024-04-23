import React, { useState, useRef } from 'react';
import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfo from '../CoinInfo';

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const CoinSelect = ({ crypto, onSelect }) => {
  return (
    <Select
      style={{ width: '100%' }}
      onSelect={onSelect}
      placeholder="Select coin"
      options={crypto.map(coin => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon,
      }))}
      optionRender={option => (
        <Space>
          <img
            style={{ width: 25 }}
            src={option.data.icon}
            alt={option.data.label}
          />
          {''}
          {option.data.label}
        </Space>
      )}
    />
  );
};

const AssetResult = ({ onClose, asset }) => {
  return (
    <Result
      status="success"
      title="New Asset"
      subTitle={`Add ${asset.amount} of ${asset.name} by price ${asset.price}`}
      extra={[
        <Button type="primary" key="console" onClick={onClose}>
          Close
        </Button>,
      ]}
    />
  );
};

const FormLogic = {
  onFinish: (values, coin, addAsset, assetRef, setSubmit) => {
    console.log(values);
    const newAsset = {
      id: coin.id,
      name: coin.name,
      amount: values.amount,
      price: values.price,
      date: values.date ? values.date.$d : new Date(),
    };
    assetRef.current = newAsset;
    setSubmit(true);
    addAsset(newAsset);
  },
  handleAmountChange: (value, form) => {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  },
  handlePriceChange: (value, form) => {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  },
};

const AppAssetForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submit, setSubmit] = useState(false);
  const assetRef = useRef();

  if (submit) {
    return <AssetResult onClose={onClose} asset={assetRef.current} />;
  }

  if (!coin) {
    return (
      <CoinSelect
        crypto={crypto}
        onSelect={v => setCoin(crypto.find(c => c.id == v))}
      />
    );
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={values =>
        FormLogic.onFinish(values, coin, addAsset, assetRef, setSubmit)
      }
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, type: 'number', min: 0 }]}
      >
        <InputNumber
          placeholder="Enter coin"
          onChange={value => FormLogic.handleAmountChange(value, form)}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber
          onChange={value => FormLogic.handlePriceChange(value, form)}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AppAssetForm;
