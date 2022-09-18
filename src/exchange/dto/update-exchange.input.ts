import { InputType, Field } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class UpdateExchangeInput {

  @IsUUID(null, { message: 'Invalid id UUID' })
  @Field({})
  id: string

  @Field({})
  isActive: string

}
