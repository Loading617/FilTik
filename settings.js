const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.filter-section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    sections.forEach(s => s.style.display = 'none');
    document.getElementById(`${tab.dataset.page}-settings`).style.display = 'block';
  });
});

document.querySelectorAll('.programmed-toggle').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const container = e.target.closest('.filter-section').querySelector('.programmed-filters');
    container.classList.toggle('hidden', !e.target.checked);
  });
});

document.querySelector('.save-settings').addEventListener('click', () => {
  alert("Settings saved! (stub)");
});
