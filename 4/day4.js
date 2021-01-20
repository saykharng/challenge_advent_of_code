var fs = require('fs');

filename = 'pass1.txt';

function read_file(filename){
	file_data = fs.readFileSync(filename, 'utf8');
	const file_by_line = file_data.split("\n\r");
	return file_by_line;
}

list_of_passports = read_file(filename);

function validate_byr(value){
    if(value.toString().length !== 4){
        return false;
    }
    var byr_min = 1920;
    var byr_max = 2002;
    if(value >= byr_min && value <= byr_max){
        return true;
    }
    return false;
}

function validate_eyr(value){
    if(value.toString().length !== 4){
        return false;
    }
    var byr_min = 2020;
    var byr_max = 2030;
    if(value >= byr_min && value <= byr_max){
        return true;
    }
    return false;
}

function validate_iyr(value){
    if(value.toString().length !== 4){
        return false;
    }
    var byr_min = 2010;
    var byr_max = 2020;
    if(value >= byr_min && value <= byr_max){
        return true;
    }
    return false;
}

function validate_hgt(value){
    var valid_trailing_text = ['cm','in']
    trailing_text = value.slice(-2).toLowerCase();
    if(trailing_text === valid_trailing_text[0] || trailing_text === valid_trailing_text[1]){
        if(trailing_text===valid_trailing_text[0]){
            var min_cm = 150;
            var max_cm =  193;
            var hgt_value = value.replace(valid_trailing_text[0], '')
            try{
                hgt_value = parseInt(hgt_value);
                if(hgt_value >= min_cm && hgt_value <= max_cm){
                    return true;
                }
            }catch(err){
                return false;
            }
        }else if(trailing_text===valid_trailing_text[1]){
            var min_in = 59;
            var max_in = 76;
            var hgt_value = value.replace(valid_trailing_text[1], '')
            try{
                hgt_value = parseInt(hgt_value);
                if(hgt_value >= min_in && hgt_value <= max_in){
                    return true;
                }
            }catch(err){
                return false;
            }
        }
        
        
    }
}

function validate_hcl(value){
    if(value[0] !== "#"){
        return false;
    }
    letters = ['a', 'b', 'c', 'd', 'e', 'f']
    stripped_value = value.replace('#', '');

    if(stripped_value.length !== 6){
        return false;
    }

    for (let index = 0; index < stripped_value.length; index++) {
        const char_in_value = stripped_value[index];
        if(letters.includes(char_in_value.toLowerCase()) === false){
            try{
                parseInt(char_in_value)
            }catch(err){
                return false;
            }
        }
    }
    return true;
}

function validate_ecl(value){
    valid_colour = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    if(valid_colour.includes(value.toLowerCase())){
        return true;
    }
    return false;
}

function validate_pid(value){
    if(value.length !==9){
        return false;
    }
    stripped_value = value.slice(1, value.length-1);
    try{
        parseInt(stripped_value);
    }catch(err){
        return false;
    }
    return true;
}

function validate_required_field(passport, list_of_fields_to_check){
    var passport = passport.replace(/\n/g, ' ');

    var num_valid_fields = 0;

    for (let field_index = 0; field_index < list_of_fields_to_check.length; field_index++) {
        var field = list_of_fields_to_check[field_index];
        if(passport.includes(field)){
            num_valid_fields += 1;
        }
        
    }
    if (num_valid_fields === list_of_fields_to_check.length){
        return true;
    }
    return false;
}

function validate_field_values(passport, fields_validator){
    passport_by_field = passport.split(' ')
    num_of_valid_fields = 0;
    for (let field_index = 0; field_index < passport_by_field.length; field_index++) {
        const field_and_value = passport_by_field[field_index];
        var field = field_and_value.split(':')[0].trim();
        var value = field_and_value.split(':')[1].trim();
        if(field !== 'cid'){
            validator = fields_validator[field];
            if(validator(value)){
                num_of_valid_fields += 1;
            }
        }        
        
    }
    if(num_of_valid_fields === Object.keys(fields_validator).length){
        return true;
    }    
}

function validate_passport(list_of_passports){
    list_of_fields_to_check = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:']
    fields_validator ={
        'byr': validate_byr,
        'iyr': validate_iyr,
        'eyr': validate_eyr,
        'hgt': validate_hgt,
        'hcl': validate_hcl,
        'ecl': validate_ecl,
        'pid': validate_pid,
    }

    var num_of_valid_passport = 0;

    for (let pp_index = 0; pp_index < list_of_passports.length; pp_index++) {
        const passport = list_of_passports[pp_index];
        if(validate_required_field(passport, list_of_fields_to_check)){
            passport.replace(/\n/g, ' ');
            if(validate_field_values(passport, fields_validator)){
                num_of_valid_passport += 1;
            };
        }
    }
    return num_of_valid_passport;
}

num_of_valid_passport = validate_passport(list_of_passports);


console.log(`There are ${num_of_valid_passport} valid passwords in given input.`);