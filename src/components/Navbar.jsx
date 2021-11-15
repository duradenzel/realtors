import React, {useState, useEffect} from 'react';
import {Button, Menu, Typography, Avatar} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MenuOutlined, OrderedListOutlined, LoginOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons'
import Axios from 'axios';

const Navbar = () => {
    const [cookie, setcookie] = useState(null);
    const [clear, setclear] = useState();
    const readCookie = async () => {
        const res = await Axios.get('/read-cookie');
        const data = res.data;
        console.log(data);
        setcookie(res.data);
    }
    readCookie();
    
    
   

    const clearCookie = async () => {
        const res = await Axios.get('/clear-cookie');
        console.log(res);
    }

   

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

       window.addEventListener('resize', handleResize);
       handleResize();
       return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
     if(screenSize < 768){
         setActiveMenu(false);
     }
     else{
         setActiveMenu(true);
     }
    }, [screenSize])
    

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                {/* <Avatar src={icon} size='large'/> */}
                <Typography.Title level={2} className='logo'>
                    <Link to='/' style={{color: 'white'}}>Realtors</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                        <MenuOutlined style={{color: 'white'}}/>  
                </Button>
            </div>
            {activeMenu && (
                <Menu  theme= 'dark' style={{backgroundColor: '#b688a7'}}>
                <Menu.Item icon={<HomeOutlined/>}>
                    <Link to='/' >Home</Link>
                </Menu.Item>
                {/* <Menu.Item icon={<OrderedListOutlined/>}>
                    <Link to='/'>Houses</Link>
                </Menu.Item> */}
              
                <Menu.Item icon={<UserOutlined/>} size>
                    <Link to='/Adminpanel'>Admin Panel</Link>
                </Menu.Item>, <Menu.Item icon={<LogoutOutlined/>} size>
                    <Link to='/' onClick={() => {clearCookie()}}>Logout</Link>
                </Menu.Item>
                
                
                <Menu.Item icon={<LoginOutlined/>}>
                    <Link to='/Login'>Login</Link>
                </Menu.Item>
                
                
             
            </Menu>
            )}
            
        </div>
    )
}

export default Navbar
