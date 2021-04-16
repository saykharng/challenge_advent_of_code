var fs = require('fs');

/* 
Bag class allows a bag to reference the bags it can carry.
Bag class has method that checks whether it can carry a given bag by
checking the bag it's current carrying and call the same method on it's children.
That causes a chain reaction to deep dive into childrens children and so on.
*/

class Bag {
    constructor(name) {
      this.name = name;
      this.bags_to_carry = {};
    }
    
    add_bag(bag_object, name, number_of_bag){
        this.bags_to_carry[name]={[name]:bag_object, number_of_bag}
    };
    
    total_num_of_bags_can_carry(num_carring=1){
      debugger;
      var total_num_of_bags = 0;
      var child_bag_names = Object.keys(this.bags_to_carry);
      for (let index = 0; index < child_bag_names.length; index++) {
        const bag_name = child_bag_names[index];
        var num_of_bags = this.bags_to_carry[bag_name].number_of_bag;
        var bag = this.bags_to_carry[bag_name][bag_name];
        console.log(bag.name)
        total_num_of_bags += (num_carring*num_of_bags);
        total_num_of_bags += bag.total_num_of_bags_can_carry(num_of_bags*num_carring);
      }
      return total_num_of_bags;
    }

    can_carry(name){
      if(this.bags_to_carry[name]){
        if(this.bags_to_carry[name]['number_of_bag']){
          return true;
        }
      }
      
      var child_bag_names = Object.keys(this.bags_to_carry);
      var num_of_bag_can_carry = 0;
      for (let index = 0; index < child_bag_names.length; index++) {
          const bag_name = child_bag_names[index];
          var bag = this.bags_to_carry[bag_name][bag_name];
          if(bag.can_carry(name)){
            num_of_bag_can_carry+=1;
          };
      }
      return num_of_bag_can_carry
  };
}

function read_file(filename){
  file_data = fs.readFileSync(filename, 'utf8');
  const file_by_line = file_data.split(/\n/);
  return file_by_line;
}

const filename = 'input.txt'
list_of_lines = read_file(filename)

function convert_line_into_bag(line, all_bags){
  /* This function converts line from the input file into a bag object.
  all_bag variable contains all bag object that are ever instantiated during the creation.
  While instantiating the bag, function also check if the object already exists in all_bags varible.
  If it does function uses the same object to create a mapping of bag and the bags it can carry.  
  */
  var array_of_line = line.split(' ');
  var bag_name = array_of_line[0]+ " " + array_of_line[1]
  if(array_of_line[4].trim() == 'no'){
    var only_bag = all_bags[bag_name]
    if(!only_bag){
      var only_bag = new Bag(bag_name);
    }
    all_bags[only_bag.name]=only_bag
    return [only_bag, all_bags];
  }else{
    var new_bag = all_bags[bag_name]
    if(!new_bag){
      var new_bag = new Bag(bag_name);
      all_bags[new_bag.name]=new_bag
    }
    array_of_bags_can_carry = line.split('contain')[1].split(',')
    for (let index = 0; index < array_of_bags_can_carry.length; index++) {
      const element = array_of_bags_can_carry[index];
      var num_of_bag = parseInt(element.trim().split(' ')[0])
      var carry_bag_name = element.trim().split(' ')[1] + " "+ element.trim().split(' ')[2]
      
      var child_bag = all_bags[carry_bag_name]
      if(!child_bag){
        var child_bag = new Bag(carry_bag_name);
        all_bags[child_bag.name]=child_bag
      }
      new_bag.add_bag(child_bag, carry_bag_name, num_of_bag);    
    }
      
  } 
  return [new_bag, all_bags]
}

function create_an_object_of_bag(list_of_lines){
  /*Function iterates through all the lines to create bag object
  and keep reference in object_of_bags object for the outermost bags.
  and keeps each bag directly in all_bags objects as well.
  */
  var object_of_bags = {};
  var all_bags = {};
  for (let index = 0; index < list_of_lines.length; index++) {
    const line = list_of_lines[index];
    var new_bag_and_all_bags=convert_line_into_bag(line, all_bags);
    new_bag=all_bags = new_bag_and_all_bags[0];
    all_bags = new_bag_and_all_bags[1];
    var name_of_bag = new_bag.name;
    object_of_bags[name_of_bag] =new_bag;
  }
  // console.log(`%j`, object_of_bags);
  return object_of_bags;
}

function find_number_bags_that_can_contain(bag_name, object_of_bags, num_of_bag=1){
  var number_of_bag_that_can_contain = 0;
  var count = 0;
  for (const [current_bag_name, bag] of Object.entries(object_of_bags) ){
    if(bag.name == bag_name)
      return bag.total_num_of_bags_can_carry();
  }
}

var list_of_bag = create_an_object_of_bag(list_of_lines);

number_of_bag_that_can_contain = find_number_bags_that_can_contain('shiny gold', list_of_bag);

console.log(`answer is ${number_of_bag_that_can_contain}`)