document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (sidebarClose && sidebar && overlay) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Login Slider Logic
    const container = document.getElementById('slider-container');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');

    if (registerBtn && loginBtn && container) {
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

    // Mobile Login Tabs Logic
    const mobileTabs = document.querySelectorAll('.mobile-tab-btn');
    if (mobileTabs.length > 0 && container) {
        mobileTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                mobileTabs.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const target = btn.getAttribute('data-target');
                if (target === 'admin') {
                    container.classList.add("active");
                } else {
                    container.classList.remove("active");
                }
            });
        });
    }

    // Signup Specialization Toggle
    const roleSelect = document.getElementById('roleSelect');
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            toggleSpecialization(this.value);
        });
    }
});

function toggleSpecialization(role) {
    const specGroup = document.getElementById('specializationGroup');
    const specSelect = document.getElementById('specializationSelect');
    if (specGroup && specSelect) {
        if (role === 'instructor') {
            specGroup.style.display = 'block';
            specSelect.required = true;
        } else {
            specGroup.style.display = 'none';
            specSelect.required = false;
        }
    }
}
