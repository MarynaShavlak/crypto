import { Tag, Typography, Divider } from 'antd';
import CoinInfo from './CoinInfo';

const PriceChangeTag = ({ label, value }) => (
  <>
    <Typography.Text>{label}: </Typography.Text>
    <Tag color={value > 0 ? 'green' : 'red'}>{value}%</Tag>
  </>
);

const PriceDetails = ({ coin }) => (
  <>
    <Typography.Paragraph>
      <PriceChangeTag label="1 hour" value={coin.priceChange1h} />
      <PriceChangeTag label="1 day" value={coin.priceChange1d} />
      <PriceChangeTag label="1 week" value={coin.priceChange1w} />
    </Typography.Paragraph>
  </>
);

const CoinPrice = ({ coin }) => (
  <>
    <Typography.Paragraph>
      <Typography.Text>Price: </Typography.Text>
      {coin.price.toFixed(2)}$
    </Typography.Paragraph>
    <Typography.Paragraph>
      <Typography.Text>Price BTC: </Typography.Text>
      {coin.priceBtc}$
    </Typography.Paragraph>
    <Typography.Paragraph>
      <Typography.Text>Market Cap: </Typography.Text>
      {coin.marketCap}$
    </Typography.Paragraph>
  </>
);

const ContractAddress = ({ coin }) => (
  <>
    {coin.contractAddress && (
      <Typography.Paragraph>
        <Typography.Text>Contract Address: </Typography.Text>
        {coin.contractAddress}
      </Typography.Paragraph>
    )}
  </>
);

const CoinDetails = ({ coin }) => (
  <>
    <PriceDetails coin={coin} />
    <CoinPrice coin={coin} />
    <ContractAddress coin={coin} />
  </>
);

const CoinInfoModal = ({ coin }) => (
  <>
    <CoinInfo coin={coin} symbol />
    <Divider />
    <CoinDetails coin={coin} />
  </>
);

export default CoinInfoModal;
