/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Activity } from './activity';
import { User } from './user';

export interface PreReservation { 
    id?: number;
    reservedAt?: Date;
    expirationDate?: Date;
    totalPrice?: number;
    status?: PreReservation.StatusEnum;
    users?: Array<User>;
    activities?: Array<Activity>;
}
export namespace PreReservation {
    export type StatusEnum = 'PENDING' | 'CANCELLED' | 'EXPIRED';
    export const StatusEnum = {
        PENDING: 'PENDING' as StatusEnum,
        CANCELLED: 'CANCELLED' as StatusEnum,
        EXPIRED: 'EXPIRED' as StatusEnum
    };
}