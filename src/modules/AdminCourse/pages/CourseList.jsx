import { Breadcrumb, DatePicker, Form, Input, Modal, notification, Popconfirm, Popover, Select, Switch, Table, Tooltip } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import axiosClient from 'apis/axiosClient'
import courseAPI from 'apis/courseAPI'
import useRequest from 'hooks/useRequest'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import DeleteComponent from './DeleteComponent'












const CourseList = () => {
  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(null)
  const [edit2, setEdit2] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [change, setChange] = useState(true)
  const [imgPreview, setImgPreview] = useState("");
  const [files, setFile] = useState(null)



  const navigate = useNavigate()
  const { form } = Form.useForm()

  const {
    data: courses,
    isLoading,
    error,
  } = useRequest(() => courseAPI.getCourses(), { deps: [change] })

  const onSubmit = async (values) => {
    try {
      if (files) {
        const formData = new FormData();
        formData.append('file', files ? files : edit?.hinhAnh)
        // formData.append('maKhoaHoc', edit?.maKhoaHoc)
        formData.append('tenKhoaHoc', edit?.tenKhoaHoc)
        // formData.append('maNhom',edit?.maNhom)

        // // Duyệt qua từng thuộc tính trong object movie và thêm vào formData
        // for (let key in values) {
        //   formData.append(key, values[key]);
        // }

        return await axiosClient.put("QuanLyKhoaHoc/CapNhatKhoaHoc", { ...values, danhGia: 0, luotXem: 0 })
          .then(async () => {
            await axiosClient.post("QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", formData)
              .then(() => {
                notification.success({ message: 'Cập nhật khoá học thành công' });
                setChange(!change)


              }
              )
              .catch((error) => notification.error({
                message: "Cập nhật khoá học thất bại",
                description: error
              }))

          })
          .catch(() => { console.log("lmao") })

      }
      else {
        return await axiosClient.put("QuanLyKhoaHoc/CapNhatKhoaHoc", { ...values, danhGia: 0, luotXem: 0 })
          .then(() => {
            notification.success({ message: 'Cập nhật khoá học thành công' });
            setChange(!change)
          })
      }


    }
    catch (error) {
      notification.error({
        message: 'Cập nhật khoá học thất bại',
        description: error
      })
    }
  }



  const handleEdit = (course) => {
    setImgPreview(course.hinhAnh);
    if (imgPreview) {
      document.getElementById("hinhAnh").value = ""
    }
    setVisible(true)
    setEdit({
      ...course
    })
    setFile(null)
  }

  const handleDelete = async (course) => {
    try {


      await axiosClient.delete(`QuanLyKhoaHoc/XoaKhoaHoc`, { params: { MaKhoaHoc: course.maKhoaHoc } })
      notification.success({
        message: 'Xoá khoá học thành công',
      })
      setChange(!change)

    } catch (error) {
      notification.error({
        message: 'Xoá khoá học thất bại',
        description: error
      })

    }
  }

  const {
    setValue, handleSubmit, getValues
  } = useForm({
    defaultValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: "",
      hinhAnh: "",
      maNhom: "",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: ""
    }
  })




  const columns = [
    {
      title: 'STT',
      render: (text, record) => { return courses.indexOf(record) + 1 },

      sorter: (a, b) => courses.indexOf(a) - courses.indexOf(b),
      sortDirections: ['descend'],

      width: "5%"

    },
    {
      title: 'Mã khoá học',
      dataIndex: "maKhoaHoc",

    },
    {
      title: 'Tên khoá học',
      dataIndex: "tenKhoaHoc",

    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: (hinhAnh) => <img src={hinhAnh} style={{ width: '100%', height: '100%' }} />
    },
    {
      title: 'Lượt xem',
      dataIndex: 'luotXem',


    },
    {
      title: 'Người tạo',
      dataIndex: ["nguoiTao", "hoTen"]

      ,
      ellipsis: true,


    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      ellipsis: true,


    },
    {
      title: "Hành động",
      render: (course) => {
       
        return <div className='d-flex flex-wrap'>
          <Tooltip
            title="Sửa"
          >
            <EditOutlined onClick={() => handleEdit(course)} style={{ color: "blue", fontSize: '25px' }} />
          </Tooltip>

        
            <DeleteComponent course={course} change={()=>setChange(!change)}></DeleteComponent>

          <Tooltip
            title="Ghi danh"
            overlayStyle={{ marginLeft: "45px" }}
          >
            <CalendarOutlined onClick={() => { navigate(`/admin/course/${course.maKhoaHoc}`) }} style={{ color: "green", fontSize: '25px', marginLeft: '30px' }} />
          </Tooltip >
        </div >
      }
      ,


    }





  ];







  const handleChangeImage = (evt) => {
    // Đối với input type là file, có sẽ không dùng event.target.value mà thay thể bằng event.target.files
    const file = evt.target.files[0];
    setFile(file)


    if (!file) return;

    setEdit((pre) => { return { ...pre, hinhAnh: file.name } })



    // Xử lý hiển thị hình ảnh ra giao diện
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // bất đồng bộ
    fileReader.onload = (evt) => {

      // Đọc file thành công
      // evt.target.result: string base64
      // setValue("hinhAnh",file.name)
      setImgPreview(evt.target.result);
    };
  };

  return (
    <>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>

        </Breadcrumb>
        <h1>Quản lý khoá học</h1>

        <Modal
          confirmLoading={confirmLoading}

          title='Cập nhật khoá học'
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={async () =>/* setVisible(false)}*/ {
            onSubmit(getValues())
            setConfirmLoading(true);
            setTimeout(() => {
              setVisible(false);
              setConfirmLoading(false);
            }, 1000);

          }}


          okText='Cập nhật'
          cancelText='Huỷ'


        >


          <Form form={form} onFinish={handleSubmit}>
            {setValue("maKhoaHoc", edit?.maKhoaHoc)}
            {setValue("tenKhoaHoc", edit?.tenKhoaHoc)}
            {setValue("moTa", edit?.moTa)}
            {setValue("luotXem", edit?.luotXem)}
            {setValue("maNhom", edit?.maNhom)}
            {setValue("ngayTao", edit?.ngayTao)}
            {setValue("maDanhMucKhoaHoc", edit?.danhMucKhoaHoc.maDanhMucKhoahoc)}
            {setValue("taiKhoanNguoiTao", edit?.nguoiTao.taiKhoan)}
            {setValue("hinhAnh", edit?.hinhAnh)}

            <Input

              addonBefore={"Mã khoá học"}
              value={edit?.maKhoaHoc}
              disabled={true}

            />

            <Input

              addonBefore={"Tên khoá học"}
              value={edit?.tenKhoaHoc}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, tenKhoaHoc: e.target.value };
                });
                setValue("tenKhoaHoc", e.target.value)
              }}

            />

            <Input

              addonBefore={"Lượt xem"}
              value={edit?.luotXem}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, luotXem: e.target.value };
                });
              }}



            />


            <Input
              addonBefore={"Mô tả"}
              value={edit?.moTa}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, moTa: e.target.value };
                });
              }}



            />
            <Input

              addonBefore={"Mã nhóm"}
              value={edit?.maNhom}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, maNhom: e.target.value };
                });
              }}



            />
            <Input

              addonBefore={"Ngày Tạo"}
              value={edit?.ngayTao}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, ngayTao: e.target.value };
                });
              }}



            />
            <Input

              addonBefore={"Mã danh mục khoá học "}
              value={edit?.danhMucKhoaHoc.maDanhMucKhoahoc}
              onChange={(e) => {
                setEdit((pre) => {
                  return {
                    ...pre, danhMucKhoaHoc: { ...edit?.danhMucKhoaHoc, maDanhMucKhoahoc: e.target.value }
                  };
                });
              }}



            />

            <Input

              addonBefore={"Tài khoản người tạo"}
              value={edit?.nguoiTao.taiKhoan}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, nguoiTao: { ...edit?.nguoiTao, taiKhoan: e.target.value } };
                });
              }} />







            <span className="ant-input-group-wrapper"
            ><span className="ant-input-wrapper ant-input-group"
            ><span className="ant-input-group-addon">Hình ảnh</span
            >


                <input className='form-control'
                  id="hinhAnh"
                  type="file"
                  placeholder="Hình Ảnh"
                  onChange={handleChangeImage}
                />
              </span>
            </span>

            {imgPreview && <img src={imgPreview} alt="preview" className='d-flex mx-auto mt-3 w-50 h-50' />}



          </Form>
        </Modal>
        <Table columns={columns} dataSource={courses} loading={isLoading} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </>
  )
}

export default CourseList