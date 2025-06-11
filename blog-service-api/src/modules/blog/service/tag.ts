import { BlogCategoryEntity } from '../entity/category';
import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BlogTagEntity } from '../entity/tag';

/**
 * 博客分类服务
 */
@Provide()
export class BlogTagService extends BaseService {
  @InjectEntityModel(BlogTagEntity)
  blogTagEntity: Repository<BlogTagEntity>;
}
