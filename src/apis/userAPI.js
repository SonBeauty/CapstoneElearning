import axiosClient from "./axiosClient";



const MaNhom = "GP01"
const userAPI = {
   getUsers: (tuKhoa) => {
      return axiosClient.get(`QuanLyNguoiDung/TimKiemNguoiDung/`, { params: { MaNhom: MaNhom, tuKhoa: tuKhoa } })
   },
   searchUsers: (tuKhoa) => {
      return axiosClient.get('QuanLyNguoiDung/TimKiemNguoiDung', { params: { tuKhoa: `${tuKhoa}` } })
   }


}


export default userAPI