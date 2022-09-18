import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exchange, Photo } from 'src/database';
import { Repository } from 'typeorm';
import { CreateExchangeInput } from './dto/create-exchange.input';
import { PaginationInput } from './dto/pagination.input';
import { UpdateExchangeInput } from './dto/update-exchange.input';
import { FileUpload } from 'graphql-upload/index'
import { join, extname } from 'path';
import { createWriteStream, rename,  } from 'fs';

@Injectable()
export class ExchangeService {

  constructor(
    @InjectRepository(Exchange) private exchangeRepository: Repository<Exchange>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>
  ) {}

  async uploadPhotos(photos: Promise<FileUpload>[]) {
    const accepts = ['image/png', 'image/jpg', 'image/jpeg'];

    (await Promise.all(photos)).forEach(async file => {
      const { mimetype } = await file
      if (!accepts.includes(mimetype)) throw new BadRequestException('Not a valid images')
    });
    
    return (await Promise.all(photos)).map(async file => {
      const { createReadStream, filename } = await file

      return new Promise((resolve, reject) => {
        const stream = createReadStream()
        stream.pipe(createWriteStream(join(process.cwd(), `./uploads/${filename}`)))
          .on('finish', () => {
            const newFileName = Date.now() + extname(filename)
            const photo = new Photo()
            
            rename(
              join(process.cwd(), `./uploads/${filename}`),
              join(process.cwd(), `./uploads/${newFileName}`),
              (err) => {
                if (err) reject(err)
                else {
                  photo.name = newFileName
                  resolve(photo)
                }
            })
          })
          .on('error', reject)
      })
    })
  }

  async create(exchangeInput: CreateExchangeInput): Promise<Exchange> {
    const exchange = this.exchangeRepository.create(exchangeInput)
    return this.exchangeRepository.save(exchange)
  }

  async findAll(sort: string): Promise<Exchange[]> {
    const order = []
    order[sort] = (sort === 'updatedAt' || sort === 'createdAt') ? 'DESC' : 'ASC'
    return this.exchangeRepository.find({
      relations: ['photos'],
      order: { isActive: 'DESC', ...order }
    })
  }

  async findAllPaginate({ status, page, perPage, sort }: PaginationInput): Promise<Exchange[]> {
    let statusTmp = {}
    if (status !== 'novalue') statusTmp = { isActive: status }
    console.log(sort)
    const order = []
    order[sort] = (sort === 'updatedAt' || sort === 'createdAt') ? 'DESC' : 'ASC'
    return this.exchangeRepository.find({
      where: statusTmp,
      relations: ['photos'],
      take: perPage * page,
      skip: perPage * (page - 1),
      order: { isActive: 'DESC', ...order }
    })
  }

  findOne(id: string): Promise<Exchange> {
    return this.exchangeRepository.findOneOrFail({
      where: { id },
      relations: ['photos']
    })
  }

  async update(id: string, updateExchangeInput: UpdateExchangeInput) {
    const exchange = await this.findOne(id)
    if (exchange.isActive !== updateExchangeInput.isActive) {
      exchange.isActive = updateExchangeInput.isActive
      await this.exchangeRepository.save(exchange)
    }
    return exchange
  }

  remove(id: string) {
    return this.exchangeRepository.delete({ id })
  }
}
