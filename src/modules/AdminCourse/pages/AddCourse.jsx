import useRequest from "hooks/useRequest";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Breadcrumb, Button, DatePicker, notification, Notification, Form, Select } from 'antd'
import { Content, Footer } from "antd/lib/layout/layout";
import css from "./style.module.css"
import courseAPI from "apis/courseAPI";
import { useEffect } from "react";
import axiosClient from "apis/axiosClient";

// Data thêm phim: tenPhim, biDanh, moTa, trailer, hinhAnh, ngayKhoiChieu, maNhom




const AddCourse = () => {

  
  const [files, setFile] = useState(null);
  const [edit, setEdit] = useState(null)
  const [imgPreview, setImgPreview] = useState("");

  const { form } = Form.useForm()

  const { data: handleAddCourse } = useRequest(
    (values) => courseAPI.addCourse(values),
    { isManual: true }
  );


  const { register, handleSubmit, setValue, control, getValues } = useForm({
    defaultValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: ""
    },
    mode: "onTouched",
  });

  const {
    data: courseCategory,

  } = useRequest(() => courseAPI.getCourseCategory())

  useEffect(() => {
    setEdit((pre) => { return { ...pre, maDanhMuc: courseCategory?.[0].maDanhMuc } })
    setValue("maDanhMucKhoaHoc", courseCategory?.[0].maDanhMuc)


  }, [courseCategory])


  const { data: getAdmin } = useRequest(() => courseAPI.getAdmin().then((res) => {
    const adminList = res?.filter(admin => admin.maLoaiNguoiDung === "GV")


    setEdit((pre) => {
      return { ...pre, adminList: adminList, admin: adminList[0].taiKhoan }
    })
    setValue('taiKhoanNguoiTao', adminList[0].taiKhoan)
  }
  ))
  // {
  //   if (getAdmin) {
  //  let lmao=   getAdmin.filter(admin => admin.maLoaiNguoiDung === "GV")
  //     setEdit((pre) => {
  //       return { ...pre, adminLists: getAdmin },
  //         console.log(lmao)

  //     })
  //   } else { return null }
  // }







  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('file', files);
      formData.append('tenKhoaHoc', getValues("tenKhoaHoc"))

      await handleAddCourse(values).then(async () => {
        await axiosClient.post("QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", formData).then(() => {

          notification.success({
            message: "Thêm khoá học thành công"
          })

        })
      });



    } catch (error) {
      notification.error({
        message: "Thêm khoá học thất bại ",
        description: error,
      })
    }
  };

  const handleChangeImage = (evt) => {
    // Đối với input type là file, có sẽ không dùng event.target.value mà thay thể bằng event.target.files
    const file = evt.target.files[0];
    setFile(file)

    if (!file) return;

    // Lưu file vào field hinhAnh của hook form
    // setValue("hinhAnh", file);

    // Xử lý hiển thị hình ảnh ra giao diện
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // bất đồng bộ
    fileReader.onload = (evt) => {
      // Đọc file thành công
      // evt.target.result: string base64
      setValue("hinhAnh", file.name)
      setImgPreview(evt.target.result);
    };
  };


  const handleSelectBox = (value) => {
    setEdit((pre) => { return { ...pre, maDanhMuc: value } })
    setValue('maDanhMucKhoaHoc', value)
  }


  const handleSelectBox2 = (value) => {
    setEdit((pre) => { return { ...pre, admin: value } })
    setValue('taiKhoanNguoiTao', value)
  }

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>

      </Breadcrumb>
      <h1>Thêm khoá học</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="maKhoaHoc">Mã khoá học:</label>
          <input className='form-control' type="text" id="maKhoaHoc" placeholder="Mã khoá học" {...register("maKhoaHoc")} />
        </div>

        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="tenKhoaHoc">Tên khoá học:</label>
          <input className='form-control' type="text" id="tenKhoaHoc" placeholder="Tên khoá học" {...register("tenKhoaHoc")} />
        </div>

        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="moTa">Mô tả:</label>

          <input className='form-control' type="text" id="moTa" placeholder="Mô tả" {...register("moTa")} />
        </div>

        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="maNhom">Mã nhóm:</label>

          <input className='form-control' type="text" id="maNhom" placeholder="Mã nhóm" {...register("maNhom")} />
        </div>

        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} >Mã danh mục: </label>
          <Form.Item>
            <Select
              value={edit?.maDanhMuc}
              onChange={(value) => handleSelectBox(value)}
            >
              {courseCategory?.map((e) => {
                return <Select.Option value={e.maDanhMuc} > {e.maDanhMuc}</Select.Option>
              })}
              {/* <Select.Option value='KhachHang'>KhachHang</Select.Option>
                            <Select.Option value='QuanTri'>QuanTri</Select.Option> */}
            </Select>
          </Form.Item>
        </div>

        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} >Người tạo: </label>
          <Form.Item>
            <Select
              value={edit?.admin}
              onChange={(value) => handleSelectBox2(value)}
            >
              {edit?.adminList?.map((e) => {
                return <Select.Option value={e.taiKhoan} > {e.taiKhoan}</Select.Option>
              })}
              {/* <Select.Option value='KhachHang'>KhachHang</Select.Option>
                            <Select.Option value='QuanTri'>QuanTri</Select.Option> */}
            </Select>
          </Form.Item>
        </div>

        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          {/* <input type="file" placeholder="Hình Ảnh" {...register("hinhAnh")} /> */}
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="hinhAnh">Hình Ảnh:</label>

          <input className='form-control'
            id="hinhAnh"
            type="file"
            placeholder="Hình Ảnh"
            onChange={handleChangeImage}
          />
        </div>

        {imgPreview && <img src={imgPreview} alt="preview" className='d-flex mx-auto mb-3' />}

        <div className='d-flex mb-3 w-75 mx-auto align-items-center flex-wrap'>

          <Controller
            name='ngayTao'
            control={control}
            rules={{ required: { value: true, message: 'Ngày khởi tạo không được để trống' } }}

            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Ngày khởi tạo"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <DatePicker
                  style={{ borderRadius: '5px', marginLeft: '8px' }}
                  format={"DD/MM/YYYY"}
                  placeholderText="Select date"
                  onChange={(e) => {
                    const d = new Date(e).toLocaleDateString('fr-FR');
                    field.onChange(d);
                  }}
                  selected={field.value}
                />
              </Form.Item>
            )}

          />
        </div>



        <div className='d-flex justify-content-center'>
          <Button
            style={{ width: '25em', height: '3em' }}
            type='primary'
            htmlType='submit'

          >
            Thêm khoá học</Button>
        </div>


      </form>

      <br></br>
      <br></br>
      <br></br>

    </Content>


  );
};

export default AddCourse;
