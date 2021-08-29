/*
*
* float32Convert.js by Dan Floyd (Floydman). Convert between 32-bit floats and
* decimal numbers. Based on example code created by Eric
* (https://stackoverflow.com/a/10564792/9029177).
*
* Usage: float32Convert(inputNumber, toFloat, otherBase)
* : "inputNumber" is the number you want to convert. This can be in any base and
* : MUST be formatted as a String if it is not in Base 10. (MANDATORY)
* : "toFloat" indicates which way to want to convert. "True" returns a String in
* : Base otherBase; "false" returns a decimal number. (MANDATORY)
* : "otherBase" is the non-decimal base you are converting to/from. This is
* : probably 2 (binary) or 16 (hexadecimal), though it can be an integer from
* : 2 - 36. (MANDATORY)
*
*/

function float32Convert (inputNumber, toFloat, otherBase) {
  if (toFloat == true) {
    var buffer = new ArrayBuffer(4);
    var intView = new Int32Array(buffer);
    var floatView = new Float32Array(buffer);
    floatView[0] = Math.abs(Number(inputNumber));
    var convertedNumber = intView[0].toString(otherBase);
    var finalNumber = (inputNumber >= 0) ? '0' + convertedNumber:'1' + convertedNumber;
    return finalNumber;
  } else if (toFloat == false) {
    var buffer = new ArrayBuffer(4);
    var intView = new Int32Array(buffer);
    var floatView = new Float32Array(buffer);
    intView[0] = parseInt(inputNumber,otherBase);
    return floatView[0];
  }
}
