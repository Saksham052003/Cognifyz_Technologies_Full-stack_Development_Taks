document.getElementById('registrationForm').onsubmit = function (event) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('messageid').value;


    if (name === '') {
        alert('Please enter your name.');
        event.preventDefault();
    }

    if (email === '') {
        alert('Please enter your email.');
        event.preventDefault();
    }

    if (message === '') {
        alert('Please enter your message.');
        event.preventDefault();
    }

    
}