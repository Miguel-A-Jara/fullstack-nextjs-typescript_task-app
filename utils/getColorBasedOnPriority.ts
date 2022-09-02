const getColorBasedOnPriority = ( priority: number ) => {
  switch (priority) {
    case 1:
      return 'one  ';
    case 2:
      return 'two  ';
    case 3:
      return 'three';
    case 4:
      return 'four ';
    case 5:
      return 'five ';
  }
}

export default getColorBasedOnPriority;