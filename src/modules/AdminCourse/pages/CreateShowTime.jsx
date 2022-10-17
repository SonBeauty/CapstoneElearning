import React, { useState } from 'react'
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import { useParams } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
import { Breadcrumb, Button, DatePicker, Form, Input, notification, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { fireEvent } from '@testing-library/react';
import moment from 'moment';


const CreateShowTime = () => {

    const [edit, setEdit] = useState(null)
    const [change, setChange] = useState(false)

    const { data: cinema } = useRequest(() => movieAPI.getCinema(), { deps: [change] })
    const { data: movie, isLoading, error } = useRequest(() => movieAPI.getMovieDetails(movieId), { deps: [change] })
    const { data: subCinema } = useRequest(() => movieAPI.getSubCinema(edit?.maHeThongRap), { deps: [edit?.maHeThongRap] })

    useEffect(() => {
        setEdit({ tenHeThongRap: cinema?.[0].tenHeThongRap, maHeThongRap: cinema?.[0].maHeThongRap })
        setValue("maPhim", movie?.maPhim)




    }, [cinema])
    useEffect(() => {
        setEdit({ ...edit, tenCumRap: subCinema?.[0].tenCumRap, maCumRap: subCinema?.[0].maCumRap })

    }, [subCinema])


    useEffect(() => {

        const name = cinema?.find((cine) => { return cine.tenHeThongRap === edit?.tenHeThongRap })
        console.log(name)
        setEdit({
            ...edit, maHeThongRap: name?.maHeThongRap
        }



        )
    }, [edit?.tenHeThongRap])


    useEffect(() => {
        const name = subCinema?.find((cine) => { return cine.tenCumRap === edit?.tenCumRap })
        setEdit({ ...edit, maRap: name?.maCumRap })
        setValue("maRap", name?.maCumRap)


    }, [edit?.tenCumRap])

    const { data: handleCreateShowtime } = useRequest((values) => movieAPI.createShowtime(values), { isManual: true })


    // {
    //     if !) {
    //        isLoading, console.log(cinema?.[0].tenHeThongRap);
    //     }

    // }



    const [imgPreview, setImgPreview] = useState("");

    const { form } = Form.useForm()

    const { movieId } = useParams()

    const { register, handleSubmit, setValue, control } = useForm({
        defaultValues: {
            maPhim: "",
            maRap: "",
            giaVe: "",
            ngayChieuGioChieu: "",
        },
        mode: "onTouched",
    });



    const onSubmit = async (values) => {
        try {
            await handleCreateShowtime(values);
            console.log(values)
            notification.success({
                message: "Tạo lịch chiếu thành công"
            })



        } catch (error) {
            // Thất bại: gọi notification hiển thị error
            notification.error({
                message: "Tạo lịch chiếu thất bại ",
                description: error,
            })
        }
    };

    const handleSelectBox = (e) => {
        console.log(e)
        setEdit((pre) => {
            return { ...pre, tenHeThongRap: e };
        });


    }


    const handleSelectBox2 = (e) => {
        console.log(e)
        setEdit((pre) => {
            return { ...pre, tenCumRap: e };
        });


    }



    return (
        <>
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>

                </Breadcrumb>

                <h1>Tạo lịch chiếu - {movie?.tenPhim}</h1>
                <img src={movie?.hinhAnh} alt="preview" className='d-flex mx-auto mb-3 h-50 w-50' />
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
                        <Controller
                            name='maPhim'
                            control={control}
                            value={movie?.maPhim}
                            render={({ field, fieldState: { error } }) => (
                                <></>
                            )}

                        />

                    </div>
                    <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
                        <label className='form-label  ' style={{ width: "10em" }} >Hệ thống rạp:</label>
                        <Form.Item>
                            <Select value={edit?.tenHeThongRap}
                                onChange={(value) => handleSelectBox(value)} >
                                {cinema?.map((e) => {
                                    return <Select.Option value={e.tenHeThongRap} > {e.tenHeThongRap}</Select.Option>
                                })}
                                {/* <Select.Option value='KhachHang'>KhachHang</Select.Option>
                            <Select.Option value='QuanTri'>QuanTri</Select.Option> */}
                            </Select></Form.Item>
                    </div>
                    <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
                        <label className='form-label  ' style={{ width: "10em" }} >Cụm rạp:</label>
                        <Controller control={control} name="maRap"

                            render={({ field, fieldState = { error } }) => (
                                <Form.Item>

                                    <Select
                                        value={edit?.tenCumRap}
                                        onChange={(value) => { return handleSelectBox2(value), field.onChange(value) }} >
                                        {subCinema?.map((e) => {
                                            return <Select.Option value={e.tenCumRap} > {e.tenCumRap}</Select.Option>
                                        })}

                                    </Select>
                                </Form.Item>
                            )} />
                    </div>
                    {/* <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
                        <label className='form-label  ' style={{ width: "10em" }} >Mã rạp:</label>
                        <Controller control={control} name="maRap"

                            render={({ field, fieldState = { error } }) => (
                                <Form.Item>

                                    <Select
                                        value={edit?.maRapDangChon}
                                        onChange={(value) => { return handleSelectBox3(value), field.onChange(value) }} >
                                        {edit?.maCumRap?.map((e) => {
                                            return <Select.Option value={`${e.maRap}`} > {e.maRap}</Select.Option>
                                        })}


                                    </Select>
                                </Form.Item>

                            )}

                        />
                    </div> */}
                    <div className='d-flex mb-3 w-75 mx-auto align-items-center'>
                        <label className='form-label' style={{ width: "10em" }} >Giá vé:</label>

                        <Controller
                            name='giaVe'
                            control={control}
                            rules={{ required: { value: true, message: 'Giá vé không được để trống' } }}

                            render={({ field, fieldState: { error } }) => (
                                // <>
                                //     <label label className='form-label  ' style={{ width: "10em" }} >Giá vé:</label>

                                //     <input className='form-control' style={{ marginLeft: '20px' }} type="number" id="giaVe" placeholder="Giá vé" {...register("giaVe")} />
                                // </>
                                <Form.Item

                                    validateStatus={error ? "error" : ""}
                                    help={error?.message}
                                >

                                    <Input type="text" {...field} />
                                </Form.Item>
                            )}
                        />

                    </div>



                    <div className='d-flex mb-3 w-75 mx-auto align-items-center flex-wrap'>

                        <Controller
                            name='ngayChieuGioChieu'
                            control={control}
                            rules={{ required: { value: true, message: 'Ngày giờ khởi chiếu không được để trống' } }}

                            render={({ field, fieldState: { error } }) => (
                                <Form.Item
                                    label="Ngày giờ khởi chiếu"
                                    validateStatus={error ? "error" : ""}
                                    help={error?.message}
                                >
                                    <DatePicker
                                        showTime={{ format: 'HH:mm:ss' }}
                                        style={{ borderRadius: '5px', marginLeft: '8px' }}
                                        format={"DD/MM/yyyy hh:mm:ss"}
                                        placeholderText="Ngày giờ khởi chiếu"
                                        onChange={(e) => {
                                            // const d = new Date(e).toLocaleDateString('fr-FR');
                                            const d = moment(e).format("DD/MM/yyyy hh:mm:ss")
                                            console.log(d)
                                            field.onChange(d);
                                        }}
                                    // selected={field.value}
                                    />
                                </Form.Item>
                            )}

                        />
                    </div>


                    <div className='d-flex justify-content-center mb-4'>
                        <Button
                            style={{ width: '25em', height: '3em' }}
                            type='primary'
                            htmlType='submit'

                        >
                            Tạo lịch chiếu</Button>
                    </div>

                </form>
            </Content>

        </>
    );
};

export default CreateShowTime