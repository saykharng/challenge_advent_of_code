var fs = require('fs');

filename = 'pp.txt';

function read_file(filename){
	file_data = fs.readFileSync(filename, 'utf8');
	const file_by_line = file_data.split(/\r?\n/);
	return file_by_line;
}

function check_password(min_num, max_num, letter_repeated_in_password){
	if(letter_repeated_in_password >= min_num && letter_repeated_in_password <= max_num){
		return true;
	}
}

data = read_file(filename);

var num_of_valid_password = 0;
data.forEach((line) => {
	var min_num, max_num, letter, password;
	index_of_colon = line.indexOf(':')
	min_num = parseInt(line.slice(0, index_of_colon-1).trim().split('-')[0])
	max_num = parseInt(line.slice(0, index_of_colon-1).trim().split('-')[1])
	letter = line[index_of_colon-1].trim()
	password = line.slice(index_of_colon+2, line.length);
	letter_repeated_in_password = password.split(letter).length-1;
	is_valid = check_password(min_num, max_num, letter_repeated_in_password);
	if(is_valid){	
		num_of_valid_password = num_of_valid_password+1
	}
});

console.log(`There are ${num_of_valid_password} in the given data`);
