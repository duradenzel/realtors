import React from 'react';
import { Typography, Row, Col, Statistic, Layout } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import Houses from './Houses';



const { Title } = Typography;

const Homepage = () => {

   

    return (
        <>
      

        <div className='home-heading-container'>
        <Title level={2} className='home-title' style={{color: '#4dc9a0'}}>Available Houses</Title>
        {/* <Title level={3} className='show-more'><Link to='/' style={{color: '#3BBA9C', float: 'right'}}>Show More</Link></Title> */}
        </div>
        <Houses/>
        </>
    )
}

export default Homepage
