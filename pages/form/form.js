// for prevent arrow key to increase number in ijnput field

document.addEventListener('DOMContentLoaded', function () {
    var numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(function (input) {
        input.addEventListener('keydown', function (e) {
            // Prevent arrow keys from changing the value
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
            }
        });
    });
});