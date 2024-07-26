// ! import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import fetch from 'node-fetch'
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';

@Service()
export class SearchService {
  // ! example if interacting with database
  // ! public users = new PrismaClient().user;

  private async fetchCoordinates(address: string): Promise<{ lat: number; lon: number; displayName: string }> {

    try {
      console.log('address before fetch', address);
      console.log(process.env.GEOCODE_API_URL + `?q=${encodeURIComponent(address)}&api_key=${process.env.GEOCODE_API_KEY}`)
      const response = await fetch(process.env.GEOCODE_API_URL + `?q=${encodeURIComponent(address)}&api_key=${process.env.GEOCODE_API_KEY}`);

      console.log(response)
      if (response.ok) {
        const result = await response.json(); // use first address in results
        return { lat: result[0].lat, lon: result[0].lon, displayName: result[0].displayName };
      } else {
        throw new Error('response was not a 200- level response: ' + JSON.stringify(response));
        // ? HttpException?? i.e. throw new HttpException
      }
    } catch (e) {
      console.log(e)
      throw new Error(JSON.stringify(e)); // ! probably fix
    }
  }

  // ! type?
  private async fetchWeather(lat: number, lon: number): Promise<any> {
    try {
      const response = await fetch(
        process.env.OPEN_WEATHER_API_URL + `?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`,
      );

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error('response was not a 200- level response: ' + JSON.stringify(response));
        // ? HttpException?? i.e. throw new HttpException
      }
    } catch (e) {
      throw new Error(JSON.stringify(e)); // ! probably fix
    }
  }

  // ! fix type
  public async fetchWeatherForAddress(address: string): Promise<any> {
    const { lat, lon, displayName } = await this.fetchCoordinates(address);

    const weatherData = await this.fetchWeather(lat, lon)

    console.log(JSON.stringify(weatherData))

    return weatherData
  }
}
