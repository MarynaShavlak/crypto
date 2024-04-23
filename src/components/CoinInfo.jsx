import {Flex, Typography} from 'antd'
const CoinInfo = ({coin, symbol}) => {
    return ( 
        <Flex>
        <img src={coin.icon} alt={coin.name} style={{width: 40, height: 40, marginRight: 15}}/>
        <Typography.Title level={2} style={{margin: 0}}>{symbol && <span>({coin.symbol})</span>}{coin.name}</Typography.Title>
    </Flex>
     );
}
 
export default CoinInfo;