

// const form = document.getElementById('form')
// const Firstname = document.getElementById('Firstname')
// // const Lastname = document.getElementById('Lastname')
// // const Email = document.getElementById('Email')
// // const Password = document.getElementById('Password')
// // const Confirmpassword = document.getElementById('Confirmpassword')

const f = require("session-file-store");

// form.addEventListener('submit', e => {

//     validateInputs();
//     e.preventDefault()

// })
// const setError = (element, messege) => {
//     const inputControl = element.preventElement;
//     const errorDisplay = inputControl.querySelector('.error')

//     errorDisplay.innerText = messege;
//     inputControl.classList.add('error')
//     inputControl.classList.remove('success')
// }


// const setSuccess = element => {
//     const inputControl = element.preventElement;
//     const errorDisplay = inputControl.querySelector('.error')

//     errorDisplay.innerText = '';
//     inputControl.classList.add('success')
//     inputControl.classList.remove('error')
// }



// const validateInputs = () => {
//     // alert("ygbg")
//     const FirstnameValue = Firstname.Value.trim()
//     // const LastnameValue = Lastname.Value.trim()
//     // const EmailValue = Email.Value.trim()
//     // const PasswordValue = Password.Value.trim()
//     // const ConfirmpasswordValue = Confirmpassword.Value.trim()

//     if (FirstnameValue === '') {
//         setError(Firstname, 'firstname is required')

//     } else {
//         setSuccess(Firstname)
//     }

//     // if (LastnameValue === '') {
//     //     setError(Lastname, 'firstname is required')

//     // } else {
//     //     setSuccess(Lastname)
//     // }

//     // if (EmailValue === '') {
//     //     setError(Email, 'Email is required')

//     // } else if (!isValidEmail(EmailValue)) {
//     //     setError(Email, 'provide a valid Email is required')

//     // } else {
//     //     setSuccess(Email)
//     // }


//     // if (PasswordValue === '') {
//     //     setError(Password, 'password is required')
//     // } else if (PasswordValue.length < 8) {
//     //     setError(Password, 'password must be at least 8 charecrter')

//     // } else {
//     //     setSuccess(Password);
//     // }

//     // if (ConfirmpasswordValue === '') {
//     //     setError(Confirmpassword, 'password is required')

//     // } else if (PasswordValue!== ConfirmpasswordValue) {
//     //     setError(Confirmpassword, 'password must be at least 8 charecrter')

//     // } else {
//     //     setSuccess(Confirmpassword);
//     // }
// };








// signup validation---->



function signUpValidation() {

    let flag = 0;

    let usercheck = /^[A-Za-z.]{3,30}$/
    // let passwordcheck = /(?=.*[0-9])(?=.*[!#$%^&*])[a-zA]-Z0-9!#$%^&*]{8,16}$/


    const Firstname = document.getElementById('Firstname')
    const Lastname = document.getElementById('Lastname')
    const Email = document.getElementById('Email')
    const Password = document.getElementById('Password')
    const Confirmpassword = document.getElementById('Confirmpassword')


    let Fname = Firstname.value.trim()
    let Lname = Lastname.value.trim()
    let email = Email.value.trim()
    let password = Password.value.trim()
    let cnfmpassword = Confirmpassword.value.trim()





    if (usercheck.test(Fname) == "") {
        document.getElementById("nameError").innerHTML = "required"
        document.getElementById("Firstname").style.borderColor = "red"
        flag = 1

    }
    else {
        document.getElementById('Firstname').style.borderColor = "green"
    }




    if (Lname == "") {
        document.getElementById("LnameError").innerHTML = "required"
        document.getElementById("Lastname").style.borderColor = "red"
        flag = 1
    } else {
        document.getElementById('Lastname').style.borderColor = "green"
    }

    if (email == "") {
        document.getElementById("emailError").innerHTML = "required"
        document.getElementById("Email").style.borderColor = "red"
        flag = 1
    } else {
        document.getElementById('Email').style.borderColor = "green"

    }


    if (password == "") {
        document.getElementById("passwordError").innerHTML = "required"
        document.getElementById("Password").style.borderColor = "red"
        flag = 1
    } else {
        document.getElementById('Password').style.borderColor = "green"

    }

    if (cnfmpassword == "") {
        document.getElementById("cnfmpasswordError").innerHTML = "incorrect password"
        document.getElementById("Password").style.borderColor = "red"
        flag = 1

    }
    else if (password !== cnfmpassword) {
        document.getElementById("cnfmpasswordError").innerHTML = "required"
        flag = 1


    }
    else {

        document.getElementById('Password').style.borderColor = "green"

    }



    if (flag == 1) {
        return false
    }
}


// signup validation-->




// userLoginvalidation---->


function userLoginValidation() {

    let flag = 0;


    // let passwordcheck = /(?=.*[0-9])(?=.*[!#$%^&*])[a-zA]-Z0-9!#$%^&*]{8,16}$/



    const Email = document.getElementById('Email').value.trim()
    const Password = document.getElementById('Password').value.trim()



    if (Email == "") {
        document.getElementById("emailError").innerHTML = "required"
        document.getElementById("Email").style.borderColor = "red"
        flag = 1
    } else {
        document.getElementById('Email').style.borderColor = "green"

    }

    if (Password == "") {
        document.getElementById("passwordError").innerHTML = "required"
        document.getElementById("Password").style.borderColor = "red"
        flag = 1
    }
    // else if (passwordcheck.test(Password) == "") {
    //     document.getElementById("passwordError").innerHTML = "gsgsh"

    //     flag = 1
    // }

    else {
        document.getElementById('Password').style.borderColor = "green"

    }
    if (flag == 1) {
        return false
    }


}



// adimnLoginpage--->


function adminValidation() {


    flag = 0

    const Email = document.getElementById('Email').value.trim()
    const Password = document.getElementById('password').value.trim()



    if (Email == "") {
        document.getElementById("usernameError").innerHTML = "required"
        document.getElementById("Email").style.borderColor = "red"
        flag = 1
    } else {
        document.getElementById('Email').style.borderColor = "green"

    }

    if (Password == "") {
        document.getElementById("PasswordError").innerHTML = "required"
        document.getElementById("password").style.borderColor = "red"
        flag = 1
    }

    else {
        document.getElementById('password').style.borderColor = "green"

    }
    if (flag == 1) {
    }
}