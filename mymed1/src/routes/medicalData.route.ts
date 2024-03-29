import { MedicalDataController } from '@/controllers/medicalData.controller';
import { AuthMiddleware, splitNameQueryParam } from '@/middlewares/auth.middleware';
import { excelMimes, uploaderMiddleware } from '@/middlewares/upload.middleware';
import { AddHealthDataDto, HealthParamDto, ObjectIdDto, PaginationDto, HealthParamNameDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class MedicalDataRoutes implements Routes {
  public path = '/stats';
  public router = Router();
  private controller = new MedicalDataController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      this.path,
      AuthMiddleware,
      splitNameQueryParam,
      ValidationMiddleware(HealthParamNameDto, 'query'),
      this.controller.getHealthSnapshot,
    );
    this.router.get(`${this.path}/:name`, AuthMiddleware, ValidationMiddleware(HealthParamDto, 'params'), this.controller.getHealthSnapshotByName);
    this.router.get(`${this.path}/timeseries/:name`, AuthMiddleware, ValidationMiddleware(HealthParamDto, 'params'), this.controller.getHealthDataTS);

    this.router.put(
      `${this.path}/:name`,
      AuthMiddleware,
      ValidationMiddleware(HealthParamDto, 'params'),
      ValidationMiddleware(AddHealthDataDto, 'body', { skipMissingProperties: true }),
      this.controller.addHealthData,
    );

    this.router.delete(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(ObjectIdDto, 'params'), this.controller.deleteHealthData);

    this.router.patch(
      `${this.path}/:id`,
      AuthMiddleware,
      ValidationMiddleware(ObjectIdDto, 'params'),
      ValidationMiddleware(AddHealthDataDto, 'body'),
      this.controller.updateHealthData,
    );
    this.router.post(`${this.path}/upload`, AuthMiddleware, uploaderMiddleware(excelMimes), this.controller.uploadMedicalData);
  }
}
