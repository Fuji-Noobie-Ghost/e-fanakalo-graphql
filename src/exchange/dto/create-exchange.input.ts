import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsPhoneNumber, ValidationArguments } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Photo } from 'src/database'

const errorMessage = (validationArgument: ValidationArguments) => 'Missing argument ' + validationArgument.property

@InputType()
export class CreateExchangeInput {

  @IsNotEmpty({ message: errorMessage })
  @Field({ description: 'User name' })
  username: string

  @IsPhoneNumber('MG', { message: 'Invalid phone number' })
  @Field({ description: 'User phone number' })
  contact: string

  @IsNotEmpty({ message: errorMessage })
  @Field({ description: 'Title of the toy' })
  title: string

  photos?: Photo[]

  @IsNotEmpty({ message: errorMessage })
  @Field({ description: 'Description of the item the user is searching for' })
  searchFor: string

}