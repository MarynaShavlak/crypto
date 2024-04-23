import { Layout } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { useContext, useEffect } from 'react';

import CryptoContext from '../../context/crypto-context';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 64px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
  padding: '15px',
};

const AppContent = () => {
  const { assets } = useContext(CryptoContext);

  const totalProfit = assets
    .reduce((acc, item) => {
      return acc + item.totalProfit;
    }, 0)
    .toFixed(2);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title
        level={2}
        style={{ color: 'white', textAlign: 'left', marginTop: '30px' }}
      >
        Total profit: {totalProfit}$
      </Typography.Title>
    </Layout.Content>
  );
};

export default AppContent;
