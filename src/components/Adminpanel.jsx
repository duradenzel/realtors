import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { Row, Col, Card, Typography, Table, Space, Input, InputNumber, Popconfirm, Form, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const {Title, Text} = Typography;

const Adminpanel = () => {
    const [dataSource, setDataSource] = useState([]);
    const [editingHouse, seteditingHouse] = useState(null);
    const [isEditing, setisEditing] = useState(false);
    const fetchData = () => {
        Axios({
            method: "GET",
            url: "http://localhost:3001/GetHouses",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
           setDataSource(res.data);  
        });    
    }

 

    useEffect(() => {
        fetchData();
        
      }, []);

      const columns =[
          {
              key:'1',
              title:'ID',
              dataIndex:'Id'
          },
          {
            key:'2',
            title:'Straat',
            dataIndex:'Straat'
        },
        {
            key:'3',
            title:'Plaats',
            dataIndex:'Plaats'
        },
        {
            key:'4',
            title:'PostCode',
            dataIndex:'Postcode'
        },
        {
            key:'5',
            title:'Provincie',
            dataIndex:'Provincie'
        },
        {
            key:'6',
            title:'Nummer',
            dataIndex:'Nummer'
        },
        {
            key:'7',
            title:'Kamers',
            dataIndex:'Kamers'
        },
        {
            key:'8',
            title:'Slaapkamers',
            dataIndex:'Slaapkamers'
        },
        {
            key:'9',
            title:'Bouwjaar',
            dataIndex:'Bouwjaar'
        },
        {
            key:'10',
            title:'Ligging',
            dataIndex:'Ligging'
        },
        {
            key:'11',
            title:'Oppervlakte',
            dataIndex:'Oppervlakte'
        },
        {
            key:'12',
            title:'Type',
            dataIndex:'Type'
        },
        {
            key:'13',
            title:'Datum',
            dataIndex:'Datum'
        },
        {
            key:'14',
            title:'Verkocht',
            dataIndex:'verkocht'
        },
        {
            key:'15',
            title:'Prijs',
            dataIndex:'Prijs',
            
        },
        {
          title: 'Action',
          key: 'action',
          
          render: (record) => (
            <Space size="small">
                <EditOutlined style={{color: 'blue'}} onClick={() => {onEditHouse(record)}}/>
                <DeleteOutlined style={{color: 'red', marginLeft:'12px'}} onClick={() => {onDeleteHouse(record)}}/>
            </Space>
          ),
        },
      ]

     

     const onAddHouse = () => {
         const newHouse = dataSource[dataSource.length - 1];
         
         setDataSource((pre) => {
            Axios({
                method: "POST",
                url: `http://localhost:3001/AddHouse`,
                data: newHouse,
                headers: {
                    "Content-Type": "application/json"
                 }
             }).then(res => {
                 
             });
            
             return [...pre, newHouse]
         })
     }

     const onEditHouse = (record) => {
       
        setisEditing(true);
        seteditingHouse(record);
     }

     const onDeleteHouse = (record) => {
       console.log(record);
       
      Modal.confirm({
          title: 'Weet je zeker dat je dit item wilt verwijderen?',
          okText:'Yes',
          okType:'danger',
          onOk: () => {
            setDataSource((pre) => {
                Axios({
                    method: "GET",
                    url: `http://localhost:3001/DeleteHouse/${record.Id}`,
                    headers: {
                        "Content-Type": "application/json"
                     }
                 }).then(res => {
                     
                     
                 });
                 return pre.filter(dataSource => dataSource.Id !== record.Id);
            })
          }
      })
           
       
    }

    const resetEditing = () => {
        setisEditing(false);
        seteditingHouse(null);
    }


    return (
        <>
        <Table size='small' columns={columns} dataSource={dataSource}>

        </Table>
        <Modal title='Edit House' visible={isEditing} onCancel={() => {resetEditing()}} okText='Save' onOk={() => {
            setDataSource(pre => {
                return pre?.map(house => {
                    if(house.Id === editingHouse.Id){
                        console.log(editingHouse);
                        Axios({
                            method: "PUT",
                            url: `http://localhost:3001/UpdateHouse`,
                            data: editingHouse,
                            headers: {
                                "Content-Type": "application/json"
                             }
                         }).then(res => {
                             
                         });

                        return editingHouse
                    }else{
                     
                        return house
                    }
                })
            }) ;resetEditing()}}>
            <Input name='straat' value={editingHouse?.Straat} onChange={(e) => {seteditingHouse((pre) => { return {...pre, Straat: e.target.value}})}}/>
            <Input name='plaats' value={editingHouse?.Plaats}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Plaats: e.target.value}})}}/>
            <Input name='postcode' value={editingHouse?.Postcode}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Postcode: e.target.value}})}}/>
            <Input name='provincie' value={editingHouse?.Provincie}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Provincie: e.target.value}})}}/>
            <Input name='nummers' value={editingHouse?.Nummers}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Nummers: e.target.value}})}}/>
            <Input name='kamers' value={editingHouse?.Kamers}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Kamers: e.target.value}})}}/>
            <Input name='slaapkamers' value={editingHouse?.Slaapkamers}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Slaapkamers: e.target.value}})}}/>
            <Input name='bouwjaar' value={editingHouse?.Bouwjaar}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Bouwjaar: e.target.value}})}}/>
            <Input name='ligging' value={editingHouse?.Ligging}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Ligging: e.target.value}})}}/>
            <Input name='oppervlakte' value={editingHouse?.Oppervlakte}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Oppervlakte: e.target.value}})}}/>
            <Input name='type' value={editingHouse?.Type}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Type: e.target.value}})}}/>
            <Input name='datum' value={editingHouse?.Datum}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Datum: e.target.value}})}}/>
            <Input name='verkocht' value={editingHouse?.Verkocht}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Verkocht: e.target.value}})}}/>
            <Input name='prijs' value={editingHouse?.Prijs}onChange={(e) => {seteditingHouse((pre) => { return {...pre, Prijs: e.target.value}})}}/>



        </Modal>
        <Button primary size='large' danger onClick={onAddHouse}>Add House</Button>
        </>
    )
}

export default Adminpanel
