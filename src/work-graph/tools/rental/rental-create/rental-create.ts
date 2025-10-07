import { Injectable } from "@nestjs/common";
import { RentalService } from "../rental.service";
import z from "zod";
import { tool } from "@langchain/core/tools";
import { createRentalSchema } from "../../schema/create-rental-input";

@Injectable()
export class RentalCreate {

  constructor(
    private rentalService: RentalService
  ) {}

  tool() {
    return tool(this.toolFunction.bind(this), {
      name: "rentalManager",
      description: `Gerencia operações CRUD com a entidade Rental`,
      schema: createRentalSchema,
    });
  }

  async toolFunction(input: z.infer<typeof createRentalSchema>) {
    return await this.rentalService.create(input);

  }

}
