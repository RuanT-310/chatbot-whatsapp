import { Injectable } from "@nestjs/common";
import { RentalService } from "../rental.service";
import z from "zod";
import { tool } from "@langchain/core/tools";
import { rentalSearchSchema } from "../../schema/search-rental-input";

@Injectable()
export class RentalSearch {

  constructor(
    private rentalService: RentalService
  ) {}

  tool() {
    return tool(this.toolFunction.bind(this), {
      name: "rentalManager",
      description: `Busca uma casa de aluguel de acordo com o ID informado`,
      schema: rentalSearchSchema,
    });
  }

  async toolFunction(input: z.infer<typeof rentalSearchSchema>) {
    return await this.rentalService.findOne(input.id);

  }

}
