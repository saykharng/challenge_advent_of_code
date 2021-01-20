import csv

def find_two_numbers_that_sum_to_expected_total(list_of_numbers, expected_total):
    list_of_solution = []
    for index, value in enumerate(list_of_numbers):
        for index2, value2 in enumerate(list_of_numbers):
            if index != index2:
                if expected_total == value + value2:
                    list_of_solution.append((value, value2))
    return list_of_solution

def print_result(list_of_solution):
    if list_of_solution:
        value, value2 = list_of_solution[0]
        print(f'The values that sum to 2020 are {value} and {value2}. And the correct answer is {value * value2}.')
    else:
        print('Unable to find solution.')

def create_list_from_file(filename):
    list_of_numbers = []
    with open(filename) as file_with_numbers:
        for item in file_with_numbers:
            try:
                value = int(item)
            except:
                #ignoring anything that is not an integer.
                pass

            list_of_numbers.append(value)

    return list_of_numbers

if __name__ == '__main__':
    FILENAME = 'numbers.txt'
    EXPECTED_TOTAL = 2020
    
    list_of_numbers = create_list_from_file(FILENAME)
    result_list = find_two_numbers_that_sum_to_expected_total(list_of_numbers, EXPECTED_TOTAL)
    print_result(result_list)
    
