import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Rental } from '../schema/rental-schema';
import { UpdateRentalInput } from '../schema/update-rental-input';
import { CreateRentalInput } from '../schema/create-rental-input';


@Injectable()
export class RentalService {
    private readonly serviceUrl: string;
    private readonly logger = new Logger(RentalService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.serviceUrl = this.configService.getOrThrow<string>('RENTAL_SERVICE_URL');
    }

    private async _requestGraphQL<T>(query: string, variables?: any): Promise<T> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(this.serviceUrl, { query, variables }),
            );
            
            if (response.data.errors) {
                this.logger.error('GraphQL Errors:', response.data.errors);
                throw new InternalServerErrorException('An error occurred while fetching data from the external service.');
            }

            return response.data.data;
        } catch (error) {
            this.logger.error(`Failed to execute GraphQL request to ${this.serviceUrl}`, error.stack);
            throw new InternalServerErrorException('Failed to communicate with the external rental service.');
        }
    }
    
    async create(createRentalInput: CreateRentalInput): Promise<Rental> {
        const mutation = `
            mutation CreateRental($createRentalInput: CreateRentalInput!) {
                createRental(createRentalInput: $createRentalInput) {
                    id
                    status
                    images
                    type
                    price
                    title
                    location
                    sector
                    sqft
                    bed
                    bath
                    contact
                    ownerId
                }
            }
        `;
        const response = await this._requestGraphQL<{ createRental: Rental }>(mutation, { createRentalInput });
        return response.createRental;
    }

    async findAll(): Promise<Rental[]> {
        const query = `
            query AllRental {
                allRental {
                    id
                    status
                    images
                    type
                    price
                    title
                    location
                    sector
                    sqft
                    bed
                    bath
                    contact
                    ownerId
                }
            }
        `;
        const response = await this._requestGraphQL<{ allRental: Rental[] }>(query);
        return response.allRental;
    }

    async findOne(id: string): Promise<Rental> {
        const query = `
            query Rental($id: String!) {
                rental(id: $id) {
                    id
                    status
                    images
                    type
                    price
                    title
                    location
                    sector
                    sqft
                    bed
                    bath
                    contact
                    ownerId
                }
            }
        `;
        const response = await this._requestGraphQL<{ rental: Rental }>(query, { id });
        console.log(response);
        return response.rental;
    }

    async update(id: string, updateRentalInput: UpdateRentalInput): Promise<Rental> {
        const mutation = `
            mutation UpdateRental($updateRentalInput: UpdateRentalInput!) {
                updateRental(updateRentalInput: $updateRentalInput) {
                    id
                    status
                    images
                    type
                    price
                    title
                    location
                    sector
                    sqft
                    bed
                    bath
                    contact
                    ownerId
                }
            }
        `;
        const response = await this._requestGraphQL<{ updateRental: Rental }>(mutation, { updateRentalInput, id });
        return response.updateRental;
    }

    async remove(id: string): Promise<Rental> {
        const mutation = `
            mutation RemoveRental($id: String!) {
                removeRental(id: $id) {
                    id # Geralmente, ao remover, só o ID é retornado para confirmação.
                }
            }
        `;
        const response = await this._requestGraphQL<{ removeRental: Rental }>(mutation, { id });
        return response.removeRental;
    }
}