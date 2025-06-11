import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCategoryEntity } from '../entity/category';

/**
 * 博客文章服务
 */
@Provide()
export class BlogPostService extends BaseService {
  @InjectEntityModel(BlogCategoryEntity)
  blogCategoryEntity: Repository<BlogCategoryEntity>;
}
