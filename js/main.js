// ================================================
// Visual Sandbox - Main JavaScript
// ================================================

document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // --- Tabs ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-tab');

            tabButtons.forEach(function (b) { b.classList.remove('active'); });
            tabContents.forEach(function (c) { c.classList.remove('active'); });

            this.classList.add('active');
            var target = document.getElementById(targetId);
            if (target) {
                target.classList.add('active');
            }
        });
    });

    // --- Password Strength Indicator ---
    const passwordInput = document.getElementById('regPassword');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput && strengthFill && strengthText) {
        passwordInput.addEventListener('input', function () {
            var val = this.value;
            var strength = 0;

            if (val.length >= 4) strength += 1;
            if (val.length >= 8) strength += 1;
            if (/[A-Z]/.test(val)) strength += 1;
            if (/[0-9]/.test(val)) strength += 1;
            if (/[^A-Za-z0-9]/.test(val)) strength += 1;

            var percent = (strength / 5) * 100;
            var colors = ['#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
            var labels = ['Tres faible', 'Faible', 'Moyen', 'Fort', 'Tres fort'];

            strengthFill.style.width = percent + '%';

            if (strength > 0) {
                strengthFill.style.background = colors[strength - 1];
                strengthText.textContent = labels[strength - 1];
            } else {
                strengthFill.style.width = '0%';
                strengthText.textContent = 'Entrez un mot de passe';
            }
        });
    }

    // --- Form Submissions (prevent default) ---
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var formId = this.id || 'formulaire';
            showNotification('Formulaire "' + formId + '" soumis avec succes !', 'success');
        });
    });

    // --- Gallery Filter ---
    var filterButtons = document.querySelectorAll('.filter-btn');
    var galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
        });
    });

    // --- Gallery Modal ---
    var galleryImages = document.querySelectorAll('.gallery-image');
    var modal = document.getElementById('imageModal');
    var modalClose = document.getElementById('modalClose');
    var modalTitle = document.getElementById('modalTitle');
    var modalDescription = document.getElementById('modalDescription');
    var modalImage = document.getElementById('modalImage');

    if (modal) {
        galleryImages.forEach(function (img) {
            img.addEventListener('click', function () {
                var overlay = this.querySelector('.gallery-overlay');
                if (overlay) {
                    var title = overlay.querySelector('h3');
                    var desc = overlay.querySelector('p');
                    if (modalTitle && title) modalTitle.textContent = title.textContent;
                    if (modalDescription && desc) modalDescription.textContent = desc.textContent;
                    if (modalImage) modalImage.style.background = this.style.background;
                }
                modal.classList.add('active');
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', function () {
                modal.classList.remove('active');
            });
        }

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // --- File Upload Drop Zone ---
    var dropZone = document.getElementById('dropZone');
    if (dropZone) {
        dropZone.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.style.borderColor = '#4f46e5';
            this.style.background = '#f0f0ff';
        });

        dropZone.addEventListener('dragleave', function () {
            this.style.borderColor = '#d0d0d0';
            this.style.background = 'transparent';
        });

        dropZone.addEventListener('drop', function (e) {
            e.preventDefault();
            this.style.borderColor = '#10b981';
            this.style.background = '#f0fdf4';

            var files = e.dataTransfer.files;
            if (files.length > 0) {
                var fileName = files[0].name;
                this.querySelector('p').textContent = 'Fichier selectionne : ' + fileName;
            }
        });

        dropZone.addEventListener('click', function () {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = '.png,.jpg,.jpeg,.pdf';
            input.addEventListener('change', function () {
                if (this.files.length > 0) {
                    dropZone.querySelector('p').textContent = 'Fichier selectionne : ' + this.files[0].name;
                    dropZone.style.borderColor = '#10b981';
                }
            });
            input.click();
        });
    }

    // --- Sidebar active item ---
    var sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(function (item) {
        item.addEventListener('click', function () {
            sidebarItems.forEach(function (i) { i.classList.remove('active'); });
            this.classList.add('active');
        });
    });

    // --- Notification System ---
    function showNotification(message, type) {
        var notification = document.createElement('div');
        notification.className = 'notification notification-' + (type || 'info');
        notification.textContent = message;

        notification.style.cssText = 'position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:8px;font-size:14px;z-index:9999;animation:slideIn 0.3s ease;max-width:360px;box-shadow:0 4px 12px rgba(0,0,0,0.15);';

        if (type === 'success') {
            notification.style.background = '#d1fae5';
            notification.style.color = '#065f46';
            notification.style.border = '1px solid #a7f3d0';
        } else if (type === 'error') {
            notification.style.background = '#fee2e2';
            notification.style.color = '#991b1b';
            notification.style.border = '1px solid #fecaca';
        } else {
            notification.style.background = '#dbeafe';
            notification.style.color = '#1e40af';
            notification.style.border = '1px solid #bfdbfe';
        }

        document.body.appendChild(notification);

        setTimeout(function () {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(function () {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

});
