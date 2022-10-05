import axiosCilent from "./axiosClient"

const coursesAPI = {
    getCourses: () => {
        return axiosCilent.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
            params: {
                maNhom: "GP05",
            }
        })
    }
}

export default coursesAPI