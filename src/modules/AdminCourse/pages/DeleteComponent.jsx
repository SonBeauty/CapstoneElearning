import { notification, Popconfirm, Tooltip } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import axiosClient from "apis/axiosClient";
import "./style.css"

const DeleteComponent = ({ course, change, user, type }) => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        handleDelete(course,user)


    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleChange = () => {
        change(!change)
    }


    const handleDelete = async (course, user) => {
        if (type != 'user') {
            try {


                await axiosClient.delete(`QuanLyKhoaHoc/XoaKhoaHoc`, { params: { MaKhoaHoc: course.maKhoaHoc } })
                notification.success({
                    message: 'Xoá khoá học thành công',
                })
                setOpen(false);
                setConfirmLoading(false);

                handleChange()
            } catch (error) {
                notification.error({
                    message: 'Xoá khoá học thất bại',
                    description: error
                })
                setOpen(false);
                setConfirmLoading(false);

            }
        }
        else {
            try {

                await axiosClient.delete(`QuanLyNguoiDung/XoaNguoiDung/`, { params: { TaiKhoan: user.taiKhoan } })
                notification.success({
                    message: 'Xoá người dùng thành công',
                })
                setOpen(false);
                setConfirmLoading(false);

                handleChange()
            } catch (error) {
                notification.error({
                    message: 'Xoá người dùng thất bại',
                    description: error
                })
                setOpen(false);
                setConfirmLoading(false);

            }
        }
    }
    return (
        <>

            <Popconfirm

                title="Bạn có chắc chắn muốn xoá không"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{
                    loading: confirmLoading,
                }}
                onCancel={handleCancel}
            >
                <Tooltip
                    title="Xoá"
                    overlayStyle={{ marginLeft: "45px", display: `${open ? "none" : ""}` }}
                >
                    <DeleteOutlined onClick={() => { setOpen(!open) }}
                        style={{ color: "red", fontSize: '25px', marginLeft: '30px' }} />
                </Tooltip>
            </Popconfirm>

        </>
    )



}


export default DeleteComponent