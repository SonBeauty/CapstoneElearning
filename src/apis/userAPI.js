import axiosClient from "./axiosClient";



const MaNhom = "GP01"
const userAPI = {
   getUsers: () => {
      return axiosClient.get(`QuanLyNguoiDung/LayDanhSachNguoiDung/`, { params: { MaNhom: MaNhom } })
   },
   handleSearch: (value) => {
      return axiosClient.get(`QuanLyNguoiDung/TimKiemNguoiDung`, { params: { tuKhoa: value } })
   }

}


export default userAPI