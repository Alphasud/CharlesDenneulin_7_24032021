function normalizeData(string) {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export { normalizeData as default };
