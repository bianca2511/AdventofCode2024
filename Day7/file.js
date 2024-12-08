unction canFormTarget(target, numbers, index, currentValue) {
    if (index === numbers.length) {
      return currentValue === target;
    }
  
    const nextNumber = numbers[index];
  
    // Try concatenation
    const concatValue = parseInt('' + currentValue + nextNumber, 10);
    if (canFormTarget(target, numbers, index + 1, concatValue)) {
      return true;
    }
  
    // Try addition
    if (canFormTarget(target, numbers, index + 1, currentValue + nextNumber)) {
      return true;
    }
  
    // Try multiplication
    if (canFormTarget(target, numbers, index + 1, currentValue * nextNumber)) {
      return true;
    }
  
    return false;
  }