$(document).ready(function() {
  //stores inputs from user into an array
  var inputs = [''];
  //String to store current input string
  var totalString;
  //Validation array for normal arithmetic operators
  var operators1 = ['+', '-', '/', '*'];
  //Validation array for decimals
  var operators2 = ['.'];
  //numbers for validation
  var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  //counts decimals to prevent repition
  var decCount = 0;

  $('button').on('click', function() {
    if (this.id === 'ac') {
      inputs = [''];
      decCount = 0;
      update();
      $('#steps').html('0');
    } else if (this.id === 'ce') {
      inputs.pop();
      update();
    } else if (this.id === 'equals') {
      getTotal();
    } else {
      if (inputs[inputs.length - 1].indexOf('+', '-', '/', '*', '.') === -1) {
        getValue(this.id);
      } else {
        getValue(this.id);
      }
    }
  });

  function getValue(input) {
    if (
      operators2.includes(inputs[inputs.length - 1]) === true &&
      input === '.'
    ) {
      //checks if last & current input are a '.'
      alert("Duplicate '.' ");
    } else if (
      operators1.includes(inputs[inputs.length - 1]) === true &&
      operators1.includes(input)
    ) {
      //checks if last & current input are a +,-,/,*
      alert('Duplicate operator');
    } else if (inputs.length === 1 && operators1.includes(input) === true) {
      //stops user from starting with +,-,/,*
      $('#steps').html("You can't start with an operator!");
      return;
    } else if (inputs.length === 1 && operators1.includes(input) === false) {
      // pushes first input if not +,-,/,*
      if (operators2.includes(input)) {
        //if input in decimal,increments decimal count
        decCount++;
      }
      if (decCount <= 1) {
        inputs.push(input);
      }
    } else if (operators2.includes(input)) {
      //if input in decimal, pushes input and increments decimal count
      decCount++;
      if (decCount <= 1) {
        inputs.push(input);
      }
    } else if (
      operators1.includes(inputs[inputs.length - 1]) === false &&
      operators1.includes(input) === false
    ) {
      //if last value is not +,-,/,* and neither is current, push input
      inputs.push(input);
    } else if (
      operators1.includes(inputs[inputs.length - 1]) === false &&
      operators1.includes(input) === true
    ) {
      //if last value is not +,-,/,* but current is, push input
      inputs.push(input);
      decCount = 0;
    } else if (nums.includes(Number(input))) {
      //if value of input is in nums, push input
      inputs.push(input);
    }
    update();
  }
  function update() {
    if (decCount > 1) {
      alert("Duplicate '.' ");
      return;
    } else {
      totalString = inputs.join('');
      if (inputs.length === 0) {
        inputs = [''];
        $('#steps').html('0');
      } else {
        $('#steps').html(totalString);
      }
    }
    console.log(decCount);
  }
  function getTotal() {
    totalString = inputs.join('');
    var tot = eval(totalString);
    $('#steps').html(eval(tot));
    inputs = ['', tot.toString()];
  }
});
