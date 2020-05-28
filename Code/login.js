/* === Login Page === */
/* STYLING NEEDS TO BE ADDED */

const loginForm = document.forms['login-form'];
    
loginForm.addEventListener('submit', (e) =>
{
    
    e.preventDefault();

    // Stores login details
    var email = loginForm['userEmail'].value;
    var password = loginForm['userPassword'].value;

    // Validates the email (the rest is already validated via the 'required' parameter on the HTML form)
    var emailSplit = email.split("@");
    var emailDomain = emailSplit[1].split(".")[1];

    if (emailDomain == null)
    {
        alert("An email (***@***.***) must have at least 1 character for each (***).");
    }
    
    // Validates the password
    var passwordSplit = password.split("");
    var numbersInPassword = false;
    
    for (var index in passwordSplit)
    {
        if (parseInt(passwordSplit[index], 10))
        {
            numbersInPassword = true;
            break;
        }
    }
    const MIN_PASSWORD_LENGTH = 8; 
    if (passwordSplit.length < MIN_PASSWORD_LENGTH || !numbersInPassword)
    {
        alert("A password needs to be at least 8 characters long, and needs to contain at least 1 number.");
        e.preventDefault();
    }
});