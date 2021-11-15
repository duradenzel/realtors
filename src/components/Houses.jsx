import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { DollarCircleOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';



const Houses = () => {

    const [houses, setHouses] = useState([])

    const fetchData = () => {
        Axios({
            method: "GET",
            url: "http://localhost:3001/GetHouses",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
           setHouses(res.data);
           console.log(res.data);
          });    
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <>

        <Row gutter={[32,32]} className='house-card-container'>
            {houses?.map((house) => (
               <Col xs={24} md={12} lg={12} className='house-card' key={house.Id} >
                   <Link to={`/house/${house.Id}`} >
                       <Card title={`${house.Straat} ${house.Nummer}`} hoverable >
                           <Row>
                                <Col>
                                    <p><HomeOutlined/>{house.Plaats}</p>                           
                                    <p><EnvironmentOutlined/>{house.Provincie}</p>
                                </Col>
                                <Col offset={6}>
                                    <p><EnvironmentOutlined/>{house.PostCode}</p>
                                    <p> <DollarCircleOutlined/>€{house.Prijs}</p>            
                                </Col>
                           </Row>
                          
                       </Card>
                   </Link>
               </Col> 
            ))}
        </Row>
        </>
    )
}

export default Houses
