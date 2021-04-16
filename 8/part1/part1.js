var fs = require('fs');

function read_file(filename){
  file_data = fs.readFileSync(filename, 'utf8');
  const file_by_line = file_data.split(/\n/);
  return file_by_line;
}

class Instruction {
    constructor(line_number, instruction, i_argument) {
      this.line_number = line_number;
      this.to_execute = instruction;
      this.argument = i_argument;
      this.is_executed = false;
    }

    executed(){
      this.is_executed = true;
    }
};

function processor(instruction, global_accumulator){
  /*
  Executes a given instruction using the instruction object.
  Returns the new state of global accumulator and next number of steps to take
  */
  var result = []
  if(instruction.to_execute=='nop'){
    result = [...result, global_accumulator, 1]
  }else if(instruction.to_execute=='acc'){
    var new_value_of_global_accumulator = global_accumulator + instruction.argument;
    result = [...result, new_value_of_global_accumulator, 1]
  }else if(instruction.to_execute='jump'){
    result = [...result, global_accumulator, instruction.argument]
  }
  return result;
}

function create_instrction_from_line(line, line_number){
  /* Instatiate an instruction object using the line given from input file */
  var lines_splited = line.split(' ')
  return new Instruction(line_number, lines_splited[0], parseInt(lines_splited[1]))
}

function create_objects_of_instruction(list_of_lines){
  /* 
  Iterate through the lines from input file to create an instruction object.
  All instrction are stored in instruction object.  
  */
  object_of_instructions = {};
  for (let line_number = 0; line_number < list_of_lines.length; line_number++) {
    
    const element = list_of_lines[line_number];
    console.log(element);
    instruction = create_instrction_from_line(element, line_number);
    object_of_instructions[line_number]=instruction;
  }
  return object_of_instructions;
}

function execute_each_instruction(object_of_instructions, line_to_execute=0){
  /*
  Iterate through all the instruction objects create to execute the 
  instruction using 'processor' function.
  */
  var instruction = object_of_instructions[line_to_execute];
  var global_accumulator = 0;
  while(!instruction.is_executed){
    debugger;
    var [current_global_accumulator, steps_to_take] = processor(instruction, global_accumulator);
    instruction.executed();
    global_accumulator = current_global_accumulator;
    instruction = object_of_instructions[line_to_execute+steps_to_take];
    line_to_execute+=steps_to_take
  }
  return global_accumulator;
}

const filename = 'input8.txt';
list_of_lines = read_file(filename);

object_of_instructions = create_objects_of_instruction(list_of_lines);

current_global_accumulator = execute_each_instruction(object_of_instructions);

console.log(`Last global accumulator is ${current_global_accumulator}`);



