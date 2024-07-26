import { Router } from 'express';
import { SearchController } from '@controllers/search.controller';
import { Routes } from '@interfaces/routes.interface';

export class SearchRoute implements Routes {
  public path = '/search';
  public router = Router();
  public search = new SearchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.search.getWeatherForAddress);
  }
}