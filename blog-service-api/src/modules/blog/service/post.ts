import { BlogPostEntity } from '../entity/post';
import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 博客文章服务
 */
@Provide()
export class BlogPostService extends BaseService {
    @InjectEntityModel(BlogPostEntity)
    blogPostEntity: Repository<BlogPostEntity>;

    /**
     * 发布文章
     */
    async publish(id: number) {
        await this.blogPostEntity.update(
            { id },
            { status: 1, publishTime: new Date() }
        );
        return { success: true };
    }

    /**
     * 增加浏览量
     */
    async addViewCount(id: number) {
        try {
            // 确保id是数字类型
            id = Number(id);

            if (isNaN(id)) {
                throw new Error('Invalid blog post ID');
            }

            await this.blogPostEntity
                .createQueryBuilder()
                .update()
                .set({
                    viewCount: () => 'viewCount + 1',
                })
                .where('id = :id', { id })
                .execute();

            return { success: true };
        } catch (error) {
            console.error('Error updating view count:', error);
            throw error;
        }
    }

    /**
     * 获取文章详情
     */
    async info(params: any) {
        try {
            // 确保id是数字类型
            const id = Number(params.id);

            if (isNaN(id)) {
                throw new Error('Invalid blog post ID');
            }

            return await this.blogPostEntity.findOne({
                where: { id }
            });
        } catch (error) {
            console.error('Error fetching blog post:', error);
            throw error;
        }
    }

    /**
     * 分页查询文章
     * @param query 查询参数
     */
    async pageQuery(query: any) {
        // 创建查询构建器
        const queryBuilder = this.blogPostEntity
            .createQueryBuilder('post')
            .where('post.status = :status', { status: 1 })
            .orderBy('post.publishTime', 'DESC');

        // 分类筛选
        if (query.categoryId) {
            queryBuilder.andWhere('post.categoryId = :categoryId', {
                categoryId: query.categoryId
            });
        }

        // 标题和摘要模糊搜索
        if (query.keyword) {
            queryBuilder.andWhere(
                '(post.title LIKE :keyword OR post.summary LIKE :keyword)',
                { keyword: `%${query.keyword}%` }
            );
        }

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