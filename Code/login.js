/* === Login Page === */
const loginForm = document.forms['login-form'];

var loginStatus = 
{
    isEmailValid : false,
    isPasswordValid : false
}

loginForm.addEventListener('submit', (e) =>
{
    // Stores login details
    var email = loginForm['userEmail'].value;
    var password = loginForm['userPassword'].value;

    // Validates the email (the rest is already validated via the 'required' parameter on the HTML form)
    var emailSplit = email.split("@");
    var emailDomain = emailSplit[1].split(".")[1];

    if (emailDomain == null)
    {
        e.preventDefault();
        alert("An email (***@***.***) must have at least 1 character for each (***).");
    }
    else 
    {
        loginStatus.isEmailValid = true;
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

    if (!numbersInPassword)
    {
        e.preventDefault();
        alert("A password needs to contain at least 1 number.");
    }
    else if (numbersInPassword && passwordSplit.Length >= 8)
    {
        loginStatus.isPasswordValid = true;
    }

});