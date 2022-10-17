import { Breadcrumb, Button, Input, Layout, Modal, notification, Select, Table, Tooltip } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import axiosClient from 'apis/axiosClient'
import userAPI from 'apis/userAPI'
import useRequest from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import uuid from 'react-uuid'
import AddUserModal from './AddUserModal'
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';



const User = () => {


  /*HOOKS */
  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [change, setChange] = useState(true)
  const [searchText, setSearchText] = useState(null)
  const [data2,setData2] = useState(null)


  //==============================

  // const onSearch = (e) => {
  //   const reg = new RegExp(e.target.value, 'gi');
  //   const filteredData = map(data, record => {
  //     const userNameMatch = get(record, "fieldtext.userName").match(reg)
  //     if (!userNameMatch) {
  //       return null;

  //     }
  //     return record
  //   }).filter(record => !!record)

  //   setSearchText(e.target.value)
  //   users

  // }



  const handleEdit = (user) => {
    setVisible(true)
    setEdit(user)

  }

  const handleDelete = async (user) => {
    try {

      await axiosClient.delete(`QuanLyNguoiDung/XoaNguoiDung/`, { params: { TaiKhoan: user.taiKhoan } })
      notification.success({
        message: 'Xoá người dùng thành công',
      })
      setChange(!change)
    } catch (error) {
      notification.error({
        message: 'Xoá người dùng thất bại',
        description: error
      })

    }
  }

  const {
    data: users,
    isLoading,
    error,
  } = useRequest(() => userAPI.getUsers(), { deps: [change] })


useEffect(() =>{
  setData2(users)    
},[users])





  const columns = [
    {
      title: 'STT',
      render: (text, record) => { return users.indexOf(record) + 1 },

      sorter: (a, b) => users.indexOf(a) - users.indexOf(b),
      sortDirections: ['descend'],



    },

    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      ellipsis: 'true',
      key: 'taiKhoan'


    },


    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      ellipsis: 'true',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: 'true',


    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      ellipsis: 'true',


    },

    {
      title: 'Mã loại người dùng',
      dataIndex: "maLoaiNguoiDung",
      ellipsis: 'true',
    },
    {
      title: "Hành động",
      render: (user) => <div className='d-flex flex-wrap'>

        <Tooltip title='Sửa'>
          <EditOutlined onClick={() => handleEdit(user)} style={{ color: "blue", fontSize: '25px' }} />
        </Tooltip>
        <Tooltip title='Xoá' overlayStyle={{ marginLeft: "45px" }}        >
          <DeleteOutlined onClick={() => handleDelete(user)} style={{ color: "red", fontSize: '25px', marginLeft: '30px' }} />
        </Tooltip>


      </div>,



    }

  ];


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSubmit = async (values) => {
    try {
      await axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", { ...values, maNhom: "GP01" }

      )
      notification.success({ message: 'Cập nhật người dùng thành công' })
      setChange(!change)

    }
    catch (error) {
      notification.error({
        message: 'Cập nhật người dùng thất bại',
        description: error
      })
    }
  }


  const onSubmitSuccess = () => {
    console.log("lmao")
    setChange(!change)
  }



  const handleSelectBox = (e) => {
    setEdit((pre) => {
      return { ...pre, maLoaiNguoiDung: e };
    });


  }

  const [isOpen, setIsOpen] = useState(false)


  const onClose = () => { setIsOpen(false) }



  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
      maLoaiNguoiDung: "",
    },
    mode: "onTouched",
  });



  return (
    <>

      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>

        </Breadcrumb>

        <div className='d-flex justify-content-end'>
          <Button
            type='primary'
            onClick={() => setIsOpen(!isOpen)}

          >
            Thêm người dùng</Button>
        </div>



        <AddUserModal isOpen={isOpen} onClose={onClose} onSubmitSuccess={onSubmitSuccess}></AddUserModal>

        <Modal
          confirmLoading={confirmLoading}

          title='Cập nhật người dùng'
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={async () => {
            onSubmit(edit)
            setConfirmLoading(true);
            setTimeout(() => {
              setVisible(false);
              setConfirmLoading(false);
            }, 1000);

          }}

          okText='Cập nhật'
          cancelText='Huỷ'


        >


          <Input

            addonBefore={"Tài khoản"}
            value={edit?.taiKhoan}
            disabled={true}

          />

          <Input

            addonBefore={"Mật khẩu"}
            value={edit?.matKhau}
            onChange={(e) => {
              setEdit((pre) => {
                return { ...pre, matKhau: e.target.value };
              });
            }}



          />

          <Input

            addonBefore={"Họ tên"}
            value={edit?.hoTen}
            onChange={(e) => {
              setEdit((pre) => {
                return { ...pre, hoTen: e.target.value };
              });
            }} />

          <Input

            addonBefore={"Email"}
            value={edit?.email}
            onChange={(e) => {
              setEdit((pre) => {
                return { ...pre, email: e.target.value };
              });
            }} />

          <Input

            addonBefore={"Số điện thoại"}
            value={edit?.soDt}
            onChange={(e) => {
              setEdit((pre) => {
                return { ...pre, soDT: e.target.value };
              });
            }} />



          <span className="ant-input-group-wrapper"
          ><span className="ant-input-wrapper ant-input-group"
          ><span className="ant-input-group-addon">Mã loại người dùng</span
          ><Select value={edit?.maLoaiNguoiDung} onChange={(value) => handleSelectBox(value)} >

                <Select.Option value='GV'>Giáo vụ</Select.Option>
                <Select.Option value='HV'>Học viên</Select.Option>
              </Select>
            </span
            ></span>



          {/* </div> */}
        </Modal>
        <h1>Quản lý người dùng</h1>
        <Input placeholder="Basic usage" 
        // onChange={onSearch} 
        />
        <Table columns={columns}
          dataSource={users}
          onChange={onChange} rowKey={() => uuid()} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </>
  )

}

export default User