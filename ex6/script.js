const container = document.getElementById('container');

function generateRandomChars(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

window.onload = function() {
    const initialCount = Math.floor(Math.random() * 3);
    container.innerText = generateRandomChars(initialCount);
    container.focus();
};

window.addEventListener('keyup', function(e) {
    let currentText = container.innerText;

    if (currentText.length > 0 && e.key === currentText[0]) {
        container.innerText = currentText.substring(1);
    }

    const addCount = Math.floor(Math.random() * 3) + 1;
    container.innerText += generateRandomChars(addCount);
});
