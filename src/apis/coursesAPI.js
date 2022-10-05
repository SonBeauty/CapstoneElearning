import axiosCilent from "./axiosClient"

const coursesAPI = {
    getCourses: () => {
        return axiosCilent.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
            params: {
                maNhom: "GP01",
            }
        })
    },

    getListCourses: () => {
        return axiosCilent.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
    }
}

export default coursesAPI