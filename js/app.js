// === Navigation System: ฟังก์ชันหลักสำหรับสลับหน้า ===
window.goPage = function(pageId) {
    // 1. ซ่อนทุกหน้า
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // 2. แสดงหน้าที่จะไป
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 3. ไฮไลท์ปุ่มใน Sidebar
    document.querySelectorAll('.sidebar-item').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('snav-' + pageId);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // 4. ถ้าเป็นหน้า Dashboard ให้โหลดข้อมูลใหม่
    if (pageId === 'dashboard' && typeof _initDashboardPage === 'function') {
        _initDashboardPage();
    }
};

// ฟังก์ชันสำหรับหน้า Dashboard (จัดการวันที่)
function _initDashboardPage() {
    const dateEl = document.getElementById('dash-header-date');
    if (dateEl) {
        const d = new Date();
        dateEl.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    // เรียกใช้ฟังก์ชันจากไฟล์ Dashboard.js ถ้ามี
    if (typeof loadDemoDashboard === 'function') loadDemoDashboard();
    if (typeof initAutoUpdateBar === 'function') initAutoUpdateBar();
}

// เมื่อโหลดหน้าเว็บเสร็จ ให้เช็คว่าหน้าไหนเป็นหน้าแรก
document.addEventListener('DOMContentLoaded', () => {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        const id = activePage.id.replace('page-', '');
        goPage(id); // สั่งรันคำสั่งจัดการ UI ให้ครบถ้วน
    }
});

// ฟังก์ชัน Dark Mode
window.toggleModeFromSidebar = function() {
    const el = document.documentElement;
    const isLight = el.getAttribute('data-mode') === 'light';
    const newMode = isLight ? 'dark' : 'light';
    el.setAttribute('data-mode', newMode);
    localStorage.setItem('mode', newMode);
};