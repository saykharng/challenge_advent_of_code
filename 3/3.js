var fs = require('fs');

filename = 'input.txt';

function read_file(filename){
	file_data = fs.readFileSync(filename, 'utf8');
	const file_by_line = file_data.split(/\r?\n/);
	return file_by_line;
}

list_of_lines = read_file(filename);

var row_index = 0;
var column_index = 0;
var tree_counter = 0;

var colum_length = list_of_lines[0].length;

while(row_index < list_of_lines.length-1){
	var steps = 0;
    column_index += 3;
    row_index += 1;
    if(column_index > colum_length-1){
        column_index = column_index - colum_length
    }
    if(list_of_lines[row_index][column_index]=='#'){
        tree_counter += 1;
    }
}

console.log(`In this example, traversing the map using this slope would cause you to encounter ${tree_counter} trees.`);