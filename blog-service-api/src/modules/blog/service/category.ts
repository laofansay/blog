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



    /**
     * 分页查询文章
     * @param query 查询参数
     */
    async pageQuery(query: any) {
        // 创建查询构建器
        const queryBuilder = this.blogCategoryEntity
            .createQueryBuilder('category')
            .where('category.status = :status', { status: 1 })
            .orderBy('category.createTime', 'DESC');

        // 设置分页参数
        const page = parseInt(query.page) || 1;
        const size = parseInt(query.size) || 10;

        queryBuilder.skip((page - 1) * size).take(size);
        // 查询文章列表和总数
        const [list, total] = await queryBuilder.getManyAndCount();

        return {
            list,
            pagination: {
                page,
                size,
                total
            }
        };
    }

} 