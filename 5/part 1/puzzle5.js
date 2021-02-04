var fs = require('fs');

filename = 'puzzle5.txt';

function read_file(filename){
	file_data = fs.readFileSync(filename, 'utf8');
	const file_by_line = file_data.split(/\r?\n/);
	return file_by_line;
}

list_of_lines = read_file(filename);


var highest_seat_id = 0;


function calculate_row_or_col_number(info, upper_char, lower_char, first_row_number, second_row_number, index_of_current_charecter=0){
    var current_charecter = info[index_of_current_charecter]
    console.log(`Info ${info}`)
    console.log(`Current char: ${current_charecter} index of c c: ${index_of_current_charecter}`)
    console.log(first_row_number, second_row_number);
    
    if(Math.abs(second_row_number - first_row_number) == 1){
        if(current_charecter===upper_char){
            return first_row_number;
        }
        if(current_charecter === lower_char){
            return second_row_number;
        }
    }
    
    index_of_current_charecter += 1;
    var difference = (second_row_number - first_row_number) / 2;
    if(current_charecter === lower_char){
        first_row_number = Math.ceil(first_row_number + difference);
        return calculate_row_or_col_number(info, upper_char, lower_char, first_row_number, second_row_number, index_of_current_charecter)
    }else{
        second_row_number = Math.floor(second_row_number-difference);
        return calculate_row_or_col_number(info, upper_char, lower_char, first_row_number, second_row_number, index_of_current_charecter)
    }
}

function process_boarding_pass(line){
    var row_info = line.slice(0, 7);
    var column_info = line.slice(7, 10);
    var row_number = calculate_row_or_col_number(row_info, 'F', 'B', 0, 127);
    var col_number = calculate_row_or_col_number(column_info, 'L', 'R', 0, 7);
    var numbers = {row_number, col_number}
    return numbers;
}

for (let row_index = 0; row_index < list_of_lines.length; row_index++) {
    const line = list_of_lines[row_index];
    const { row_number, col_number } = process_boarding_pass(line);
    seat_id = row_number * 8 + col_number;
    if(seat_id > highest_seat_id){
        highest_seat_id = seat_id;
    }
}

console.log(`The highest seat ID on a boarding pass is ${highest_seat_id}.`)