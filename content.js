function updateFilterButtons() {
    document.getElementById('shuffle').addEventListener('click', function() {
        console.log('Shuffle button clicked');
    });

    document.getElementById('program').addEventListener('click', function() {
        console.log('Program button clicked');
    });
}

function initContentTasks() {
    console.log('Content tasks initialized');
    updateFilterButtons();
}

initContentTasks();
