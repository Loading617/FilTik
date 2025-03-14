function fetchData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error fetching data:', error));
}

function initBackgroundTasks() {
    console.log('Background tasks initialized');

    setInterval(() => {
        fetchData('https://api.example.com/data', (data) => {
            console.log('Fetched data:', data);
        });
    }, 60000);
}

initBackgroundTasks();
