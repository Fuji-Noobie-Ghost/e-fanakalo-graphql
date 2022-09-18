import { BadRequestException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ExchangeService } from './exchange.service'
import { Exchange, Photo } from '../database'
import { CreateExchangeInput } from './dto/create-exchange.input'
import { UpdateExchangeInput } from './dto/update-exchange.input'
import { PaginationInput } from './dto/pagination.input'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { FileUpload } from 'graphql-upload'

@Resolver(() => Exchange)
export class ExchangeResolver {

  constructor(private readonly exchangeService: ExchangeService) {}

  @Mutation(() => Exchange)
  async createExchange(
    @Args('files', { type: () => [GraphQLUpload] }) files: Promise<FileUpload>[],
    @Args('exchangeInput', { type: () => CreateExchangeInput }) exchangeInput: CreateExchangeInput
  ) {
    
    const photosTmp = await this.exchangeService.uploadPhotos(files);
    let photos: Photo[] = [];
    (await Promise.all(photosTmp)).map(async (photo: Photo) => {
      photos.push(photo)
    })
    exchangeInput.photos = photos
    return this.exchangeService.create(exchangeInput)
  }

  @Query(() => [Exchange], { name: 'exchanges' })
  findAll(@Args('sort') sort: string) {
    const sortAccepts = ['username', 'title', 'createdAt', 'updatedAt']
    if (!sort) sort = 'updatedAt'
    else if (!sortAccepts.includes(sort))
      throw new BadRequestException('Invalid sort value : "' + sort + '"')
    return this.exchangeService.findAll(sort);
  }

  @Query(() => [Exchange], { name: 'exchangesPaginate' })
  findAllPaginate(@Args('findInput') paginationInput: PaginationInput) {
    const sortAccepts = ['username', 'title', 'createdAt', 'updatedAt']
    if (!paginationInput.sort) paginationInput.sort = 'updatedAt'
    else if (!sortAccepts.includes(paginationInput.sort))
      throw new BadRequestException('Invalid sort value : "' + paginationInput.sort + '"')

    if (!paginationInput.status) paginationInput.status = 'novalue'
    else if (paginationInput.status !== 'active' && paginationInput.status !== 'deactive')
      throw new BadRequestException('Invalid status value : "' + paginationInput.status + '"')
    else paginationInput.status = paginationInput.status === 'active' ? 'Y' : 'N'

    if (!paginationInput.page) paginationInput.page = 1
    if (!paginationInput.perPage) paginationInput.perPage = 10

    return this.exchangeService.findAllPaginate(paginationInput);
  }

  @Query(() => Exchange, { name: 'exchange' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.exchangeService.findOne(id);
  }

  @Mutation(() => Exchange)
  updateExchange(@Args('updateExchangeInput') updateExchangeInput: UpdateExchangeInput) {
    if (updateExchangeInput.isActive !== 'N' && updateExchangeInput.isActive !== 'Y')
      throw new BadRequestException('Invalid status value : "' + updateExchangeInput.isActive + '"')
    return this.exchangeService.update(updateExchangeInput.id, updateExchangeInput);
  }

  @Mutation(() => Exchange)
  removeExchange(@Args('id', { type: () => String }) id: string) {
    return this.exchangeService.remove(id);
  }

}
