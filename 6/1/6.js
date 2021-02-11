var fs = require('fs');

var filename = 'input.txt';

function read_file(filename){
	file_data = fs.readFileSync(filename, 'utf8');
	const file_by_line = file_data.replace(/\r\n/g, " ").trim().split('  ');
	return file_by_line;
}

list_of_group = read_file(filename);

var sum_of_all_question = 0;

for (let index = 0; index < list_of_group.length; index++) {
    var group = list_of_group[index];
    group = group.replace(' ', '');
    set_of_group = new Set()
    for (let letter_index = 0; letter_index < group.length; letter_index++) {
        const letter = group[letter_index];
        if(letter !== ' '){
            set_of_group.add(letter);
        }           
    }
    sum_of_all_question += set_of_group.size;
}

console.log(`Sum is ${sum_of_all_question}`);