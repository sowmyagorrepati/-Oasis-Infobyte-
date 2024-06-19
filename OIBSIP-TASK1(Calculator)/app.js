function cleardisplay() {
    document.querySelector('.display').value = '';
}

function deletebtn() {
    let display = document.querySelector('.display');
    display.value = display.value.slice(0, -1);
}

function solve(value) {
    document.querySelector('.display').value += value;
}

function res() {
    let display = document.querySelector('.display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}
