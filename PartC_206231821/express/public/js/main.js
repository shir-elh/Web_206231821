function phone_validation(inputnum) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputnum.match(phoneno)) {
        return {
            result: true,
            msg: ''
        };
    } else {
        return {
            result: false,
            msg: 'Not a valid Phone Number :( '
        };
    }
    return false;
}


function passid_validation(passid, mx, my) {
    var passid_len = passid.length;
    if (passid_len == 0 || passid_len >= my || passid_len < mx) {
        return {
            result: false,
            msg: "Password should not be empty / length be between " + mx + " to " + my
        };
    }
    return { result: true, msg: '' };
}

function allLetter(uname) {
    var letters = /^[A-Za-z]+$/;
    if (uname.match(letters)) {
        return { result: true, msg: '' };
    } else {
        return {
            result: false,
            msg: 'Username must have alphabet characters only'
        };
    }
}

function valid_adr(uadd) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (uadd.match(letters)) {
        return { result: true, msg: '' };
    } else {
        return {
            result: false,
            msg: 'User address must have alphabet characters only'
        };
    }
}

function skinSelect(uskin) {
    if (uskin == "Default") {
        return {
            result: false,
            msg: 'Select your skin type from the list'
        };
    } else {
        return { result: true, msg: '' };
    }
}

function allnumeric(uzip) {
    var numbers = /^[0-9]+$/;
    if (uzip.match(numbers)) {
        return { result: true, msg: '' };
    } else {
        return {
            result: false,
            msg: 'ZIP code must have Number characters only'
        };
    }
}

function ValidateEmail(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.match(mailformat)) {
        return { result: true, msg: '' };
    } else {
        return {
            result: false,
            msg: "You have entered an invalid email address!"
        };
    }
}

function validsex(sex) {
    if (sex != undefined) {
        return { result: true, msg: '' };
    }
    return {
        result: false,
        msg: 'Please choose a sex'
    }
}


function saveToDb(data) {
    let result;
    connection.query(`
    INSERT INTO user (
        name,
        email_address,
        password,
        address,
        phone_number,
        zip_code,
        has_allergy,
        has_medical_approval,
        gender,
        skin_type,
        about)
        VALUES
        (
        '${data.username}',
        '${data.email}',
        '${data.passid}',
        '${data.address}',
        '${data.phone}',
        '${data.zip}',
        ${(data.en != undefined) ? 1 : 0},
        ${(data.nonen != undefined) ? 1 : 0},
        '${data.gender}',
        '${data.TypeSkin}',
        '${data.desc}');
    `, function (err, result) {
        if (err) {
            return (err)
            result = false;
        }
        result = true;
    });
    return result;
}

function formValidation() {
    var inputnum = document.registration.phone.value;
    var passid = document.registration.passid.value;
    var uname = document.registration.username.value;
    var uadd = document.registration.address.value;
    var uskin = document.registration.TypeSkin.value;
    var uzip = document.registration.zip.value;
    var uemail = document.registration.email.value;
    var sex = document.registration.gender.value;

    const phone_validation1 = phone_validation(inputnum);
    const passid_validation1 = passid_validation(passid, 7, 12);
    const allLetter_validation = allLetter(uname);
    const valid_adr_validation = valid_adr(uadd);
    const skinSelect_validation = skinSelect(uskin);
    const allnumeric_validation = allnumeric(uzip);
    const ValidateEmail_validation = ValidateEmail(uemail);
    const validsex_validation = validsex(sex);

    let errors = "";

    if (!phone_validation1.result) {
        errors += phone_validation1.msg + "<br/>";
    }

    if (!passid_validation1.result) {
        errors += passid_validation1.msg + "<br/>";
    }

    if (!allLetter_validation.result) {
        errors += allLetter_validation.msg + "<br/>";
    }

    if (!valid_adr_validation.result) {
        errors += valid_adr_validation.msg + "<br/>";
    }

    if (!skinSelect_validation.result) {
        errors += skinSelect_validation.msg + "<br/>";
    }

    if (!allnumeric_validation.result) {
        errors += allnumeric_validation.msg + "<br/>";
    }

    if (!ValidateEmail_validation.result) {
        errors += ValidateEmail_validation.msg + "<br/>";
    }

    if (!validsex_validation.result) {
        errors += validsex_validation.msg + "<br/>";
    }

    console.log(errors)
    return errors;

}


function onPageLoad() {
    console.log(document.referrer)
    const greet = document.getElementById("userGreet");
    const indexOfEqauls = document.location.href.indexOf('=')
    if (indexOfEqauls !== -1) {
        const user = document.location.href.substring(indexOfEqauls + 1);
        loggedIn = user;
        greet.innerHTML = `Welcome, ${user} `
    }
}