import axiosClient from "./axiosClient";

const authAPI = {
  login: (values) => {
    return axiosClient.post("QuanLyNguoiDung/DangNhap", values);
  },

  register: (values) => {
    return axiosClient.post("QuanLyNguoiDung/DangKy", {
      ...values,
      maNhom: "GP01",
    });
  },
};

export default authAPI;
