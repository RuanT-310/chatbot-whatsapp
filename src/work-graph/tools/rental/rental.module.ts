import { Module } from '@nestjs/common';
import { RentalSearch } from './rental-search/rental-search';
import { RentalCreate } from './rental-create/rental-create';
import { RentalService } from './rental.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),],
  providers: [RentalCreate, RentalSearch, RentalService],
  exports: [RentalCreate, RentalSearch]
})
export class RentalModule {}
