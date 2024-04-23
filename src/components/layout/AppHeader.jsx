import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AppAssetForm from './AppAssetForm';

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const OptionItem = ({ option }) => {
  return (
    <Space>
      <Icon src={option.data.icon} alt={option.data.label} />
      {option.data.label}
    </Space>
  );
};

const Icon = ({ src, alt }) => {
  return <img style={{ width: 25 }} src={src} alt={alt} />;
};

const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = event => {
      if (event.key == '/') {
        setSelect(true);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find(c => c.id == value));
    setModal(true);
  }

  function closeDrawer() {
    setDrawer(false);
  }
  function openDrawer() {
    setDrawer(true);
  }
  function closeModal() {
    setModal(false);
  }

  const options = crypto.map(coin => ({
    label: coin.name,
    value: coin.id,
    icon: coin.icon,
  }));

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: '250px',
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        value="press / to open"
        optionLabelProp="label"
        options={options}
        optionRender={option => <OptionItem option={option} />}
      />
      <Button type="primary" onClick={openDrawer}>
        Add asset
      </Button>
      <Modal
        title="Basic Modal"
        open={modal}
        onCancel={closeModal}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={500}
        title="Add coin"
        onClose={closeDrawer}
        open={drawer}
        destroyOnClose
      >
        <AppAssetForm onClose={closeDrawer} />
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
