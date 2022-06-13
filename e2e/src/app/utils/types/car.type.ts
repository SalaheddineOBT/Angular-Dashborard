import { Car } from '../models/car.model';

export type TCar = { [k in keyof Car]: any };
