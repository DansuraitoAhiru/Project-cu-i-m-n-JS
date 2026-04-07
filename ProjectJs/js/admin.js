const movieTable = document.querySelector("#movieTable");
const emptyState = document.querySelector("#emptyState");
const logoutBtn = document.querySelector("#logout");
// const modal = document.querySelectorAll(".modal-overlay");
const modal = document.querySelector("#modal-overlay");
const openBtn = document.querySelector("#openModal");
// const closeBtns = document.querySelectorAll(".closeModal");
// const closeIcons = document.querySelectorAll(".closeIcon");
const closeBtn = document.querySelector("#closeModal");
const closeIcon = document.querySelector("#closeIcon")
const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("#form");
const editForm = document.querySelector("#editForm")

const nameInput = document.querySelector("#movieName");
const durationInput = document.querySelector("#duration");
const genreInput = document.querySelector("#genres")
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
const errorLink = document.querySelector("#error-link");
const errorDesc = document.querySelector("#error-desc");
const errorStatus = document.querySelector("#error-status");

let idUpdate = null;
let currentPage = 1;
let pageSize = 6;

const init = () => {
  getMovies();
  searchMovie();
};

const saveMovies = () => localStorage.setItem("movies", JSON.stringify(movies));

const getMovies = () => JSON.parse(localStorage.getItem("movies")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let movies = JSON.parse(localStorage.getItem("movies")) || [];

const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return "";

  const day = String(d.getDate()).padStart(2, "0");  // .getDate(): Lấy ngày (1 → 31), String(...): Chuyển số → chuỗi, .padStart(2, "0"): Nếu chuỗi < 2 ký tự → thêm "0" phía trước
  const month = String(d.getMonth() + 1).padStart(2, "0");    // bắt buộc phải +1 thì mới là tháng 1 -> 12
  const year = String(d.getFullYear());
  return `${day}/${month}/${year}`;
};

const renderMovies = (movies) => {
  const movieTable = document.querySelector("#movieTable");
  const emptyState = document.querySelector("#emptyState");

  if (movies.length === 0) {
    movieTable.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  // Tính phân trang
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  let pagedMovies = movies.slice(start, end); // lấy dữ liệu của 1 trang từ danh sách lớn, ở đây là lấy phim 1 => 6

  movieTable.innerHTML = pagedMovies.map(movie => `
    <tr>
      <td><img src="${movie.posterUrl}" class="movie-poster"></td>
      <td>
        <div class="movie-name">${movie.title}</div>
        <div class="sub-name">${movie.titleVi}</div>
      </td>
      <td><span class="tag">${movie.genres}</span></td>
      <td>${movie.duration} phút</td>
      <td>${movie.releaseDate}</td>
      <td><span class="status ${movie.status === 1 ? "showing" : movie.status === 2 ? "incoming" : "ended"}">
          ${movie.status === 1 ? "Đang chiếu" : movie.status === 2 ? "Sắp chiếu" : "Đã chiếu"}
      </span></td>
      <td class="actions">
          <button type="button" onclick="editMovie(${movie.id})"><i class="fa-solid fa-pen"></i></button>
          <button type="button" onclick="deleteMovie(${movie.id})"><i class="fa-regular fa-circle-xmark"></i></i></button>
      </td>
    </tr>
  `).join("");
  renderPagination(movies.length);
};

// Khi nhấn nút "Thêm phim mới" -> Hiện modal
openBtn.addEventListener("click", () => {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";  // Ngăn chặn cuộn trang web bên dưới khi đang mở modal
});

// Khi nhấn nút "Hủy" -> Ẩn modal
// closeBtns.forEach(btn => {
//   btn.addEventListener("click", (e) => {
//     const modal = e.target.closest(".modal-overlay");
//     modal.classList.remove("active");
//     document.body.style.overflow = "auto";
//     showToast("Đã hủy", "Đã hủy thao tác", "error");
//     addForm.reset();
//     // genreInput.clear();
//     idUpdate = null;
//   });
// });
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  showToast("Đã hủy", "Đã hủy thao tác", "error");
  form.reset();
  idUpdate = null;
  document.querySelector("#modal-title").textContent = "Thêm phim mới";
  submitBtn.textContent = "+ Thêm mới"
})

// Click ra ngoài vùng Modal Container cũng đóng modal
// window.addEventListener("click", () => {
//   modal.forEach((m) => {
//     if (event.target === m) {
//       m.classList.remove('active');
//       document.body.style.overflow = "auto";
//     }
//   });
// });

// closeIcons.forEach(icon => {
//   icon.addEventListener("click", (e) => {
//     const modal = e.target.closest(".modal-overlay");
//     modal.classList.remove("active");
//     document.body.style.overflow = "auto";
//   });
// });
closeIcon.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const genre = genreInput.value;
  const duration = durationInput.value.trim();
  const releaseDate = releaseDateInput.value;
  const status = statusInput.value;
  const price = priceInput.value.trim();
  const link = linkInput.value;
  const description = descriptionInput.value.trim();
  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  let isValid = true;

  if (!name) {
    errorName.textContent = "Tên không được để trống";
    nameInput.classList.add("invalid");
    isValid = false;
  }

  if (!genre) {
    errorGenre.textContent = `Phải chọn thể loại, nếu không có, chọn "Khác"`;
    genreInput.classList.add("invalid");
    isValid = false;
  }

  if (duration === "") {
    errorDuration.textContent = "Thời lượng không được để trống";
    durationInput.classList.add("invalid");
    isValid = false;
  } else if (duration <= 30) {
    errorDuration.textContent = "Thời lượng phải > 30 phút";
    durationInput.classList.add("invalid");
    isValid = false;
  } else if (isNaN(duration)) {
    errorDuration.textContent = "Thời lượng phải phải nhập số";
    durationInput.classList.add("invalid");
    isValid = false;
  }

  if (!releaseDate) {
    errorDate.textContent = "Ngày khởi chiếu không được để trống";
    releaseDateInput.classList.add("invalid");
    isValid = false;
  }

  if (price === "") {
    errorPrice.textContent = "Giá vé không được để trống";
    priceInput.classList.add("invalid");
    isValid = false;
  } else if (price < 0) {
    errorPrice.textContent = "Giá vé không được âm";
    priceInput.classList.add("invalid");
    isValid = false;
  } else if (isNaN(price)) {
    errorPrice.textContent = "Giá vé phải nhập số";
    priceInput.classList.add("invalid");
    isValid = false;
  }

  if (!status) {
    errorStatus.textContent = "Trạng thái không được để trống";
    statusInput.classList.add("invalid");
    isValid = false;
  }

  if (!link) {
    errorLink.textContent = "Link poster không được để trống";
    linkInput.classList.add("invalid");
    isValid = false;
  }

  if (!description) {
    errorDesc.textContent = "Mô tả ngắn không được để trống";
    descriptionInput.classList.add("invalid")
    isValid = false
  }

  if (!isValid) return;

  if (idUpdate) {
    const exist = movies.find((movie) => movie.title.toLowerCase().trim() === name.toLowerCase().trim() && movie.id !== idUpdate);
    if (exist) {
      errorName.textContent = "Phim đã tồn tại trong kho";
      nameInput.classList.add("invalid");
      return
    }
    updateMovie(name, genre, duration, releaseDate, status, price, link, description);
    showToast("Thành công", "Cập nhật phim thành công", "success");
  } else {
    const exist = movies.find((movie) => movie.title.toLowerCase().trim() === name.toLowerCase().trim());
    if (exist) {
      errorName.textContent = "Phim đã tồn tại trong kho";
      nameInput.classList.add("invalid");
      return
    }
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
    movies.unshift(newMovie);

    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    showToast("Thành công", "Thêm phim thành công", "success");
  }

  renderMovies(movies);
  saveMovies();
  form.reset();
  // genreInput.clear();
});

const showToast = (title, message, type) => {
  const container = document.querySelector("#toast-container");
  if (!container) return;

  const toast = document.createElement("div");

  toast.className = `toast ${type} show`;

  const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-solid fa-trash-can";

  const MAX_TOAST = 4;

  if (container.children.length >= MAX_TOAST) {
    container.firstChild.remove();
  }

  toast.innerHTML = `
    <div class="toast-content">
      <i class="fa-regular ${icon}"></i>
      <div>
          <h3 style="margin: 0; font-size: 16px;">${title}</h3>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 1;">${message}</p>
      </div>
      <div class="close">✖</div>
      <div class="progress" style="animation-duration: 4000ms"></div>
  </div>
  `;

  container.appendChild(toast);

  let timer = setTimeout(function () {
    toast.classList.add("fade-out");
    setTimeout(function () {
      toast.remove();
    }, 400);
  }, 4000);

  toast.querySelector(".close").onclick = function () {
    clearTimeout(timer);
    toast.remove();
  }
};

// const editNameInput = document.querySelector("#editName");
// const editDurationInput = document.querySelector("#editDura");
// const editGenreInput = document.querySelector("#editGenres");
// const editDateInput = document.querySelector("#editDate");
// const editStatusInput = document.querySelector("#editStatus");
// const editPriceInput = document.querySelector("#editPrice");
// const editLinkInput = document.querySelector("#editLink");
// const editDescriptionInput = document.querySelector("#editDesc");

const editMovie = (id) => {
  const found = movies.find((movie) => movie.id === id);
  if (!found) return;

  idUpdate = id;

  // editNameInput.value = found.title;
  // editGenreInput.value = found.genres;
  // editDurationInput.value = found.duration;
  // const [day, month, year] = found.releaseDate.split("/");
  // editDateInput.value = `${year}-${month}-${day}`;
  // editStatusInput.value = found.status;
  // editPriceInput.value = found.ticketPrice;
  // editLinkInput.value = found.posterUrl;
  // editDescriptionInput.value = found.description;

  nameInput.value = found.title;
  genreInput.value = found.genres;
  durationInput.value = found.duration;
  const [day, month, year] = found.releaseDate.split("/");
  releaseDateInput.value = `${year}-${month}-${day}`;
  statusInput.value = found.status;
  priceInput.value = found.ticketPrice.toLocaleString("vi-VN") + " VNĐ";
  linkInput.value = found.posterUrl;
  descriptionInput.value = found.description;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  document.querySelector("#modal-title").textContent = "Cập nhật phim";
  submitBtn.innerHTML = `<i class="fa-regular fa-floppy-disk"></i> Cập nhật`;
};

const updateMovie = (name, genre, duration, releaseDate, status, price, link, description) => {
  const found = movies.find((movie) => movie.id === idUpdate);
  if (!found) return;

  found.title = name;
  found.genres = genre;
  found.duration = Number(duration);
  found.releaseDate = formatDate(releaseDate);
  found.description = description;
  found.posterUrl = link;
  found.status = Number(status);
  found.ticketPrice = Number(price);

  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  renderMovies(movies);
  saveMovies();
  form.reset();
  // genreInput.clear();

  document.querySelector("#modal-title").textContent = "Thêm phim mới";
  submitBtn.textContent = "+ Thêm mới"
  idUpdate = null;
};

// editForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const name = editNameInput.value.trim();
//   const genre = editGenreInput.value;
//   const duration = editDurationInput.value.trim();
//   const releaseDate = editDateInput.value;
//   const status = editStatusInput.value;
//   const price = editPriceInput.value.trim();
//   const link = editLinkInput.value;
//   const description = editDescriptionInput.value.trim();

//    let isValid = true;

//   if(!name){
//     document.querySelector("#edit-error-name").textContent = "Tên không được để trống";
//     editNameInput.classList.add("invalid");
//     isValid = false;
//   }

//   if(!genre){
//     document.querySelector("#edit-error-genres").textContent = `Phải chọn thể loại, nếu không có, chọn "Khác"`;
//     editGenreInput.classList.add("invalid");
//     isValid = false;
//   }

//   if(duration === ""){
//     document.querySelector("#edit-error-duration").textContent = "Thời lượng không được để trống";
//     editDurationInput.classList.add("invalid");
//     isValid = false;
//   } else if(duration <= 30){
//     document.querySelector("#edit-error-duration").textContent = "Thời lượng phái > 30 phút";
//     editDurationInput.classList.add("invalid");
//     isValid = false;
//   } else if(isNaN(duration)){
//     document.querySelector("#edit-error-duration").textContent = "Thời lượng phải nhập số";
//     editDurationInput.classList.add("invalid");
//     isValid = false;
//   }

//   if(!releaseDate){
//     document.querySelector("#edit-error-date").textContent = "Ngày khởi chiếu không được để trống";
//     editDateInput.classList.add("invalid");
//     isValid = false;
//   }

//   if(price===""){
//     document.querySelector("#edit-error-price").textContent = "Giá vé không được để trống";
//     editPriceInput.classList.add("invalid");
//     isValid = false;
//   } else if(price<0){
//     document.querySelector("#edit-error-price").textContent = "Giá vé không được âm";
//     editPriceInput.classList.add("invalid");
//     isValid = false;
//   } else if(isNaN(price)){
//     document.querySelector("#edit-error-price").textContent = "Giá vé phải nhập số";
//     editPriceInput.classList.add("invalid");
//     isValid = false;
//   }

//   if(!status){
//     document.querySelector("#edit-error-status").textContent = "Trạng thái không được để trống";
//     editStatusInput.classList.add("invalid");
//     isValid = false;
//   } else if (isNaN(status)) {
//     document.querySelector("#edit-error-status").textContent = "Trạng thái không được để trống";
//     editStatusInput.classList.add("invalid");
//     isValid = false;
//   }

//   if(!link) {
//     document.querySelector("#edit-error-link").textContent = "Link poster không được để trống";
//     editLinkInput.classList.add("invalid");
//     isValid = false;
//   }

//   if(!description) {
//     document.querySelector("#edit-error-desc").textContent = "Mô tả ngắn không được để trống";
//     editDescriptionInput.classList.add("invalid")
//     isValid = false
//   }

//   if(!isValid) return;

//   const exist = movies.find((movie) => movie.title.toLowerCase().trim() === name.toLowerCase().trim() && movie.id !== idUpdate);

//   if(exist) {
//     document.querySelector("#edit-error-name").textContent = "Phim đã tồn tại trong kho";
//     editNameInput.classList.add("invalid");
//     return
//   }

//   editMovie();
//   updateMovie(name, genre, duration, releaseDate, status, price, link, description);

//   showToast("Thành công", "Cập nhật phim thành công", "success");
// });

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

const search = document.querySelector("#search");
const tab = document.querySelectorAll(".tab");
let currentStatus = "all";
let currentKey = "";

const searchMovie = () => {
  let result = movies;
  if (currentStatus !== "all") {
    result = result.filter((movie) => movie.status === Number(currentStatus));
  }

  if (currentKey) {
    result = result.filter((movie) => movie.title.toLowerCase().trim().includes(currentKey) || movie.titleVi.toLowerCase().trim().includes(currentKey));
  }

  const labels = {
    all: "Tất cả",
    0: "Đã chiếu",
    1: "Đang chiếu",
    2: "Sắp chiếu"
  };

  const counts = {
    all: movies.length,
    0: movies.filter((movie) => movie.status === 0).length,
    1: movies.filter((movie) => movie.status === 1).length,
    2: movies.filter((movie) => movie.status === 2).length
  }

  tab.forEach(btn => {
    btn.textContent = `${labels[btn.value]} (${counts[btn.value]})`;
  });
  renderMovies(result);
};

tab.forEach(btn => {
  btn.addEventListener("click", () => {
    tab.forEach((t) => {
      currentPage = 1;
      t.classList.remove("active");
      btn.classList.add("active");
    });
    currentStatus = btn.value;
    searchMovie();
  });
});

let searchTimeout;
search.addEventListener("input", (e) => {
  document.querySelector("#clearSearch").style.display = search.value ? "block" : "none";

  currentKey = e.target.value.toLowerCase().trim();

  // ❗ Xóa timer cũ
  clearTimeout(searchTimeout);

  // ❗ Tạo timer mới
  searchTimeout = setTimeout(() => {
    searchMovie();
  }, 500); // 0.5 giây là hợp lý
});

document.querySelector("#clearSearch").addEventListener("click", () => {
  search.value = "";
  document.querySelector("#clearSearch").style.display = "none";
  renderMovies(movies); // reset list
});

const renderPagination = (totalItems) => {
  const paginationContainer = document.querySelector(".pagination");
  const info = document.querySelector(".pagination-container .info");

  const totalPages = Math.ceil(totalItems / pageSize);
  info.textContent = `Hiển thị ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, totalItems)} trên ${totalItems} phim`;

  let html = "";

  // Nút Previous
  html += `<button class="p-btn ${currentPage === 1 ? "inactive" : ""}" ${currentPage === 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>`;

  // Nút số trang
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="p-btn ${i === currentPage ? "active" : ""}">${i}</button>`;
  }

  // Nút Next
  html += `<button class="p-btn ${currentPage === totalPages ? "inactive" : ""}" ${currentPage === totalPages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>`;

  paginationContainer.innerHTML = html;

  // Bắt sự kiện cho các nút
  const btns = paginationContainer.querySelectorAll(".p-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;

      if (btn.querySelector("i")) { // nút prev/next
        currentPage += btn.querySelector("i").classList.contains("fa-chevron-left") ? -1 : 1;
      } else { // nút số
        currentPage = Number(btn.textContent);  // btn.textContent = "3" → chuyển thành số → currentPage = 3
      }

      searchMovie(); // render lại theo trang + search + tab
    });
  });
}

let deleteId = null;
const deleteMovie = (id) => {
  document.querySelector("#deleteModal").classList.add("active");
  document.body.style.overflow = "hidden";

  const found = movies.find((movie) => movie.id === id);
  if (!found) return;

  deleteId = id;
  document.querySelector(".delete-modal-content").innerHTML = `
    <h2>Xác nhận xóa phim</h2>
    <p>Bạn có chắc chắn muốn xóa phim <strong>"${found.titleVi}"</strong> không? 
    Hành động này không thể hoàn tác.</p>
  `;
};
document.querySelector("#btn-delete").addEventListener("click", () => {
  if (deleteId === null) return;
  movies = movies.filter((movie) => movie.id !== deleteId);

  document.querySelector("#deleteModal").classList.remove("active");
  document.body.style.overflow = "auto";
  showToast("Đã xóa", "Xóa phim thành công", "delete");

  searchMovie();
  saveMovies();
  deleteId = null;
})

init();