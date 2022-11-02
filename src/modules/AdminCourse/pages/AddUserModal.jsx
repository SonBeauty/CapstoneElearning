import { Input, Modal, Select, notification, Form } from 'antd';
import React, { useState } from 'react'
import useRequest from 'hooks/useRequest'
import axiosClient from 'apis/axiosClient'
import userAPI from 'apis/userAPI'
import { Controller, useForm } from 'react-hook-form';


const AddUserModal = ({ isOpen = false, onClose, onSubmitSuccess }) => {

    const [edit, setEdit] = useState({ maLoaiNguoiDung: "GV" })
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [change, setChange] = useState(true)

    const [form] = Form.useForm();







    const onSubmit = async (values) => {
        try {
            await axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", { ...values, maNhom: "GP01" }

            )
            notification.success({ message: 'Thêm người dùng thành công' })
            setChange(!change)
            onSubmitSuccess()
            setConfirmLoading(true);
            setTimeout(() => {
                onClose();
                setConfirmLoading(false);
                form.resetFields()
            }, 1000);
        }
        catch (error) {
            notification.error({
                message: 'Thêm người dùng thất bại',
                description: error
            })
        }
    }
    const handleSelectBox = (e) => {
        setEdit((pre) => {
            return { ...pre, maLoaiNguoiDung: e };
        });


    }
    const handleSubmit = () => {
        onSubmit(edit)

    }
    const {
        register,

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
        // Chế độ kích hoạt validation, mặc định là onSubmit
        mode: "onTouched",
    });

    return (
        <Modal
            confirmLoading={confirmLoading}
            title='Thêm người dùng'
            visible={isOpen}
            onCancel={onClose}
            onOk={
                form.submit
               

            }


            okText='Thêm người dùng'


        >

            <Form form={form} onFinish={handleSubmit}>


                <Form.Item name='taiKhoan'
                    rules={[{ required: true, message: "Tài khoản không được để trống" }]}>
                    <Input
                        addonBefore={"Tài khoản"}
                        onChange={(e) => {
                            setEdit((pre) => {
                                return { ...pre, taiKhoan: e.target.value };
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item name='matKhau'
                    rules={[{ required: true, message: "Mật khẩu không được để trống" }]}>
                    <Input
                        addonBefore={"Mật khẩu"}
                        onChange={(e) => {
                            setEdit((pre) => {
                                return { ...pre, matKhau: e.target.value };
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item name='hoTen'
                    rules={[
                        {
                            required: true,
                            message: "Họ tên không được để trống"
                        }]}>
                    <Input
                        addonBefore={"Họ tên"}
                        onChange={(e) => {
                            setEdit((pre) => {
                                return { ...pre, hoTen: e.target.value };
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item name='email'
                    rules={[{
                        type: 'email',
                        message: 'Email không đúng định dạng',
                    },
                    {
                        required: true,
                        message: "Email không được để trống"
                    }]}>
                    <Input
                        addonBefore={"Email"}
                        onChange={(e) => {
                            setEdit((pre) => {
                                return { ...pre, email: e.target.value };
                            });
                        }}
                    />
                </Form.Item>

                <Form.Item name='soDt'
                    rules={[
                        {
                            required: true,
                            message: "Số điện thoại không được để trống"
                        }]}>
                    <Input
                        addonBefore={"Số điện thoại"}
                        onChange={(e) => {
                            setEdit((pre) => {
                                return { ...pre, soDt: e.target.value };
                            });
                        }}
                    />
                </Form.Item>




{/* 
                <Input
                    addonBefore={"Mật khẩu"}
                    onChange={(e) => {
                        setEdit((pre) => {
                            return { ...pre, matKhau: e.target.value };
                        });
                    }} />

                <Input
                    addonBefore={"Họ tên"}
                    onChange={(e) => {
                        setEdit((pre) => {
                            return { ...pre, hoTen: e.target.value };
                        });
                    }} />

                <Input
                    addonBefore={"Email"}
                    onChange={(e) => {
                        setEdit((pre) => {
                            return { ...pre, email: e.target.value };
                        });
                    }} />

                <Input
                    addonBefore={"Số điện thoại"}
                    onChange={(e) => {
                        setEdit((pre) => {
                            return { ...pre, soDT: e.target.value };
                        });
                    }} /> */}


                <span className="ant-input-group-wrapper"
                ><span className="ant-input-wrapper ant-input-group"
                ><span className="ant-input-group-addon">Mã loại người dùng</span
                ><Select defaultValue="Giáo vụ" onChange={(value) => handleSelectBox(value)} >
 
                            <Select.Option value='GV'>Giáo vụ</Select.Option>
                            <Select.Option value='HV'>Học viên</Select.Option>
                        </Select>
                    </span>
                </span>
            </Form>

        </Modal >
    )
}

export default AddUserModal