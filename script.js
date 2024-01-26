function getData(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        // Data'yı HTML sayfasına sadece "name" alanını ekleyin
        const nameContainer = document.getElementById('name-container');
        
        if (data.length > 0 && nameContainer) {
          const firstName = data[0].name; // İlk elemanın "name" alanını alın
          nameContainer.innerHTML = `<p>Name: ${firstName}</p>`;
        } else {
          console.error('Hedef eleman bulunamadı veya veri eksik.');
        }
      })      
      .then(data => {
        // Data'yı HTML sayfasına ekle
        const dataContainer = document.getElementById('data-container');
        dataContainer.innerHTML = `<p>Data: ${JSON.stringify(data)}</p>`;
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }
  
  const fetchButton = document.getElementById('fetchButton');
  fetchButton.addEventListener('click', function() {
    getData('http://localhost:8080/patient/getPatients');
  });
  

