const btnValues = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/',
  decimal: '.',
};

const initialState = {
  inputs: [],
  currentInput: '',
  update: function(newState) {
    for (const key in newState) {
      if (key !== 'update' && newState[key] !== undefined) {
        this[key] = newState[key];
      }
    }
    $('#steps').text(this.inputs.join('') + this.currentInput || '0');
  },
};

$(document).ready(function() {
  const state = { ...initialState };

  $('button').on('click', function() {
    const { currentInput, inputs } = state;

    switch (this.id) {
      case 'clear':
        return state.update({ ...initialState });
      case 'ce':
        if (currentInput) {
          return state.update({
            currentInput: currentInput
              .split('')
              .slice(0, currentInput.length - 1)
              .join(''),
          });
        }
      case 'equals':
        const answer = eval([...inputs, currentInput].join(''));
        return state.update({ inputs: [], currentInput: answer.toString() });
      default:
        return getValue(btnValues[this.id]);
    }
  });

  function getValue(inputValue) {
    const { inputs, currentInput } = state;
    if (currentInput == 0 && inputValue === 0) {
      return state.update({ currentInput: '0' });
    }

    const operatorsRegex = /\+|-|\*|\//;

    //if button clicked is an operator
    if (operatorsRegex.test(inputValue)) {
      //boolean check is last item in inputs array is an operator
      const lastIsOperator = operatorsRegex.test([...inputs].pop());

      if (!currentInput && !lastIsOperator) {
        return;
      } else if (!currentInput && lastIsOperator) {
        //switches operator if 2 are clicked in a row
        state.update({
          inputs: [...inputs.slice(0, inputs.length - 1), inputValue],
        });
      } else {
        return state.update({
          inputs: [...inputs, !!currentInput ? currentInput : '', inputValue],
          currentInput: '',
        });
      }
    }

    const newString = currentInput + inputValue;
    //ensures only one decimal in expressions
    if (/^\d*\.?\d*$/.test(newString)) {
      return state.update({ currentInput: newString });
    }
  }
});
