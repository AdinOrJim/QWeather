const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    //destructure properties
    const {
        cityDetails,
        weatherDetails
    } = data;

    //update details
    details.innerHTML = `
     <h5 class="my-3">${cityDetails.EnglishName}</h5>
     <div class="my-3">${weatherDetails.WeatherText}</div>
     <div class="display-4 my-4">
          <span>${weatherDetails.Temperature.Metric.Value}</span>
         <span>&deg;C</span>
      </div>
    
    `;

    //update the night/day and icon images

    const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weatherDetails.IsDayTime ? 'img/day.svg' : 'img/night.svg' ;
    time.setAttribute('src', timeSrc);

    //remove display none if present

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};


cityForm.addEventListener('submit', e => {
    //prevent default
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with city info
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('recentCity', city);

});

if(localStorage.getItem('recentCity')){
    forecast.updateCity(localStorage.getItem('recentCity'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
