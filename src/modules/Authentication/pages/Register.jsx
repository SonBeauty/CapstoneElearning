import authAPI from "apis/authAPI";
import useRequest from "hooks/useRequest";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Checkbox, Form, Input, notification } from "antd";
import { Content } from "antd/lib/layout/layout";
import { LockOutlined } from '@ant-design/icons';
import './style.css'


// data: taiKhoan, matKhau, email, hoTen, soDt

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });
  const navigate = useNavigate();

  const { data: handleRegister, isLoading } = useRequest(
    (values) => authAPI.register(values),
    { isManual: true }
  );

  const onSubmit = async (values) => {
    try {
      await handleRegister(values);

      // Sau khi đăng ký thành công, ta cần chuyển user về trang login
      notification.success({
        message:'Đăng ký thành công'
      })
      setTimeout(() => {
        navigate("/login");

      }, 2000);
    } catch (error) {
      // Đăng ký thất bại show error ra cho user thấy
      notification.error({
        message: "Đăng ký thất bại",
        description: error,
      });
    }
  };

  const onError = (error) => {
    console.log(error);
  };


  const onFinish = (values) => {
    handleSubmit(onSubmit(values))
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <Content style={{
        position: "relative",
        top: "100px",
        maxWidth: "444px",
        background: "#fff",
        margin: "0 auto",
        borderRadius: '5px'
      }}>
        <div className='d-flex justify-content-center'>
          <Avatar style={{ marginTop: '20px', backgroundColor: 'rgb(245, 106, 0)' }} icon={<LockOutlined />} />
        </div>
        <div className='d-flex justify-content-center mb-4'>

          <h3>Đăng ký</h3>
        </div>
        <Form

          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ justifyContent: 'center' }}
            name="taiKhoan"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{ height: "50px" }} placeholder="Tài khoản"
            />
          </Form.Item>

          <Form.Item
            style={{ justifyContent: 'center' }}

            name="matKhau"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >

            <Input.Password style={{ height: "50px" }} placeholder="Mật khẩu" />
          </Form.Item>


          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Email không đúng định dạng',
              },
              {
                required: true,
                message: 'Email không được bỏ trống',
              },
            ]}
          >
            <Input style={{ height: "50px" }} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="soDt"
            rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}

          >
            <Input type='text' style={{ height: "50px" }} placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="hoTen"
            rules={[{ required: true, message: 'Họ tên không được để trống' }]}

          >
            <Input style={{ height: "50px" }} placeholder="Họ tên" />
          </Form.Item>





          <Form.Item wrapperCol={{ span: 16 }}>
            <Button style={{ background: '#fb4226', color: '#fff', marginBottom: '20px', width: '100%' }} htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default Register;
