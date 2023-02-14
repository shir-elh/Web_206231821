const db = require('./db');

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
    db.connection.query(`
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

function formValidation(data) {
    var inputnum = data.phone;
    var passid = data.passid;
    var uname = data.username;
    var uadd = data.address;
    var uskin = data.TypeSkin;
    var uzip = data.zip;
    var uemail = data.email;
    var sex = data.gender;


    const phone_validation1 = phone_validation(inputnum);
    const passid_validation1 = passid_validation(passid, 7, 12);
    const allLetter_validation = allLetter(uname);
    const valid_adr_validation = valid_adr(uadd);
    const skinSelect_validation = skinSelect(uskin);
    const allnumeric_validation = allnumeric(uzip);
    const ValidateEmail_validation = ValidateEmail(uemail);
    const validsex_validation = validsex(sex);

    if (!phone_validation1.result) {
        return phone_validation1;
    }

    if (!passid_validation1.result) {
        return passid_validation1;
    }

    if (!allLetter_validation.result) {
        return allLetter_validation;
    }

    if (!valid_adr_validation.result) {
        return valid_adr_validation;
    }

    if (!skinSelect_validation.result) {
        return skinSelect_validation;
    }

    if (!allnumeric_validation.result) {
        return allnumeric_validation;
    }

    if (!ValidateEmail_validation.result) {
        return ValidateEmail_validation;
    }

    if (!validsex_validation.result) {
        return validsex_validation;
    }

    return {
        result: true,
        msg: ''
    }

}

function checkLogin(data, succsess, fail) {
    db.useDB();
    db.connection.query(`
    SELECT * FROM user WHERE email_address = '${data.email}' AND password = '${data.password}'`,function (err, result) {
        if (err) {
            console.log(err)
            fail();
        }
        succsess(result)
    });
}

module.exports = {
    formValidation,
    saveToDb,
    checkLogin
}