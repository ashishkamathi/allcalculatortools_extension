document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: "getCalculators" }, (calculators) => {
    const calculatorList = document.getElementById('calculator-list');
    const searchInput = document.getElementById('search-input');

    function displayCalculators(filteredCalculators) {
      calculatorList.innerHTML = '';
      if (filteredCalculators.length > 0) {
        filteredCalculators.forEach(item => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = item.url;
          a.textContent = item.title;
          a.target = '_blank';
          li.appendChild(a);
          calculatorList.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = 'No calculators found.';
        calculatorList.appendChild(li);
      }
    }

    function filterCalculators() {
      const query = searchInput.value.toLowerCase();
      const filteredCalculators = calculators.filter(item => item.title.toLowerCase().includes(query));
      displayCalculators(filteredCalculators);
    }

    displayCalculators(calculators);

    searchInput.addEventListener('input', filterCalculators);
  });
});
