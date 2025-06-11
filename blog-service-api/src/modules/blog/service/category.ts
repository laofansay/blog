import { BlogCategoryEntity } from '../entity/category';
import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 博客分类服务
 */
@Provide()
export class BlogCategoryService extends BaseService {
  @InjectEntityModel(BlogCategoryEntity)
  blogCategoryEntity: Repository<BlogCategoryEntity>;
}
