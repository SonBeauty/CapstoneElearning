import { Breadcrumb, DatePicker, Form, Input, Modal, notification, Select, Switch, Table, Tooltip } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import axiosClient from 'apis/axiosClient'
import movieAPI from 'apis/movieAPI'
import useRequest from 'hooks/useRequest'
import moment from 'moment'
import React, { useState } from 'react'
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom'












const MovieList = () => {
  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [change, setChange] = useState(true)
  const [imgPreview, setImgPreview] = useState("");



  const navigate = useNavigate()
  const { form } = Form.useForm()

  const {
    data: movies,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getMovies(), { deps: [change] })

  const onSubmit = async (values) => {
    try {

      const formData = new FormData();
      // Duyệt qua từng thuộc tính trong object movie và thêm vào formData
      for (let key in values) {
        formData.append(key, values[key]);
      }

      await axiosClient.post("QuanLyPhim/CapNhatPhimUpload", formData);

      notification.success({ message: 'Cập nhật phim thành công' })
      setChange(!change)

    }
    catch (error) {
      notification.error({
        message: 'Cập nhật phim thất bại',
        description: error
      })
    }
  }

  const handleSelectBox = (e) => {
    setEdit((pre) => {
      return { ...pre, maLoaiNguoiDung: e };
    });


  }

  const handleEdit = (movie) => {
    const d = new Date(movie.ngayKhoiChieu).toLocaleDateString('fr-FR');

    setImgPreview(movie.hinhAnh);
    setVisible(true)
    setEdit({
      ...movie,
      ngayKhoiChieu: d
    })
  }

  const handleDelete = async (movie) => {
    try {

      await axiosClient.delete(`QuanLyPhim/XoaPhim`, { params: { MaPhim: movie.maPhim } })
      notification.success({
        message: 'Xoá phim  thành công',
      })
      setChange(!change)
    } catch (error) {
      notification.error({
        message: 'Xoá phim thất bại',
        description: error
      })

    }
  }





  const columns = [
    {
      title: 'Mã phim',
      dataIndex: "maPhim",

      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: (hinhAnh) => <img src={hinhAnh} style={{ width: '100%', height: '100%' }} />
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',

      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,

    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      ellipsis: true,


    },
    {
      title: "Hành động",
      render: (movie) => <div className='d-flex flex-wrap'>
        <Tooltip
          title="Sửa"
        >
          <EditOutlined onClick={() => handleEdit(movie)} style={{ color: "blue", fontSize: '25px' }} />
        </Tooltip>,

        <Tooltip
          title="Xoá"
          overlayStyle={{ marginLeft: "45px" }}
        >
          <DeleteOutlined onClick={() => handleDelete(movie)} style={{ color: "red", fontSize: '25px', marginLeft: '30px' }} />
        </Tooltip>,

        <Tooltip
          title="Tạo lịch chiếu"
          overlayStyle={{ marginLeft: "45px" }}
        >
          <CalendarOutlined onClick={() => { navigate(`/admin/showtime/${movie.maPhim}`); console.log(movie) }} style={{ color: "green", fontSize: '25px', marginLeft: '30px' }} />
        </Tooltip >
      </div >,


    }





  ];



  const handleSubmit = () => { }




  const handleChangeImage = (evt) => {
    // Đối với input type là file, có sẽ không dùng event.target.value mà thay thể bằng event.target.files
    const file = evt.target.files[0];

    if (!file) return;

    setEdit((pre) => { return { ...pre, hinhAnh: file } })



    // Xử lý hiển thị hình ảnh ra giao diện
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // bất đồng bộ
    fileReader.onload = (evt) => {
      // Đọc file thành công
      // evt.target.result: string base64
      setImgPreview(evt.target.result);
    };
  };

  return (

    <>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>

        </Breadcrumb>
        <h1>Quản lý phim</h1>

        <Modal
          confirmLoading={confirmLoading}

          title='Cập nhật phim'
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={async () =>/* setVisible(false)}*/ {
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


          <Form form={form} onFinish={handleSubmit}>

            <Input

              addonBefore={"Mã phim"}
              value={edit?.maPhim}
              disabled={true}

            />

            <Input

              addonBefore={"Tên phim"}
              value={edit?.tenPhim}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, tenPhim: e.target.value };
                });
              }}

            />

            <Input

              addonBefore={"Trailer"}
              value={edit?.trailer}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, trailer: e.target.value };
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
              }} />



            <span className="ant-input-group-wrapper"
            ><span className="ant-input-wrapper ant-input-group"
            ><span className="ant-input-group-addon">Ngày khởi chiếu</span>
                <DatePicker
                  format={"DD/MM/YYYY"}
                  placeholderText="Select date"
                  onChange={(e) => {
                    const d = new Date(e).toLocaleDateString('fr-FR');
                    setEdit((pre) => {
                      return { ...pre, ngayKhoiChieu: d }
                    })
                  }}
                  value={moment(`${edit?.ngayKhoiChieu}`, "DD/MM/YYYY")}
                  allowClear={false}

                />
              </span>
            </span>


            <span className="ant-input-group-wrapper"
            ><span className="ant-input-wrapper ant-input-group "
            ><span className="ant-input-group-addon " style={{ borderRight: "1px solid rgb(217, 217, 217)" }}>Đang chiếu</span
            >
                <Switch style={{ marginLeft: '20px' }} checked={edit?.dangChieu} onChange={(e) => {
                  setEdit((pre) => {
                    return { ...pre, dangChieu: e };
                  });
                }} />
              </span>
            </span>








            <span className="ant-input-group-wrapper"
            ><span className="ant-input-wrapper ant-input-group "
            ><span className="ant-input-group-addon " style={{ borderRight: "1px solid rgb(217, 217, 217)" }}>Sắp chiếu</span
            >
                <Switch style={{ marginLeft: '20px' }} checked={edit?.sapChieu} onChange={(e) => {
                  setEdit((pre) => {
                    return { ...pre, sapChieu: e };
                  });
                }} />
              </span>
            </span>


            <span className="ant-input-group-wrapper"
            ><span className="ant-input-wrapper ant-input-group "
            ><span className="ant-input-group-addon " style={{ borderRight: "1px solid rgb(217, 217, 217)" }}>Hot</span
            >
                <Switch style={{ marginLeft: '20px' }} checked={edit?.hot} onChange={(e) => {
                  setEdit((pre) => {
                    return { ...pre, hot: e };
                  });
                }} />
              </span>
            </span>

            <Input

              addonBefore={"Số sao"}
              value={edit?.danhGia}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, danhGia: e.target.value };
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
        <Table columns={columns} dataSource={movies} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </>
  )
}

export default MovieList