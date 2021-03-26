function dropDown() {
  const customSelect = document.querySelector('.custom-select');
  const customOption = document.querySelectorAll('.custom-option');

  customSelect.addEventListener('click', () => {
    console.log('YES');
    customSelect.classList.toggle('open');
  });

  for (const option of customOption) {
    option.addEventListener('click', () => {
      if (!option.classList.contains('selected')) {
        // Target items of customOption that don't contain 'selected'
        option.parentNode
          .querySelector('.custom-option.selected')
          .classList.remove('selected'); // Find the 'selected' class and remove it making the element visible
        option.classList.add('selected'); // Add the selected class to the clicked item thus making it display:none
        option
          .closest('.custom-select')
          .querySelector('.custom-select__trigger span').textContent =
          option.textContent;
        // Pass the content of the clicked item to custom-select__trigger span
      }
    });
  }

  /// /CLOSE DROPDOWN WHEN USER CLICKS ANYWHERE
  const select = document.querySelector('.custom-select');
  // Avoid getting an error when the 'select' element become null
  window.addEventListener('click', (event) => {
    if (!select.contains(event.target)) {
      // If the node does not contain .custom-select (meaning the class is currently .custom-select-open)
      select.classList.remove('open'); // then 'open' is removed.
    }
  });
}

dropDown();

export { dropDown as default };
