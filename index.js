// for each button add event listener
document.querySelectorAll('#buttons > *').forEach(button =>
    button.addEventListener('click', function() {
        console.log(this.dataset.path)
    })
);