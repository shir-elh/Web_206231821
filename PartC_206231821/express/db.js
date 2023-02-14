const mysql = require("mysql2");
const dbConfig = require("./db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: ''
});

// Open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

function useDB() {
    connection.query('USE `linda_nails`', function (err, result) {
        if (err) {
            return false;
        }
        return true;
    })
}

function createDB(fail, succsess, res) {
    connection.query('CREATE SCHEMA `linda_nails`', function (err, result) {
        if (err) {
            console.log(err)
            fail(res);
        }
        useDB();
        succsess(res);
    })
}

function createGender(fail, succsess, res) {
    connection.query(`SHOW TABLES LIKE 'gender'`, function (err, result) {
        if (err) {
            console.log(err)
            fail(res);
        }
        if (result.length === 0) {
            connection.query('CREATE TABLE `gender` ( \
            `name` varchar(45) NOT NULL, \
            PRIMARY KEY (`name`) \
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;', function (err, result) {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                succsess(res);
            })
        } else {
            succsess(res);
        }
    })
}

function insertGender(fail, succsess, res) {
    connection.query('INSERT INTO `gender` (`name`) \
    VALUES \
    ("MALE"), \
    ("FEMALE")', function (err, result) {
        if (err) {
            console.log(err)
            fail(res);
        }
        succsess(res);
    })
}

function createSkinType(fail, succsess, res) {
    connection.query(`SHOW TABLES LIKE 'skin_type'`, function (err, result) {
        if (err) {
            console.log(err)
            fail(res);
        }
        if (result.length === 0) {
            connection.query('CREATE TABLE `skin_type` ( \
            `name` varchar(45) NOT NULL, \
            PRIMARY KEY (`name`) \
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;', function (err, result) {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                succsess(res);
            })
        } else {
            succsess(res);
        }
    })
}

function insertSkinType(fail, succsess, res) {
    connection.query('INSERT INTO `skin_type` (`name`) \
    VALUES \
    ("Oil"), \
    ("Normal"),\
    ("Dry"), \
    ("Sensitive"), \
    ("Combination")', function (err, result) {
        if (err) {
            console.log(err)
            fail(res);
        }
        succsess(res);
    })
}

function createUser(fail, succsess, res) {
    connection.query(`SHOW TABLES LIKE 'user'`, function (err, result) {
        if (err) {
            console.log(err)
            fail(res);
        }
        if (result.length === 0) {
            connection.query('CREATE TABLE `user` ( \
                `user_id` int NOT NULL AUTO_INCREMENT, \
                `name` varchar(45) DEFAULT NULL, \
                `email_address` varchar(90) DEFAULT NULL, \
                `password` varchar(45) DEFAULT NULL, \
                `address` varchar(45) DEFAULT NULL, \
                `phone_number` varchar(45) DEFAULT NULL, \
                `zip_code` int DEFAULT NULL, \
                `has_allergy` tinyint DEFAULT NULL, \
                `has_medical_approval` tinyint DEFAULT NULL, \
                `gender` varchar(45) DEFAULT NULL, \
                `skin_type` varchar(45) DEFAULT NULL, \
                `about` varchar(100) DEFAULT NULL, \
                PRIMARY KEY (`user_id`), \
                UNIQUE KEY `email_address_UNIQUE` (`email_address`), \
                KEY `gender_fk_idx` (`gender`), \
                KEY `skin_type_fk_idx` (`skin_type`), \
                CONSTRAINT `gender_fk` FOREIGN KEY (`gender`) REFERENCES `gender` (`name`), \
                CONSTRAINT `skin_type_fk` FOREIGN KEY (`skin_type`) REFERENCES `skin_type` (`name`) \
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;', function (err, result) {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                succsess(res);
            })
        } else {
            succsess(res);
        }
    })
}


function insertUser(fail, succsess, res) {
    connection.query('INSERT INTO `linda_nails`.`user` \
    (`name`, \
    `email_address`, \
    `password`, \
    `address`, \
    `phone_number`, \
    `zip_code`, \
    `has_allergy`, \
    `has_medical_approval`, \
    `gender`, \
    `skin_type`, \
    `about`) \
    VALUES \
    ("Shir", "shir@gmail.com", "123", "Beer Sheva","0541234567", 1234, 1, 0, "Female", "Normal", "Hi"), \
    ("John", "john@hotmail.com", "456", "Tel Aviv","0501213321", 5678, 0, 1, "Male", "Oil", "Hello :)")', function (err, result) {
        if (err) {
            console.log(err)
            fail(res);
        }
        succsess(res);
    })
}

function selectGender(fail, res) {
    connection.query('SELECT * FROM `gender`', function(err, result) {
        if (err) {
            console.log(err);
            fail(res);
        }
        res.send(result)
    })
}

function selectSkinType(fail, res) {
    connection.query('SELECT * FROM `skin_type`', function(err, result) {
        if (err) {
            console.log(err);
            fail(res);
        }
        res.send(result)
    })
}

function selectUser(fail, res) {
    connection.query('SELECT * FROM `user`', function(err, result) {
        if (err) {
            console.log(err);
            fail(res);
        }
        res.send(result)
    })
}

function dropAll(fail, succsess, res) {
    connection.query('DROP DATABASE `linda_nails`', function(err, result) {
        if (err) {
            console.log(err);
            fail(res);
        }
        succsess(res);
    })
}


module.exports = {
    connection,
    useDB,
    createDB,
    createGender,
    createSkinType,
    createUser,
    insertGender,
    insertSkinType,
    insertUser,
    selectGender,
    selectSkinType,
    selectUser,
    dropAll
};