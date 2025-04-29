// SearchForm Section code
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
}; // Fixed missing closing };

window.onscroll = () => {
    searchForm.classList.remove('active');
};

$(document).ready(function() {

    $(window).scroll(function() {
        // Navbar-bottom scrolling
        if (this.scrollY > 5) {
            $('.navbar-bottom').addClass("sticky");
        } else {
            $('.navbar-bottom').removeClass("sticky");
        }

        // Scrolling Button Btn
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    }); // Fixed missing });

    // Slide-up script
    $('.scroll-up-btn').click(function() {
        $('html').animate({ scrollTop: 0 });
    });

    // Owl Carousel
    $('.owl-carousel').owlCarousel({
        margin: 5,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,

        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });

    // Enhanced Rating System with Animation
    document.querySelectorAll('.bxs-star').forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            document.querySelectorAll('.bxs-star').forEach((s, index) => {
                s.classList.toggle('active', index < value);
                if (index < value) {
                    s.style.animation = `starPop 0.3s ease ${index * 0.1}s`;
                }
            });
            document.getElementById('selectedRating').value = value;
        });
    });

    // Enhanced Form Handling with Loading States
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            try {
                submitButton.innerHTML = '<div class="spinner"></div>';
                submitButton.disabled = true;

                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    // Reset stars if feedback form
                    if (form.id === 'feedbackForm') {
                        document.querySelectorAll('.bxs-star').forEach(star => {
                            star.classList.remove('active');
                        });
                        document.getElementById('selectedRating').value = 0;
                    }
                    showToast('Message sent successfully!', 'success');
                } else {
                    showToast('Oops! Something went wrong.', 'error');
                }
            } catch (error) {
                showToast('Network error. Please check your connection.', 'error');
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    });
}); // Properly closed document.ready

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}