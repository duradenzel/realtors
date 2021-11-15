import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import Axios from 'axios';
import { Col, Typography } from 'antd';
const {Text, Title} = Typography;
const Housedetails = () => {
    
    const [house, sethouse] = useState([])
    const {id} = useParams();
    
    const fetchHouse = () => {
        
        Axios({
            method: "GET",
            url: `http://localhost:3001/GetHouse/${id}`,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            
            sethouse(res.data[0]);
            
        });    
    }
    
    
    useEffect(() => {
        fetchHouse();
    }, []);
    if (!house) return 'Fetching...'
    
    return (
        <div>
            
          
            <Col className='stats-container' style={{justifyContent: 'center'}}>
                <Col className='coin-value-statistics'>
                <Col className='coin-value-statistics-heading'>
                       <Title level={3} className='coin-details-heading' style={{color: '#4dc9a0'}}>
                           {house.Straat} {house.Nummer} Statistics
                       </Title>
                   </Col>
                   
                   {Object.keys(house)?.map((key, i) => (
                       
                    <Col className='house-stats'>
                        <Col className='house-stats-name'>
                            <Text>{key}</Text>
                            <Text></Text>
                        </Col>
                        <Text className='stats'>{house[key]}</Text>
                    </Col>
                   ))}
                </Col>
            </Col>
                  
        </div>
    )
}

export default Housedetails
