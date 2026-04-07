let showingMovies = [
  {
    id: 1,
    title: "Dune",
    titleVi: "Dune: Hành Tinh Cát",
    genres: "Hành động, Viễn tưởng",
    duration: 155,
    releaseDate: "01/03/2024",
    status: 1,
    posterUrl: "../assets/images/dune - Copy.jpg",
    backdropUrl: "../assets/images/home.png",
    description: "Câu chuyện về cuộc hành trình của Paul Atreides, một chàng trai trẻ tài năng và rực rỡ, sinh ra với số phận vĩ đại vượt quá sự hiểu biết của mình.",
    ticketPrice: 95000
  },
  {
    id: 2,
    title: "Kizumonogatari Part 3",
    titleVi: "Kizumonogatari phần 3",
    genres: "Hành động, Bí ẩn",
    duration: 94,
    releaseDate: "08/03/2024",
    status: 1,
    posterUrl: "../assets/images/godzilla - Copy.jpg",
    backdropUrl: "https://a.storyblok.com/f/178900/1040x585/d5f3dc6643/kizumonogatari-koyomi-vamp-teaser-kiss-shot.jpg/m/filters:quality(95)format(webp)",
    description: "Sau khi lấy lại các bộ phận cho Kisshot, điều gì sẽ xảy ra tiếp đây, liệu có phải Happy Ending đang chờ.",
    ticketPrice: 80000
  },
  {
    id: 3,
    title: "Spiderman: Brand New Day",
    titleVi: "Nhện nhọ chào ngày mới",
    genres: "Hành động, Phiêu lưu",
    duration: 115,
    releaseDate: "29/03/2024",
    status: 2,
    posterUrl: "../assets/images/home - Copy.png",
    backdropUrl: "https://thecosmiccircus.com/wp-content/uploads/2025/05/spider-man-brand-new-day.jpg",
    description: "Trang phục mới, ác nhân mới, nhiều vấn đề hơn. Vẫn là gã hàng xóm thân thiện của bạn.",
    ticketPrice: 80000
  },
  {
    id: 4,
    title: "Shigatsu wa Kimi no Uso",
    titleVi: "Tháng Tư là lời nói dối của em",
    genres: "Tâm lý, Tình cảm",
    duration: 595,
    releaseDate: "10/02/2024",
    status: 0,
    posterUrl: "../assets/images/mai - Copy.jpg",
    backdropUrl: "https://beyondthepanorama.com/wp-content/uploads/2020/10/ylia_orig.jpg",
    description: "Mùa xuân sắp đến rồi. Một mùa xuân có em... nhưng không có em.",
    ticketPrice: 80000
  },
];
const users = JSON.parse(localStorage.getItem("users")) || [];

const heroContent = document.querySelector("#hero-content");
const hotPoster = document.querySelector(".hero");
const movieList = document.querySelector("#movie-grid");
const userInfo = document.querySelector("#user-info");

const logoutBtn = document.querySelector("#logout");

const init = () => {
  renderHotMovies();
  renderMovies();
  const saveUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");  // Lấy user đã login từ: localStorage (ghi nhớ lâu) hoặc sessionStorage (tạm thời)
  if (!saveUser) return; // nếu chưa login → dừng

  const currentUser = JSON.parse(saveUser);
  renderUser(currentUser);
}

const renderHotMovies=() => {
  const randomIndex = Math.floor(Math.random() * showingMovies.length);
  const hot = showingMovies[randomIndex];

  if (hot.backdropUrl) {
    hotPoster.style.background = `
        linear-gradient(to right, rgba(11, 15, 26, 1) 30%, rgba(11, 15, 26, 0.2)), 
        url('${hot.backdropUrl}') center/cover
    `;
  }

  heroContent.innerHTML = `
    <span class="badge"><i class="fa-solid fa-circle"></i> Đang thịnh hành</span>
    <h1>${hot.titleVi}</h1>
    <p>${hot.description}</p>
    <div class="hero-btns">
        <button class="btn-primary booking-btn"><i class="fa-solid fa-ticket"></i> Đặt Vé Ngay</button>
        <button class="btn-secondary trailer-btn"><i class="fa-regular fa-circle-play"></i> Xem Trailer</button>
    </div>
  `;
};

const renderMovies=() => {
  movieList.innerHTML = showingMovies.map((movie) => `
    <div class="movie-card">
      <img class="poster" src="${movie.posterUrl}" alt="poster" />
      <h3>${movie.title}</h3>
      <p><i class="fa-regular fa-clock"></i> ${movie.duration} phút • ${movie.genres}</p>
      <button class="btn-buy">Mua Vé</button>
    </div>
  `).join("");
}

const renderUser=(user) => {
  if(!user) return;
  document.querySelector("#user-info").innerHTML = `
    <p class="nameProfile">${user.fullName}</p>
    <p class="emailProfile">${user.email}</p>
  `;
};

window.onload = () => {
  const saveUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
  const currentURL = window.location.href;

  // Nếu chưa đăng nhập → chỉ cho vào login.html
  if (!saveUser) {
    if (!currentURL.includes("login.html")) {
      window.location.href = "login.html";
    }
    return;
  }

  const user = JSON.parse(saveUser);

  // Nếu đang ở login.html mà đã login → redirect về trang đúng
  if (currentURL.includes("login.html")) {
    if (user.role === "admin") window.location.href = "admin.html";
    else window.location.href = "user.html";
    return;
  }
}

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
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentUser");
      window.location.href = "login.html";
    }
  });
});

const menu = document.querySelector("#menu");    // ẩn hiện thanh điều hướng khi responsive
const menuContainer = document.querySelector("#menu-container");
menu.addEventListener("click", () => {
  menuContainer.classList.toggle("active");  // có thể vừa thêm vừa xóa, ko phải add rồi remove nhiều lầb
})

init();