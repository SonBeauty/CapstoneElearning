import axiosClient from "./axiosClient";

const movieAPI = {
  getMovies: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP00",
      },
    });
  },

  getBanners: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachBanner");
  },

  getMovieDetails: (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },

  getLichChieu: (movieId) => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        maPhim: movieId
      }
    })
  },

  getCinema: () => {
    return axiosClient.get("QuanLyRap/LayThongTinHeThongRap")
  },
  getCinemaDetails: (cinemaId) => {
    return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: {
        maHeThongRap: cinemaId,
      }
    })
  },
  getTicket: (ticketid) => {
    return axiosClient.get("QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: ticketid
      }
    })
  },
  addMovie: (movie) => {
    // Đối với dữ liệu có định dạng đặc biệt như File,...
    // Ta cần phải tạo ra FormData để lưu trữ
    const formData = new FormData();
    // Duyệt qua từng thuộc tính trong object movie và thêm vào formData
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    formData.append("maNhom", "GP00");

    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  },

  createShowtime: (movie) => {
    return axiosClient.post("QuanLyDatVe/TaoLichChieu", movie)
  },


  getCinema: () => {
    return axiosClient.get("QuanLyRap/LayThongTinHeThongRap")
  },

  getSubCinema: (ec) => {
    return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong", { params: { maNhom: 'GP01', maHeThongRap: `${ec}` } })

  },

  bookTicket: (values) => {
    return axiosClient.post("QuanLyDatVe/DatVe", values)
  }
};

export default movieAPI;
