window.onload = function() {
    setInterval(setRandomGradient, 1000);
    setRandomGradient();
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function setRandomGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);

    const gradient = `linear-gradient(${angle}deg, ${color1} 0%, ${color2}, ${color3})`;

    const nav = document.querySelector('nav');
    if (nav) {
        nav.style.background = gradient;
    }

    const buttons = document.querySelectorAll('.signup-button, .login-button');
    buttons.forEach((button) => {
        button.style.background = gradient;
    });

    const buttons1 = document.querySelectorAll('.clear-button, .send-button, .redraw-button');
    buttons1.forEach((button) => {
        button.style.background = gradient;
    });
}