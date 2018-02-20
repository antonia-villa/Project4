
// Retrieve Minimum Value from a data set
function getMin(data) {
  return data.reduce((min, p) => p.value < min ? p.value : min, data[0].value);
}

// Retrieve Maximum Value from a data set
function getMax(data) {
  return data.reduce((max, p) => p.value > max ? p.value : max, data[0].value);
}