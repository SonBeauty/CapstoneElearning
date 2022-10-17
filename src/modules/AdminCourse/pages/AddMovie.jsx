import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Breadcrumb, Button, DatePicker, notification, Notification, Form } from 'antd'
import { Content, Footer } from "antd/lib/layout/layout";
import css from "./style.module.css"

// Data thêm phim: tenPhim, biDanh, moTa, trailer, hinhAnh, ngayKhoiChieu, maNhom




const AddMovie = () => {



  const [imgPreview, setImgPreview] = useState("");

  const { form } = Form.useForm()

  const { data: handleAddMovie } = useRequest(
    (values) => movieAPI.addMovie(values),
    { isManual: true }
  );
  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      trailer: "",
      hinhAnh: "",
      ngayKhoiChieu: "",
    },
    mode: "onTouched",
  });


  const onSubmit = async (values) => {
    try {
      await handleAddMovie(values);

      // Thành công: gọi notification
      notification.success({
        message: "them phim thanh cong"
      })
      // Redirect về trang MovieList


    } catch (error) {
      // Thất bại: gọi notification hiển thị error
      notification.error({
        message: "them phim that bai ",
        description: error,
      })
    }
  };

  const handleChangeImage = (evt) => {
    // Đối với input type là file, có sẽ không dùng event.target.value mà thay thể bằng event.target.files
    const file = evt.target.files[0];

    if (!file) return;

    // Lưu file vào field hinhAnh của hook form
    setValue("hinhAnh", file);

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
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>

      </Breadcrumb>
      <h1>Thêm phim</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="tenPhim">Tên phim:</label>
          <input className='form-control' type="text" id="tenPhim" placeholder="Tên Phim" {...register("tenPhim")} />
        </div>
        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="biDanh">Bí danh:</label>

          <input className='form-control' type="text" id="biDanh" placeholder="Bí Danh" {...register("biDanh")} />
        </div>
        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="moTa">Mô tả:</label>

          <input className='form-control' type="text" id="moTa" placeholder="Mô Tả" {...register("moTa")} />
        </div>
        <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
          <label className='form-label  ' style={{ width: "10em" }} htmlFor="trailer">Trailer:</label>

          <input className='form-control' type="text" id="trailer" placeholder="Trailer" {...register("trailer")} />
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
            name='ngayKhoiChieu'
            control={control}
            rules={{ required: { value: true, message: 'Ngày khởi chiếu không được để trống' } }}

            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Ngày khởi chiếu"
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
            Thêm phim</Button>
        </div>


      </form>

      <br></br>
      <br></br>
      <br></br>

    </Content>


  );
};

export default AddMovie;
