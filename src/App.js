
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {Layout, Typography, Space} from 'antd';
import {Navbar, Homepage, Housedetails, Login, Adminpanel} from './components/';
import { CopyrightCircleOutlined } from '@ant-design/icons';
const {Title, Text} = Typography;

function App() {


  return (
    <div className='app'>
            <div className='navbar'>
                <Navbar/>
            </div>
            
          <div className='main'>
            <Layout>
              <div className='routes'>
                <Routes>
                  <Route path='/' element={<Homepage/>}/>
                  <Route path='/Housedetails' element={<Login/>}/>
                  <Route path='/Login' element={<Login/>}/>
                  <Route path='/Adminpanel' element={<Adminpanel/>}/>
                  <Route path='/House/:id' element={<Housedetails/>}/>
                </Routes>
              
              </div>
            </Layout>

            <div className='footer' >
                <Title level={5} style={{color: 'white', fontSize:'20px'}}>
                    Realtors <br/>
                </Title>
                <Space>
                    
           
                    <Text style={{color: 'white'}}><CopyrightCircleOutlined/>Denzel Huijbers 2021</Text>
                </Space>
            </div>

          </div>

        </div>
  );
}

export default App;
