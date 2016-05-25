export default function getWeather() {
  let url = `http://api.openweathermap.org/data/2.5/forecast/city?id=690197&APPID=4259ac50f5b3023fdc36416348a232a9`

  return fetch(url).then((response) => response.json())
}
