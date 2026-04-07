const users = JSON.parse(localStorage.getItem("users")) || [];
const movies = JSON.parse(localStorage.getItem("movies")) || [];
const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

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

const init=()=>{
    renderTickets(tickets);
};

const formatDate=(date)=>{
    const d = new Date(date);
    if(isNaN(d)) return "";

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());
    return `${day}/${month}/${year}`;
};

let currentPage = 1;
let pageSize = 2;

const renderTickets=(tickets) => {
    if(tickets.length===0){
        ticketTable.innerHTML = "";
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    let start = (currentPage-1) * pageSize;
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
                <button type="button" onclick="editMovie()"><i class="fa-solid fa-pen"></i></button>
                <button type="button" onclick="deleteMovie()"><i
                        class="fa-regular fa-circle-xmark"></i></i></button>
            </td>
        </tr>
    `).join("");
    renderPagination(tickets.length);
};

const searchInput = document.querySelector("#search");
const clearSearch = document.querySelector("#clearSearch");
let searchTimeout;
const searchTicket=() => {
    let keyword = searchInput.value.toLowerCase().trim();
    let result = tickets.filter((ticket) => ticket.ticketCode.toLowerCase().trim().includes(keyword) || ticket.customerName.toLowerCase().trim().includes(keyword));
    renderTickets(result);
};
searchInput.addEventListener("input", () => {
    clearSearch.style.display = searchInput.value ? "block" : "none";
    clearTimeout(searchTimeout);
    setTimeout(() => {
        searchTicket();
    }, 500);
});
clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    renderTickets(tickets);
    clearSearch.style.display = "none";
});

const renderPagination=(totalItems) => {
    const pagination = document.querySelector(".pagination");
    const info = document.querySelector(".info");
    let totalPages = Math.ceil(totalItems / pageSize);
    info.innerHTML = `Đang hiển thị ${(currentPage-1)*pageSize + 1} đến ${Math.min(currentPage*pageSize, totalItems)} trên ${totalItems} vé`;
    
    let html = "";
    html += `<button type="button" class="p-btn ${currentPage === 1 ? "inactive" : ""}" ${currentPage === 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>`;
    for(let i=1; i<=totalPages; i++){
        html += `<button type="button" class="p-btn ${i===currentPage ? "active" : ""}">${i}</button>`;
    }
    html += `<button type="button" class="p-btn ${currentPage === totalPages ? "inactive" : ""}" ${currentPage===totalPages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>`;
    pagination.innerHTML = html;

    document.querySelectorAll(".p-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if(btn.disabled) return;

            if(btn.querySelector("i")){
                currentPage += btn.querySelector("i").classList.contains("fa-chevron-left") ? -1 : 1;
            } else {
                currentPage = Number(btn.textContent);
            }
            searchTicket();
        });
    });
};

init();