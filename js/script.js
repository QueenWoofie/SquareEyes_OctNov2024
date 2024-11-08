document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = this.href;
      }, 500);
    });
  });