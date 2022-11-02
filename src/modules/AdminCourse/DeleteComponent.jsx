import { notification, Popconfirm, Tooltip } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import axiosClient from "apis/axiosClient";

const DeleteComponent = ({ course, change }) => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        handleDelete(course)

    
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleChange = () => {
         change(!change)
    }


    const handleDelete = async (course) => {
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

        }
    }

    return (
        <>
            <Popconfirm
                title="Title"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{
                    loading: confirmLoading,
                }}
                onCancel={handleCancel}
            >
                <Tooltip
                    title="Xoá"
                    overlayStyle={{ marginLeft: "45px", display:`${open?"none":"block"}` }}
                >
                    <DeleteOutlined onClick={() => {console.log(course); setOpen(!open) }}
                    style={{ color: "red", fontSize: '25px', marginLeft: '30px' }} />
                </Tooltip>
            </Popconfirm>
        </>
    )
}


export default DeleteComponent