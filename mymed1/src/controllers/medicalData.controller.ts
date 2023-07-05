import { AddHealthDataDto, HealthDataRequestDto, HealthParamDto, ObjectIdDto, healthParams } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser, RequestWithUserAndFile } from '@/interfaces/auth.interface';
import db from '@/services/db.services';
import dayjs from 'dayjs';
//Extends dayjs with timezone and utc plugins
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Stockholm');

import ExcelJS from 'exceljs';
import { NextFunction, Response } from 'express';

export class MedicalDataController {
  // Add a medical data entry. The data is in the format MedicalDataDto
  public async addHealthData(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const data = req.body as unknown as AddHealthDataDto;
      const { name } = req.params as unknown as HealthParamDto;

      const medicalData = await db.medicalData.create({
        data: {
          ...data,
          name,
          date: dayjs(data.date).toDate(),
          userId: id,
        },
        select: {
          id: true,
          name: true,
          value: true,
          date: true,
        },
      });

      res.status(201).json(medicalData);
    } catch (error) {
      next(error);
    }
  }

  // Delete a medical data entry by id
  public async deleteHealthData(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as unknown as ObjectIdDto;

      const result = await db.medicalData.deleteMany({
        where: {
          id: id,
          userId: req.user.id,
        },
      });

      if (result.count === 0) {
        throw new HttpException(404, 'Medical Data not found');
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // Update a medical data entry by id and user id
  public async updateHealthData(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as unknown as ObjectIdDto;
      const data = req.body as unknown as AddHealthDataDto;

      const result = await db.medicalData.update({
        where: {
          id_user: {
            id: id,
            userId: req.user.id,
          },
        },
        data: {
          ...data,
          date: dayjs(data.date).toDate(),
        },
        select: {
          id: true,
          name: true,
          value: true,
          date: true,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  //Get timeseries data for a user by name and date range
  public async getHealthDataTS(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { name } = req.params as unknown as HealthParamDto;
      const { start, end } = req.query as unknown as HealthDataRequestDto;

      const result = await db.medicalData.findMany({
        where: {
          userId: id,
          name: name,
          date: {
            gte: start,
            lte: end,
          },
        },
        select: {
          date: true,
          value: true,
          id: true,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  //Get timeseries data for a user by name and date range
  public async getHealthSnapshot(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { name } = req.query;
      const names = name?.length
        ? name
        : ['weight', 'blood_pressure', 'blood_sugar', 'spo2', 'heart_rate', 'temperature', 'sleep', 'steps', 'calories', 'vikt (kg)', 'bmi'];

      //Get the last entry for each of the given health parameters in the array names

      const result = await db.medicalData.findMany({
        where: {
          userId: id,
          name: {
            in: names,
          },
        },
        select: {
          date: true,
          value: true,
          name: true,
        },
        orderBy: {
          date: 'desc',
        },
        distinct: ['name'],
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  //Get timeseries data for a user by name and date range
  public async getHealthSnapshotByName(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { name } = req.params as unknown as HealthParamDto;

      //Get the last entry for each of the given health parameters in the array names

      const result = await db.medicalData.findMany({
        where: {
          name: name,
          userId: id,
        },
        select: {
          date: true,
          value: true,
          name: true,
        },
        orderBy: {
          date: 'desc',
        },
        distinct: ['name'],
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  //Accept an Excel file upload.
  //The file is parsed and the data is stored in the database.
  public async uploadMedicalData(req: RequestWithUserAndFile, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;

      //Open the file and parse the data using exceljs
      const workbook = new ExcelJS.Workbook();
      //Load the file based on path in request.file.path
      await workbook.xlsx.readFile(req.file.path);

      const worksheet = workbook.worksheets[0];

      //Get the data from the worksheet.
      //The data is in the format:
      // The first column is the date
      // The remaining columns contain the names of the medical data
      // The rows contain the values for the medical data
      const data = worksheet.getSheetValues().slice(1) as Array<Array<any>>;

      //Get the names of the medical data from the first row
      const indices = {
        date: data[0].findIndex(header => header === 'Datum' || header === 'Date'),
        time: data[0].findIndex(header => header === 'Tid' || header === 'Time'),
      };

      //Throw an error if the date or time index is not found
      if (indices.date === -1 || indices.time === -1) {
        throw new HttpException(400, 'Invalid file format');
      }

      //Iterate over the first row and store the index of each name that is in heatlhParams
      const healthParamsToAdd = data[0].filter((name, index) => {
        if (healthParams.includes(name)) {
          indices[name] = index;
          return true;
        }
      });

      //Throw an error if indices does not contain any names
      if (Object.keys(indices).length === 2) {
        throw new HttpException(400, 'Invalid file format');
      }

      //Create an array of objects containing the data for each medical data
      const heatlhData = [];
      //The data is in the format:
      // The first column is the date
      // The second column is the time
      // The remaining columns contain the values for the medical data
      data.slice(1).forEach(row => {
        const date = row[indices.date];
        const time = row[indices.time];

        healthParamsToAdd.forEach(name => {
          const value = row[indices[name]];
          if (value === undefined || value === null || value === '') return;
          heatlhData.push({
            date: parseDate(date, time),
            name: name,
            value: value,
            userId: id,
          });
        });
      });

      const insertedData = await db.$transaction(
        heatlhData.map(dataPoint =>
          db.medicalData.create({
            data: dataPoint,
            select: {
              id: true,
              name: true,
              value: true,
            },
          }),
        ),
      );
      res.status(200).json(insertedData);
    } catch (error) {
      next(error);
    }
  }
}

//Utility function to concat to columns:
//1. The date like 21 jan 2021
//2. The time like 12:00
//Parse the combination as a date and return it
function parseDate(date: string, time: string) {
  const djs = dayjs;

  //Parse the following date in dayjs '28 jan 2022'?
  //The month is always lower case. Convert the first letter to uppercase
  const month = date.split(' ')[1].charAt(0).toUpperCase() + date.split(' ')[1].slice(1);
  date = date.replace(date.split(' ')[1], month);
  const dateStr = `${date} ${time}`;

  //Parse the date and time and return the result as a date

  return dayjs.tz(dateStr, 'D MMM YYYY HH:mm', 'CET').toDate();
}
