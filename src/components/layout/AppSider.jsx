import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { capitalize } from '../utils';
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
  padding: '20px',
};

const AssetCard = ({ asset }) => {
  return (
    <Card style={{ marginBottom: '15px' }}>
      <StatisticItem asset={asset} />
      <ListItems asset={asset} />
    </Card>
  );
};

const StatisticItem = ({ asset }) => {
  return (
    <Statistic
      title={capitalize(asset.id)}
      value={asset.totalAmount}
      precision={2}
      valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
      prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      suffix="%"
    />
  );
};

const ListItems = ({ asset }) => {
  return (
    <List
      size="small"
      dataSource={[
        { title: 'Total Profit', value: asset.totalProfit, widthTag: true },
        { title: 'Asset Amount', value: asset.amount, isPlain: true },
        //  {title: 'Difference', value: asset.growPercent},
      ]}
      renderItem={item => (
        <List.Item>
          <span>{item.title} </span>
          <span>
            {item.widthTag && (
              <Tag color={asset.grow ? 'green' : 'red'}>
                {asset.growPercent} %
              </Tag>
            )}
            {item.isPlain && item.value}
            {!item.isPlain && (
              <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                {item.value.toFixed(2)}$
              </Typography.Text>
            )}
          </span>
        </List.Item>
      )}
    />
  );
};

const AppSider = () => {
  const { assets } = useContext(CryptoContext);

  const siderContent = assets.map(asset => (
    <AssetCard key={asset.id + Math.random() } asset={asset} />
  ));

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {siderContent}
    </Layout.Sider>
  );
};

export default AppSider;
