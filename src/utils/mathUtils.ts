// Math utility functions for the calculator

// Define mathematical constants
const constants = {
  pi: Math.PI,
  e: Math.E,
};

// Mathematical functions that will be available in expressions
const mathFunctions = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sqrt: Math.sqrt,
  log: Math.log10,
  ln: Math.log,
  abs: Math.abs,
  round: Math.round,
  floor: Math.floor,
  ceil: Math.ceil,
  pow: Math.pow,
};

// Tokenize the input string into tokens (numbers, operators, functions, etc.)
const tokenize = (input: string): string[] => {
  // Replace constants with their values
  let processedInput = input;
  Object.entries(constants).forEach(([name, value]) => {
    processedInput = processedInput.replace(new RegExp(name, 'g'), value.toString());
  });
  
  // Define a regex pattern to match numbers, operators, functions, and parentheses
  const pattern = /(\d*\.?\d+)|([+\-*\/()%])|([a-zA-Z]+)/g;
  return processedInput.match(pattern) || [];
};

// Parse and evaluate the expression
export const evaluate = (expression: string): number => {
  try {
    // Simple approach: using Function constructor (with security considerations)
    // This is for demonstration only - in a production app, use a proper math expression parser
    const sanitizedExpression = sanitizeExpression(expression);
    
    // Create a function context with math functions
    const functionContext = Object.entries(mathFunctions).reduce((context, [name, func]) => {
      return `${context} const ${name} = mathFunctions.${name};`;
    }, '');
    
    // Create a safe evaluation function
    const evalFunction = new Function(
      'mathFunctions', 
      `
        "use strict";
        ${functionContext}
        return ${sanitizedExpression};
      `
    );
    
    // Execute the function with our math functions as context
    return evalFunction(mathFunctions);
  } catch (error) {
    console.error('Error evaluating expression:', error);
    throw new Error('Invalid expression');
  }
};

// Sanitize the expression to prevent code injection
const sanitizeExpression = (expression: string): string => {
  // Only allow safe characters: numbers, basic operators, parentheses, and known function names
  const safeExpression = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    
    // Remove any characters that aren't allowed
    .replace(/[^0-9+\-*\/().%,a-zA-Z]/g, '');
  
  // Validate that only known functions are used
  const functionCalls = safeExpression.match(/[a-zA-Z]+\(/g) || [];
  functionCalls.forEach(funcCall => {
    const funcName = funcCall.substring(0, funcCall.length - 1);
    if (!(funcName in mathFunctions) && !(funcName in constants)) {
      throw new Error(`Unknown function: ${funcName}`);
    }
  });
  
  return safeExpression;
};

// Function to format the result for display
export const formatResult = (result: number): string => {
  // Handle special cases
  if (isNaN(result)) return 'Error';
  if (!isFinite(result)) return result > 0 ? 'Infinity' : '-Infinity';
  
  // Format number to avoid excessive decimal places
  if (Number.isInteger(result)) {
    return result.toString();
  } else {
    // Show up to 10 significant digits
    return result.toPrecision(10).replace(/\.?0+$/, '');
  }
};

// Function to check if an expression is valid before evaluation
export const isValidExpression = (expression: string): boolean => {
  try {
    // Check for balanced parentheses
    let parenthesesCount = 0;
    for (const char of expression) {
      if (char === '(') parenthesesCount++;
      if (char === ')') parenthesesCount--;
      if (parenthesesCount < 0) return false; // Unbalanced closing parenthesis
    }
    if (parenthesesCount !== 0) return false; // Unbalanced opening parenthesis
    
    // Try to tokenize the expression
    const tokens = tokenize(expression);
    return tokens.length > 0;
  } catch (error) {
    return false;
  }
};