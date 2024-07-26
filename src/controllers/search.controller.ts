import { SearchService } from '@/services/search.service'
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class SearchController {
  public search = Container.get(SearchService);

  public getWeatherForAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const address: string = req.query.address as string;
      console.log('address', address)

      const weatherData = await this.search.fetchWeatherForAddress(address)

      res.status(200).json({ data: weatherData, message: 'getWeatherForAddress' });
    } catch (error) {
      next(error);
    }
  };
}
