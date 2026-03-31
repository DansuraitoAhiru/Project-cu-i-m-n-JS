let users = [
  {
    id: 1,
    fullName: "Admin Chính",
    email: "vqviet@gmail.com",
    password: "123456",
    role: "admin", // "admin" hoặc "user"
    createdAt: "2026-03-03T12:26:21.617Z",
    isActive: true
  },
  {
    id: 2,
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    password: "Matkhau123",
    role: "user",
    createdAt: "2026-03-01T12:26:21.617Z",
    isActive: true
  },
  {
    id: 3,
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    password: "12345678",
    role: "user",
    createdAt: "2026-03-03T12:26:21.617Z",
    isActive: false
  }
];

let movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    titleVi: "Dune: Hành Tinh Cát - Phần 2",
    genres: "Hành động, Viễn tưởng",
    duration: 166,
    releaseDate: "01/03/2024",
    status: 1,
    posterUrl: "https://example.com/images/dune-part-two-poster.jpg",
    description: "Tiếp nối phần trước, Paul Atreides hợp nhất với Fremen để trả thù gia tộc Harkonnen và đối mặt với số phận của vũ trụ.",
    ticketPrice: 95000
  },
  {
    id: 2,
    title: "Kung Fu Panda 4",
    titleVi: "Kung Fu Panda 4",
    genres: "Hoạt hình, Hài",
    duration: 94,
    releaseDate: "08/03/2024",
    status: 1,
    posterUrl: "https://example.com/images/kung-fu-panda-4-poster.jpg",
    description: "Po tiếp tục hành trình trở thành Chiến binh Rồng, đối mặt với kẻ thù mới và tìm người kế nhiệm.",
    ticketPrice: 80000
  },
  {
    id: 3,
    title: "Godzilla x Kong: The New Empire",
    titleVi: "Godzilla x Kong: Đế Chế Mới",
    genres: "Hành động, Viễn tưởng",
    duration: 115,
    releaseDate: "29/03/2024",
    status: 2,
    posterUrl: "https://example.com/images/godzilla-x-kong-poster.jpg",
    description: "Godzilla và Kong hợp sức chống lại mối đe dọa mới từ lòng đất.",
    ticketPrice: 80000
  },
  {
    id: 4,
    title: "Mai",
    titleVi: "Mai",
    genres: "Tâm lý, Tình cảm",
    duration: 131,
    releaseDate: "10/02/2024",
    status: 0,
    posterUrl: "https://example.com/images/mai-poster.jpg",
    description: "Câu chuyện về một người phụ nữ mạnh mẽ đối mặt với những biến cố trong cuộc sống.",
    ticketPrice: 80000
  },
  {
    id: 5,
    title: "Exhuma",
    titleVi: "Exhuma: Quật Mộ Trùng Ma",
    genres: "Kinh dị, Bí ẩn",
    duration: 134,
    releaseDate: "15/03/2024",
    status: 1,
    posterUrl: "https://example.com/images/exhuma-poster.jpg",
    description: "Một nhóm chuyên gia phong thủy khai quật mộ cổ và đối mặt với lời nguyền đáng sợ.",
    ticketPrice: 80000
  }
];

let tickets = [
  {
    id: 1001,
    ticketCode: "VE-1001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0987654321",
    movieId: 1,
    movieTitle: "Dune: Hành Tinh Cát - Phần 2",
    showDate: "2026-03-25",
    showTime: "19:00",
    seats: ["F12", "F13"],
    seatCount: 2,
    pricePerSeat: 80000,
    totalAmount: 160000,
    paymentMethod: 0,
    paymentStatus: true,
    createdAt: "2026-03-10T14:30:00Z",
    note: "Khách yêu cầu ghế gần lối đi",
    statusDisplay: "Đã Thanh Toán"
  },
  {
    id: 1002,
    ticketCode: "VE-1002",
    customerName: "Trần Thị B",
    customerPhone: "0912345678",
    movieId: 4,
    movieTitle: "Mai",
    showDate: "2026-03-26",
    showTime: "21:30",
    seats: ["G5"],
    seatCount: 1,
    pricePerSeat: 80000,
    totalAmount: 80000,
    paymentMethod: 1,
    paymentStatus: false,
    createdAt: "2026-03-11T09:15:00Z",
    note: "",
    statusDisplay: "Chờ xử lý"
  },
  {
    id: 1003,
    ticketCode: "VE-1003",
    customerName: "Lê Văn C",
    customerPhone: "0945667321",
    movieId: 2,
    movieTitle: "Kung Fu Panda 4",
    showDate: "2026-03-27",
    showTime: "10:00",
    seats: ["H10", "H11", "H12"],
    seatCount: 3,
    pricePerSeat: 90000,
    totalAmount: 270000,
    paymentMethod: 2,
    paymentStatus: true,
    createdAt: "2026-03-12T10:45:00Z",
    note: "Combo bắp nước tặng kèm",
    statusDisplay: "Đã Thanh Toán"
  },
  {
    id: 1004,
    ticketCode: "VE-1004",
    customerName: "Phạm Minh D",
    customerPhone: "0855345321",
    movieId: 5,
    movieTitle: "Exhuma: Quật Mộ Trùng Ma",
    showDate: "2026-03-24",
    showTime: "21:45",
    seats: ["E8"],
    seatCount: 1,
    pricePerSeat: 95000,
    totalAmount: 95000,
    paymentMethod: 0,
    paymentStatus: false,
    createdAt: "2026-03-13T11:20:00Z",
    note: "Khách hủy do bận đột xuất",
    statusDisplay: "Đã hủy"
  },
  {
    id: 1005,
    ticketCode: "VE-1005",
    customerName: "Hoàng Yến E",
    customerPhone: "0377654321",
    movieId: 3,
    movieTitle: "Godzilla x Kong: Đế Chế Mới",
    showDate: "2026-03-28",
    showTime: "08:30",
    seats: ["D4", "D5"],
    seatCount: 2,
    pricePerSeat: 80000,
    totalAmount: 160000,
    paymentMethod: 1,
    paymentStatus: false,
    createdAt: "2026-03-02T08:50:00Z",
    note: "Chờ xác nhận thanh toán chuyển khoản",
    statusDisplay: "Chờ xử lý"
  }
];

const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Xác nhận đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff3b3b",
      cancelButtonColor: "#331a1a",
      confirmButtonText: "Đăng xuất ngay",
      cancelButtonText: "Hủy bỏ",
      background: "#1a1111",
      color: "#ffffff"
    }).then((result) => {
      if (result.isConfirmed) {
        // Chuyển hướng khi người dùng đồng ý
        window.location.href = "login.html";
      }
    });
  });