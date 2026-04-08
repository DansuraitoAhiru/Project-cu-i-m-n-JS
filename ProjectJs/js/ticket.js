let users = JSON.parse(localStorage.getItem("users")) || [];
let movies = JSON.parse(localStorage.getItem("movies")) || [];
let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

const ticketTable = document.querySelector("#ticketTable");
const emptyState = document.querySelector("#emptyState");

document.querySelector("#logout").addEventListener("click", () => {
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
            localStorage.removeItem("currentUser");
            sessionStorage.removeItem("currentUser");
            window.location.href = "login.html";
        }
    });
});

const init = () => {
    renderTickets(tickets);
};

const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d)) return "";

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());
    return `${day}/${month}/${year}`;
};

let currentPage = 1;
let pageSize = 2;

const renderTickets = (tickets) => {
    if (tickets.length === 0) {
        ticketTable.innerHTML = "";
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    let pagedTickets = tickets.slice(start, end)

    ticketTable.innerHTML = pagedTickets.map((ticket) => `
        <tr>
            <td class="text-red">#${ticket.ticketCode}</td>
            <td class="customerName"><strong>${ticket.customerName}</strong></td>
            <td class="movieTitle">${ticket.movieTitle}</td>
            <td>${ticket.showTime}<br><small class="smallText">${formatDate(ticket.showDate)}</small></td>
            <td><span class="tag-seat">${ticket.seats.join(", ")}</span></td>
            <td>${ticket.totalAmount.toLocaleString("vi-VN")}đ</td>
            <td><span class="badge ${ticket.statusDisplay === "Đã Thanh Toán" ? "success" : ticket.statusDisplay === "Chờ xử lý" ? "waiting" : "cancel"}">${ticket.statusDisplay}</span></td>
            <td class="actions">
                <button type="button" onclick="editTicket(${ticket.id})"><i class="fa-solid fa-pen"></i></button>
                <button type="button" onclick="cancelTicket(${ticket.id})"><i
                        class="fa-regular fa-circle-xmark"></i></i></button>
            </td>
        </tr>
    `).join("");
    renderPagination(tickets.length);
};

const searchInput = document.querySelector("#search");
const clearSearch = document.querySelector("#clearSearch");
let searchTimeout;
const searchTicket = () => {
    let keyword = searchInput.value.toLowerCase().trim();
    let result = tickets.filter((ticket) => ticket.ticketCode.toLowerCase().trim().includes(keyword) || ticket.customerName.toLowerCase().trim().includes(keyword));
    renderTickets(result);
};
searchInput.addEventListener("input", () => {
    clearSearch.style.display = searchInput.value ? "block" : "none";
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchTicket();
    }, 500);
});
clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    renderTickets(tickets);
    clearSearch.style.display = "none";
});

const renderPagination = (totalItems) => {
    const pagination = document.querySelector(".pagination");
    const info = document.querySelector(".info");
    let totalPages = Math.ceil(totalItems / pageSize);
    info.innerHTML = `Đang hiển thị ${(currentPage - 1) * pageSize + 1} đến ${Math.min(currentPage * pageSize, totalItems)} trên ${totalItems} vé`;

    let html = "";
    html += `<button type="button" class="p-btn ${currentPage === 1 ? "inactive" : ""}" ${currentPage === 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = 1; i <= totalPages; i++) {
        html += `<button type="button" class="p-btn ${i === currentPage ? "active" : ""}">${i}</button>`;
    }
    html += `<button type="button" class="p-btn ${currentPage === totalPages ? "inactive" : ""}" ${currentPage === totalPages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>`;
    pagination.innerHTML = html;

    document.querySelectorAll(".p-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.disabled) return;

            if (btn.querySelector("i")) {
                currentPage += btn.querySelector("i").classList.contains("fa-chevron-left") ? -1 : 1;
            } else {
                currentPage = Number(btn.textContent);
            }
            searchTicket();
        });
    });
};

const addForm = document.querySelector("#addForm");
const addBtn = document.querySelector("#addBtn");
const closeIcons = document.querySelectorAll(".close-icon");
const cancelBtns = document.querySelectorAll(".btn-cancel");
const addModal = document.querySelector("#addModal")

addBtn.addEventListener("click", () => {
    addModal.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeIcons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-overlay");
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
        addForm.reset();
    });
});

cancelBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-overlay");
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
        addForm.reset();
        showToast("Đã hủy", "Đã hủy thao tác", "error");
    });
});

const generateTicketCode = (tickets) => {
    if (tickets.length === 0) return "VE-1001";
    const max = Math.max(tickets.map(t => Number(t.ticketCode.split("-")[1])));
    return `VE-${max + 1}`;
};

addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#nameCustomer");
    const movieInput = document.querySelector("#selectMovie");
    const dateInput = document.querySelector("#selectDate");
    const seatsInput = document.querySelector("#selectSeats");

    const name = nameInput.value.trim();
    const movieId = movieInput.value;
    const showtime = dateInput.value;
    const seats = seatsInput.value;
    const paymentMethod = document.querySelector("#paymentMethod").value;

    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll(".invalid").forEach(e => e.classList.remove("invalid"));

    let isValid = true;

    if (!name) {
        document.querySelector("#error-name").textContent = "Tên khách hàng không được để trống";
        nameInput.classList.add("invalid");
        isValid = false;
    }
    if (!movieId) {
        document.querySelector("#error-movie").textContent = "Phải lựa chọn 1 phim";
        movieInput.classList.add("invalid");
        isValid = false;
    }
    if (!showtime) {
        document.querySelector("#error-date").textContent = "Chọn suất chiếu không được để trống";
        dateInput.classList.add("invalid");
        isValid = false;
    }
    if (!seats) {
        document.querySelector("#error-seats").textContent = "Chọn chỗ ngồi không được để trống";
        seatsInput.classList.add("invalid");
        isValid = false;
    }

    if (!isValid) return;

    const [date, time] = showtime.split(" ");
    const seatArray = seats.split(",").map(s => s.trim());

    const movie = movies.find(m => m.id == movieId);

    const newTicket = {
        id: Date.now(),
        ticketCode: generateTicketCode(tickets),
        customerName: name,
        movieId: movie.id,
        movieTitle: movie.titleVi,
        showDate: date,
        showTime: time,
        seats: seatArray,
        seatCount: seatArray.length,
        pricePerSeat: movie.ticketPrice,
        totalAmount: seatArray.length * movie.ticketPrice,
        paymentMethod: Number(paymentMethod),
        paymentStatus: false,
        createdAt: new Date(),
        note: "",
        statusDisplay: status
    };

    tickets.unshift(newTicket);

    renderTickets(tickets)
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

    let timer = setTimeout(() => { // để toast biến mất
        toast.classList.add("fade-out");
        setTimeout(() => {  // để animation chạy
            toast.remove();
        }, 400);
    }, 4000);

    toast.querySelector(".close").onclick = () => {
        clearTimeout(timer);
        toast.remove();
    }
};

const editModal = document.querySelector("#editModal");
const editTicket = (id) => {
    editModal.classList.add("active");
    document.body.style.overflow = "hidden";

    const found = tickets.find((ticket) => ticket.id === id);
    if (!found) returm;
}

let deleteId = null;
const cancelTicket = (id) => {
    document.querySelector("#cancelModal").classList.add("active");
    document.body.style.overflow = "hidden";

    const found = tickets.find((ticket) => ticket.id === id);
    if (!found) return;
    deleteId = id;

    document.querySelector(".cancel-modal-content").innerHTML = `
        <h2>Xác nhận xóa phim</h2>
        <p>Bạn có chắc chắn muốn hủy và xóa vé mã này không?</p>
        <p class="warn">Hành động này sẽ giải phóng ghế ngồi và không thể hoàn tác.</p>
    `;
};
document.querySelector("#btn-confirm-cancel").addEventListener("click", () => {
    if (deleteId === null) return;
    let ticket = tickets.find(t => t.id === deleteId);
    if (ticket) {
        ticket.statusDisplay = "Đã hủy";
    }

    document.querySelector("#cancelModal").classList.remove("active");
    document.body.style.overflow = "auto";

    searchTicket();
    deleteId = null;
});

init();
