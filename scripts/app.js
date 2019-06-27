const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

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

    let timeSrc = null;
    if (weatherDetails.IsDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    };
    time.setAttribute('src', timeSrc);

    //remove display none if present

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return {
        cityDetails,
        weatherDetails
    };
};

cityForm.addEventListener('submit', e => {
    //prevent default
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with city info
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

});