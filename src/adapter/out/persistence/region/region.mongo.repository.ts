import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from '@adapter/out/persistence/repository';
import { transactionSessionStorage } from '@adapter/out/persistence/common/transaction/transaction.session.storage';
import { Region } from '@domain/region/region';
import { RegionEntity } from '@adapter/out/persistence/region/schema/region.schema';
import { RegionMapper } from '@adapter/out/persistence/region/mapper/region.mapper';
import { RegionRepository } from '@application/port/out/region/region.repository';

@Injectable()
export class RegionMongoRepository
  extends Repository<RegionEntity, Region>
  implements RegionRepository
{
  constructor(
    @InjectModel(Region.name) private readonly regionModel: Model<RegionEntity>,
    private readonly regionMapper: RegionMapper,
  ) {
    super(regionModel, regionMapper, transactionSessionStorage);
  }
}