if (document.documentElement.clientWidth > 750) {
    document.documentElement.style.fontSize = 750 / 7.5 + 'px';
} else {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
}