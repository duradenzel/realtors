import React, {useState} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Axios from 'axios';
const Login =  () => {
  
  

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        auth(values);

      };

      const auth = async (values) => {
        const {username, password} = values;
        try {
          const res = await Axios.get('/authenticate', { auth: { username, password} });
          

          console.log(res.data);
        } catch (e) {
          console.log(e);
        }
      }; 
    return (
       <>
       <div className='login-form-container'>

       <Form
      name="normal_login"
      className="login-form"
      size='large'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
       
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="" style={{color:'#4dc9a0'}}>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor: '#4dc9a0', border: 'none'}}>
          Log in
        </Button>
       
      </Form.Item>
    </Form>
       </div>
       </>
    )
}

export default Login
