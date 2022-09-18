import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PaginationInput {

    @Field({ nullable: true })
    status?: string

    @Field(type => Int, { nullable: true })
    page?: number

    @Field(type => Int, { nullable: true })
    perPage?: number

    @Field({ nullable: true })
    sort?: string

}