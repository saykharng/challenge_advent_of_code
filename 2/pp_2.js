var fs = require('fs');

filename = 'pp.txt';

function read_file(filename){
	file_data = fs.readFileSync(filename, 'utf8');
	const file_by_line = file_data.split(/\r?\n/);
	return file_by_line;
}

function check_password(first_letter, second_letter, letter){
	if(first_letter === letter && second_letter !== letter){
		return true;
	}
	if(first_letter !== letter && second_letter === letter){
		return true;
	}
}

data = read_file(filename);

var num_of_valid_password = 0;
data.forEach((line) => {
	var first_pos, second_pos, letter, password;
	index_of_colon = line.indexOf(':')
	first_pos = parseInt(line.slice(0, index_of_colon-1).trim().split('-')[0])
	second_pos = parseInt(line.slice(0, index_of_colon-1).trim().split('-')[1])
	letter = line[index_of_colon-1].trim()
	password = line.slice(index_of_colon+2, line.length);
	first_letter = password[first_pos-1];
	second_letter = password[second_pos-1];
	is_valid = check_password(first_letter, second_letter, letter);
	if(is_valid){	
		num_of_valid_password = num_of_valid_password+1
	}
});

console.log(`There are ${num_of_valid_password} in the given data`);
