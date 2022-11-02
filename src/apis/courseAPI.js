import axiosClient from "./axiosClient";
const MaNhom = "GP01"


const courseAPI = {
    getCourses: () => {
        return axiosClient.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc`, { params: { MaNhom: MaNhom } })
    },
    getListCourses: () => {
        return axiosClient.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
    },

    getCourseCategory: () => {
        return axiosClient.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
    },
    getAdmin: async () => {
        return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung", { params: { MaNhom: MaNhom } })
    },
    addCourse: (values) => {
        return axiosClient.post('QuanLyKhoaHoc/ThemKhoaHoc', values)
    }
}


export default courseAPI