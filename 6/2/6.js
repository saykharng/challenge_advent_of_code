var fs = require('fs');

var filename = 'input.txt';

function read_file(filename){
	file_data = fs.readFileSync(filename, 'utf8');
	const file_by_line = file_data.split(/\n\s*\n/);
	return file_by_line;
}

list_of_group = read_file(filename);

var sum_of_all_question = 0;

for (let index = 0; index < list_of_group.length; index++) {
    var group_array = list_of_group[index].replace(' ', '').replace(/\r/g, '').split('\n');
    set_of_group = new Set();    
    
    if(group_array.length==1){
        sum_of_all_question += group_array[0].length;
    }else{
        var initial_array = Array.from(group_array[0]);
        var intersection = undefined;
        for (let line_index = 1; line_index < group_array.length; line_index++) {
            var line = group_array[line_index];
            line = Array.from(line);
            if(intersection==undefined){
                intersection = initial_array.filter(x => line.includes(x));
            }else{
                intersection = intersection.filter(x => line.includes(x));
            }
            }        
            sum_of_all_question += intersection.length;
        }
}

console.log(`Sum is ${sum_of_all_question}`);