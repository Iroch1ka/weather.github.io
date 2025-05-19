const ApiKey = 'bc9c1a7617e6b97d7d8e8e6ccd6a2370';
const nowDate = document.querySelector(".nowDate");

const showDate = ()=>{
const now = new Date();
const day = now.getDate();
let month = now.toLocaleString('ru-Ru', {month:'long'});
month = month.slice(0, -1) + 'я';
console.log(` ${month} ${day}`);
nowDate.innerHTML = `${day} ${month}`;
}
showDate();

document.querySelector('form').addEventListener('submit', e =>{
  e.preventDefault();
  let inp =document.querySelector('.inp');
  let city = document.querySelector('.city');
inp.value = inp.value.charAt(0).toUpperCase() + inp.value.slice(1);
city.innerHTML = inp.value;
  getData(inp.value.trim());
  inp.value = '';

});
 
 getData('Северодвинск')
async function getData(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${ApiKey}`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
   if (res.status !== 200) {
        alert(data.message);
    } else {
        createWeather(data);
  }
}
 function createWeather(data){
  console.log(data);
  document.querySelector('.weather').innerHTML = `
  <div class="left">
        <span class="temp" >${Math.round(data.main.temp)} ℃</span>
        <span >ветер</span>
        <span>влажность</span>
      </div>
  
      <div class="right">
        <span><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="img"></span>
        <span class="wind">${Math.round(data.wind.speed)} м/с</span>
        <span class="hum"> ${data.main.humidity}%</span>
      </div> `
    } 
