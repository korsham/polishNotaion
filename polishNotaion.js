function convertToReversePolishNotation(expression) {
    let result = new Array();
    let stack = new Array();
	
    let operatorsPriorities = [ '+', '-', '*', '/', '^' ];
    operatorsPriorities[0] = 0;
    operatorsPriorities[1] = 0;
    operatorsPriorities[2] = 1;
    operatorsPriorities[3] = 1;
    operatorsPriorities[4] = 2;

    for (let i = 0; i < expression.length; i++) {
		switch (true) {
			case Number.isInteger(expression[i]) : 
			{
				result.push(expression[i]);
				continue;
			}

			case expression[i] == '(' : 
			{
				stack.push('(');
				continue;
			}

			case expression[i] == ')' : 
			{ 
				while (stack[stack.length - 1] != '(')
					result.push(stack.pop());
				stack.pop();
				continue;
			}

			case operatorsPriorities[expression[i]] == 2 : 
			{ 
				stack.push('^');
				continue;
			}
		}

        while (operatorsPriorities[stack[stack.length - 1]] >= operatorsPriorities[expression[i]]
				&& stack.length > 0)
		{
            result.push(stack.pop());
		}
        stack.push(expression[i]);
    }

    while (stack.length > 0) 
	{
        result.push(stack.pop());
	}

    return result;
}

function main() {
    // тестики для отладки
    let tests = new Array(
        [], // => empty
        [1, "+", 2], // => 1 2 +
        [1, "*", 3], // => 1 3 *
        [2, "+", "(", 3, "*", 4, ")"], // => 2 3 4 * +
        ["(", 2, "+", 3, ")", "*", 4], // => 2 3 + 4 *
        [3, "+", 4, "*", 2, "/", "(", 1, "-", 5, ")", "^", 2], // => 3 4 2 * 1 5 - 2 ^ / +
        ["(", 1, "+", 2, ")", "*", 4, "+", 3] // => 1 2 + 4 * 3 +
    );

    tests.forEach((element) => {
        console.log(`Infix: ${element.join(' ')} => RPN: ${convertToReversePolishNotation(element).join(' ')}`);
    }); 
}


main()