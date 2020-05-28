/* === Login Page === */

const loginForm = document.forms['login-form'];
loginForm.addEventListener('submit', (e) =>
{
    e.preventDefault();

    // Stores email address
    var email = loginForm["userEmail"].value;
    var emailSplit = email.split("@");
    
    // Stores password
    var password = loginForm["userPass"].value;
    var passwordSplit = email.split("");
    var numbersInPassword = passwordSplit.some(i => Number.isInteger(i).Length);

    // Dividing of an email address into smaller parts
    var emailName = emailSplit[0];
    var emailProvider = emailSplit[1].split(".")[0];
    var emailDomain = emailSplit[1].split(".")[1];

    // The logic is there, but I don't know why Alert() does nothing. Tell me if you know -->
    // Will update viuals soon -->
    if (emailName.Length == 0 || emailProvider.Length == 0 || emailDomain.Length == 0)
        alert("An email, ***@***.*** must have at least 1 character for each \"***\".");

    MIN_PASSWORD_LENGTH = 8; MIN_NUMBERS_PASSWORD
    if (password.Length < MIN_PASSWORD_LENGTH && MIN_NUMBERS_PASSWOR<= 1)
        alert("A password needs to be at least 8 characters long, and needs to contain 1+ letters.");

});