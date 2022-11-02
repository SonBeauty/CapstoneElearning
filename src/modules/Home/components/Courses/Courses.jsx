import useRequest from 'hooks/useRequest';
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getCourses } from '../../../Home/slices/coursesSlice'


const Courses = () => {

  const dispatch = useDispatch()
  const {courses, isLoading, error} = useSelector((state)=> state.courses);

  useEffect(()=>{
    dispatch(getCourses())
  },[] )

  // const {data: courses, isLoading, error} = useRequest(()=> coursesAPI.getCourses());

  return (
    <div>{courses?.map((courses)=>{
      return <div key={courses.maKhoaHoc}> 
      {courses.tenKhoaHoc}
      <img src={courses.hinhAnh} alt={courses.tenKhoaHoc} srcset="" />
      <button className='btn btn-warning'>chi tiet</button>
      </div>
    })}</div>
  )
}

export default Courses