document.addEventListener('DOMContentLoaded', function () {

    var themeBtns = document.querySelectorAll('.theme-toggle-button');
    var html = document.documentElement;

    var savedTheme = localStorage.getItem('theme');
    var isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    function updateThemeToggles(isDark) {
        themeBtns.forEach(function (btn) {
            btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        });
    }

    updateThemeToggles(isDark);

    themeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            html.classList.toggle('dark');
            var isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeToggles(isDark);
        });
    });

    var header = document.getElementById('header');
    var scrollToTopBtn = document.getElementById('scroll-to-top');
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }

        if (window.scrollY > 500) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
        }

        var current = '';
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        }

        for (var j = 0; j < navLinks.length; j++) {
            var link = navLinks[j];
            link.classList.remove('text-primary');
            link.classList.add('text-slate-600', 'dark:text-slate-300');
            if (link.getAttribute('href').indexOf(current) !== -1 && current !== '') {
                link.classList.remove('text-slate-600', 'dark:text-slate-300');
                link.classList.add('text-primary');
            }
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    for (var k = 0; k < navLinks.length; k++) {
        (function (index) {
            var link = navLinks[index];
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var targetId = link.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        })(k);
    }

    var filterBtns = document.querySelectorAll('.portfolio-filter');
    var items = document.querySelectorAll('.portfolio-item');

    for (var l = 0; l < filterBtns.length; l++) {
        (function (idx) {
            var btn = filterBtns[idx];
            btn.addEventListener('click', function () {
                for (var m = 0; m < filterBtns.length; m++) {
                    var b = filterBtns[m];
                    b.classList.remove('active', 'bg-linear-to-r', 'from-primary', 'to-secondary', 'text-white');
                    b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
                }
                btn.classList.add('active', 'bg-linear-to-r', 'from-primary', 'to-secondary', 'text-white');
                btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

                var filterValue = btn.getAttribute('data-filter');

                for (var n = 0; n < items.length; n++) {
                    var item = items[n];
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.animate([
                            { transform: 'scale(0.9)', opacity: 0 },
                            { transform: 'scale(1)', opacity: 1 }
                        ], {
                            duration: 300,
                            easing: 'ease-out'
                        });
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        })(l);
    }

    var carousel = document.getElementById('testimonials-carousel');
    var prevBtn = document.getElementById('prev-testimonial');
    var nextBtn = document.getElementById('next-testimonial');
    var indicators = document.querySelectorAll('.carousel-indicator');

    var currentIndex = 0;
    var totalItems = document.querySelectorAll('.testimonial-card').length;

    function updateCarousel() {
        var visibleItems;
        if (window.innerWidth >= 1024) {
            visibleItems = 3;
        } else if (window.innerWidth >= 640) {
            visibleItems = 2;
        } else {
            visibleItems = 1;
        }

        var maxIndex = totalItems - visibleItems;
        if (maxIndex < 0) maxIndex = 0;

        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;

        var itemWidth = 100 / visibleItems;
        var isRTL = document.documentElement.dir === 'rtl';
        var direction = isRTL ? 1 : -1;

        var translateValue = (currentIndex * itemWidth) * direction;
        carousel.style.transform = 'translateX(' + translateValue + '%)';

        for (var o = 0; o < indicators.length; o++) {
            var dot = indicators[o];
            if (o === currentIndex) {
                dot.classList.add('bg-accent', 'scale-125');
                dot.classList.remove('bg-slate-400', 'dark:bg-slate-600');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('bg-accent', 'scale-125');
                dot.classList.add('bg-slate-400', 'dark:bg-slate-600');
                dot.setAttribute('aria-selected', 'false');
            }
        }
    }

    nextBtn.addEventListener('click', function () {
        currentIndex++;
        updateCarousel();
    });

    prevBtn.addEventListener('click', function () {
        currentIndex--;
        updateCarousel();
    });

    for (var p = 0; p < indicators.length; p++) {
        (function (idx) {
            var dot = indicators[idx];
            dot.addEventListener('click', function () {
                currentIndex = idx;
                updateCarousel();
            });
        })(p);
    }

    window.addEventListener('resize', function () {
        currentIndex = 0;
        updateCarousel();
    });
    updateCarousel();

    var form = document.querySelector('form[aria-label="نموذج التواصل"]');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> جاري الإرسال...';
            btn.disabled = true;

            setTimeout(function () {
                btn.innerHTML = '<i class="fa-solid fa-check me-2"></i> تم الإرسال بنجاح!';
                btn.classList.remove('from-primary', 'to-secondary');
                btn.classList.add('bg-emerald-500');
                form.reset();

                setTimeout(function () {
                    btn.innerHTML = originalText;
                    btn.classList.add('from-primary', 'to-secondary');
                    btn.classList.remove('bg-emerald-500');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    var selects = document.querySelectorAll('.custom-select-wrapper');
    for (var q = 0; q < selects.length; q++) {
        (function (loopIndex) {
            var wrapper = selects[loopIndex];
            var select = wrapper.querySelector('.custom-select');
            var options = wrapper.querySelector('.custom-options');
            var optionItems = wrapper.querySelectorAll('.custom-option');
            var selectedText = wrapper.querySelector('.selected-text');

            select.addEventListener('click', function () {
                options.classList.toggle('hidden');
                select.setAttribute('aria-expanded', !options.classList.contains('hidden'));
            });

            for (var r = 0; r < optionItems.length; r++) {
                (function (optIndex) {
                    var item = optionItems[optIndex];
                    item.addEventListener('click', function () {
                        selectedText.textContent = item.textContent.trim();
                        selectedText.classList.remove('text-slate-500', 'dark:text-slate-400');
                        selectedText.classList.add('text-slate-800', 'dark:text-white');
                        options.classList.add('hidden');
                        select.setAttribute('aria-expanded', 'false');
                    });
                })(r);
            }

            document.addEventListener('click', function (e) {
                if (!wrapper.contains(e.target)) {
                    options.classList.add('hidden');
                    select.setAttribute('aria-expanded', 'false');
                }
            });
        })(q);
    }

    var toggleBtn = document.getElementById('settings-toggle');
    var sidebar = document.getElementById('settings-sidebar');
    var closeBtn = document.getElementById('close-settings');
    var resetBtn = document.getElementById('reset-settings');

    function toggleSidebar() {
        var isClosed = sidebar.classList.contains('translate-x-full');
        var icon = toggleBtn.querySelector('i');

        if (isClosed) {
            sidebar.classList.remove('translate-x-full');
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.style.right = '20rem';
            icon.style.transform = 'rotate(180deg)';
        } else {
            sidebar.classList.add('translate-x-full');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.style.right = '0';
            icon.style.transform = 'rotate(0deg)';
        }
    }

    toggleBtn.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);

    var fontBtns = document.querySelectorAll('.font-option');
    for (var s = 0; s < fontBtns.length; s++) {
        (function (index) {
            var btn = fontBtns[index];
            btn.addEventListener('click', function () {
                for (var t = 0; t < fontBtns.length; t++) {
                    var b = fontBtns[t];
                    b.setAttribute('aria-checked', 'false');
                    b.classList.remove('active', 'border-primary', 'bg-primary/5');
                }
                btn.setAttribute('aria-checked', 'true');
                btn.classList.add('active', 'border-primary', 'bg-primary/5');

                var font = btn.getAttribute('data-font');
                document.body.classList.remove('font-alexandria', 'font-cairo', 'font-tajawal');
                document.body.classList.add('font-' + font);
                localStorage.setItem('font', font);
            });
        })(s);
    }

    var colors = [
        { name: 'Cyan', primary: '#06b6d4', secondary: '#3b82f6', accent: '#0ea5e9' },
        { name: 'Emerald', primary: '#10b981', secondary: '#3b82f6', accent: '#059669' },
        { name: 'Rose', primary: '#f43f5e', secondary: '#d946ef', accent: '#e11d48' },
        { name: 'Violet', primary: '#8b5cf6', secondary: '#d946ef', accent: '#7c3aed' },
        { name: 'Orange', primary: '#f97316', secondary: '#ef4444', accent: '#ea580c' },
        { name: 'Red', primary: '#ef4444', secondary: '#b91c1c', accent: '#dc2626' }
    ];

    var grid = document.getElementById('theme-colors-grid');

    for (var t = 0; t < colors.length; t++) {
        (function (idx) {
            var color = colors[idx];
            var btn = document.createElement('button');
            btn.className = 'color-option w-12 h-12 rounded-full transition-all duration-300 relative group flex items-center justify-center';
            btn.setAttribute('aria-label', 'Change theme to ' + color.name);

            var innerCircle = document.createElement('div');
            innerCircle.className = 'w-full h-full rounded-full shadow-sm';
            innerCircle.style.background = 'linear-gradient(to bottom right, ' + color.primary + ', ' + color.secondary + ')';

            btn.appendChild(innerCircle);

            btn.addEventListener('click', function () {
                var root = document.documentElement;
                root.style.setProperty('--color-primary', color.primary);
                root.style.setProperty('--color-secondary', color.secondary);
                root.style.setProperty('--color-accent', color.accent);

                var allBtns = grid.querySelectorAll('.color-option');
                for (var u = 0; u < allBtns.length; u++) {
                    var b = allBtns[u];
                    b.style.boxShadow = 'none';
                    b.style.transform = 'scale(1)';
                }

                var isDark = document.documentElement.classList.contains('dark');
                var offsetColor = isDark ? '#0f172a' : '#ffffff';

                btn.style.transform = 'scale(1.1)';
                btn.style.boxShadow = '0 0 0 3px ' + offsetColor + ', 0 0 0 6px ' + color.primary;

                localStorage.setItem('themeColor', JSON.stringify(color));
            });

            var savedColor = JSON.parse(localStorage.getItem('themeColor') || 'null');
            if (savedColor && savedColor.name === color.name) {
                setTimeout(function () {
                    var isDark = document.documentElement.classList.contains('dark');
                    var offsetColor = isDark ? '#0f172a' : '#ffffff';
                    btn.style.transform = 'scale(1.1)';
                    btn.style.boxShadow = '0 0 0 3px ' + offsetColor + ', 0 0 0 6px ' + color.primary;
                }, 0);
            } else if (!savedColor && idx === 0) {
                setTimeout(function () {
                    var isDark = document.documentElement.classList.contains('dark');
                    var offsetColor = isDark ? '#0f172a' : '#ffffff';
                    btn.style.transform = 'scale(1.1)';
                    btn.style.boxShadow = '0 0 0 3px ' + offsetColor + ', 0 0 0 6px ' + color.primary;
                }, 0);
            }

            grid.appendChild(btn);
        })(t);
    }

    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });

        var mobileLinks = mobileMenu.querySelectorAll('a');
        for (var i = 0; i < mobileLinks.length; i++) {
            mobileLinks[i].addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        }
    }

    var savedFont = localStorage.getItem('font');
    if (savedFont) {
        var fontBtn = document.querySelector('[data-font="' + savedFont + '"]');
        if (fontBtn) fontBtn.click();
    }

    resetBtn.addEventListener('click', function () {
        localStorage.clear();
        window.location.reload();
    });

});
