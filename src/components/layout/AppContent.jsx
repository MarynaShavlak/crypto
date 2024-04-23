import { Layout } from 'antd';
import Typography from 'antd/es/typography/Typography';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 64px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
    padding: '15px'
  };
  
const AppContent = () => {
    return ( 
        <Layout.Content style={contentStyle}>
          <Typography.Title level={2} style={{color: 'white', textAlign: 'left', marginTop: '30px'}}>Sum: 2100$</Typography.Title>
        </Layout.Content>
     );
}
 
export default AppContent;