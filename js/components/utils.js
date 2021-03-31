function normalizeData(string) {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function removeDuplicate(array) {
  const duplicateItems = [];
  const noDuplicate = array.filter((element) => {
    if (element in duplicateItems) {
      return false;
    }
    duplicateItems[element] = true;
    return true;
  });
  return noDuplicate;
}

function passData(x) {
  return x;
}

function dropDown() {}

export { normalizeData, removeDuplicate, passData, dropDown };
