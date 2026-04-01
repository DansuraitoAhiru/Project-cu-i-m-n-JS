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
    posterUrl: "../assets/images/dune.jpg",
    description: "Tiếp nối phần trước, Paul Atreides hợp nhất với Fremen để trả thù gia tộc Harkonnen và đối mặt với số phận của vũ trụ.",
    ticketPrice: 95000
  },
  {
    id: 2,
    title: "Kung Fu Panda 4",
    titleVi: "Gấu trúc Kung Fu 4",
    genres: "Hoạt hình, Hài",
    duration: 94,
    releaseDate: "08/03/2024",
    status: 1,
    posterUrl: "../assets/images/kungfu.jpg",
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
    posterUrl: "../assets/images/godzilla.jpg",
    description: "Godzilla và Kong hợp sức chống lại mối đe dọa mới từ lòng đất.",
    ticketPrice: 80000
  },
  {
    id: 4,
    title: "Kizumonogatari Part 2",
    titleVi: "Câu truyện huyền bí: Khởi nguồn của những vết sẹo phần 2",
    genres: "Tâm lý, Tình cảm",
    duration: 131,
    releaseDate: "10/02/2024",
    status: 0,
    posterUrl: "../assets/images/mai.jpg",
    description: "Tiếp nối câu chuyện từ phần 1, sau khi Araragi cứu giúp Kisshot và trở thành vampire, giờ đã đến lúc quyết đấu, liệu kết câu truyện này sẽ có hậu.",
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
    posterUrl: "../assets/images/exhua.jpg",
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

const movieTable = document.querySelector("#movieTable");
const emptyState = document.querySelector("#emptyState");
const logoutBtn = document.querySelector("#logout");
const modal = document.querySelector("#modalOverlay");
const openBtn = document.querySelector("#openModal");
const closeBtn = document.querySelector("#closeModal");
const closeIcon = document.querySelector("#closeIcon");
const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("#modal-body");

const nameInput = document.querySelector("#movieName");
const durationInput = document.querySelector("#duration");
const releaseDateInput = document.querySelector("#releaseDate");
const statusInput = document.querySelector("#status");
const priceInput = document.querySelector("#price");
const linkInput = document.querySelector("#linkUrl");
const descriptionInput = document.querySelector("#description");

const errorName = document.querySelector("#error-name");
const errorGenre = document.querySelector("#error-genres");
const errorDuration = document.querySelector("#error-duration");
const errorDate = document.querySelector("#error-date");
const errorPrice = document.querySelector("#error-price");

const init = () => {
  renderMovies(movies);
};

const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return "";

  const day = String(d.getDate()).padStart(2, "0");  // .getDate(): Lấy ngày (1 → 31), String(...): Chuyển số → chuỗi, .padStart(2, "0"): Nếu chuỗi < 2 ký tự → thêm "0" phía trước
  const month = String(d.getMonth() + 1).padStart(2, "0");    // bắt buộc phải +1 thì mới là tháng 1 -> 12
  const year = String(d.getFullYear());
  return `${day}/${month}/${year}`;
};

const renderMovies = (movies) => {
  if (movies.length === 0) {
    movieTable.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  movieTable.innerHTML = movies.map((movie) => `
    <tr>
      <td><img src="${movie.posterUrl}" class="movie-poster"></td>
      <td>
        <div class="movie-name">${movie.title}</div>
        <div class="sub-name">${movie.titleVi}</div>
      </td>
      <td>
        ${movie.genres.split(",").map((g) => `<span class="tag">${g.trim()}</span>`).join("")}
      </td>
      <td>${movie.duration} phút</td>
      <td>${movie.releaseDate}</td>
      <td><span class="status ${movie.status === 1 ? "showing" : movie.status === 2 ? "incoming" : "ended"}">
          ${movie.status === 1 ? "Đang chiếu" : movie.status === 2 ? "Sắp chiếu" : "Đã chiếu"}
      </span></td>
      <td class="actions">
          <i class="fa-solid fa-pen"></i>
          <i class="fa-solid fa-circle-xmark"></i>
      </td>
    </tr>`
  ).join("");
};

// Khi nhấn nút "Thêm phim mới" -> Hiện modal
openBtn.onclick = function () {
  modal.classList.add('active');
  document.body.style.overflow = "hidden";  // Ngăn chặn cuộn trang web bên dưới khi đang mở modal
}

// Khi nhấn nút "Hủy" -> Ẩn modal
closeBtn.onclick = function () {
  modal.classList.remove('active');
  document.body.style.overflow = "auto"; // Cho phép cuộn lại
}

// Click ra ngoài vùng Modal Container cũng đóng modal
window.onclick = function (event) {
  if (event.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = "auto";
  }
}

closeIcon.onclick = function () {
  modal.classList.remove('active');
  document.body.style.overflow = "auto";
}

const genreInput = new TomSelect("#genres", {
  plugins: ['remove_button']
});

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const genre = genreInput.getValue().join(",");
  const duration = durationInput.value;
  const releaseDate = releaseDateInput.value;
  const status = statusInput.value;
  const price = priceInput.value;
  const link = linkInput.value;
  const description = descriptionInput.value;
  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  let isValid = true;

  if (!name) {
    errorName.textContent = "Tên không được để trống";
    nameInput.classList.add("invalid");
    isValid = false;
  }

  if (!genre || genre.length === 0) {
    errorGenre.textContent = `Phải chọn thể loại, nếu không có, chọn "Khác"`;
    document.querySelector(".ts-control").classList.add("invalid");
    isValid = false;
  }

  if (!duration) {
    errorDuration.textContent = "Thời lượng không được để trống";
    durationInput.classList.add("invalid");
    isValid = false;
  }

  if (!releaseDate) {
    errorDate.textContent = "Ngày khởi chiếu không được để trống";
    releaseDateInput.classList.add("invalid");
    isValid = false;
  }

  if (!price) {
    errorPrice.textContent = "Giá vé không được để trống";
    priceInput.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) return;

  const newMovie = {
    id: Date.now(),
    title: name,
    titleVi: name,
    genres: genre,
    duration: Number(duration),
    releaseDate: formatDate(releaseDate),
    status: Number(status),
    posterUrl: link || "https://via.placeholder.com/80x120",
    description: description,
    ticketPrice: Number(price)
  };

  movies.push(newMovie);
  renderMovies(movies);
  form.reset();

  modal.classList.remove('active');
  document.body.style.overflow = "auto";
});

init();