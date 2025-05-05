import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 博客模块-文章
 */
@Entity('blog_post')
export class BlogPostEntity extends BaseEntity {
    @Index()
    @Column({ comment: '标题', length: 100 })
    title: string;
    @Column({ comment: '副标题', length: 100, nullable: true })
    subTitle: string;

    @Column({
        comment: '标签',
        type: 'json',
    })
    tags: string;

    @Column({ comment: 'blog地址', length: 100 })
    url: string;


    @Column({ comment: '摘要', nullable: true, length: 500 })
    summary: string;

    @Column({ comment: '封面图', nullable: true })
    coverImage: string;

    @Column({ comment: '封面图说明', nullable: true })
    coverAlt: string;

    @Column({ comment: 'seo标题', nullable: true })
    seoTitle: string;

    @Column({ comment: 'seo描述', nullable: true })
    seoDescription: string;

    @Column({ comment: '内容', type: 'text' })
    content: string;

    @Column({ comment: '分类ID' })
    categoryId: number;

    @Column({ comment: '作者ID' })
    authorId: number;

    @Column({ comment: '浏览量', default: 0 })
    viewCount: number;

    @Column({ comment: '状态 0-草稿 1-已发布', default: 0 })
    status: number;

    @Column({ comment: '允许评论 1-不允许评论', default: 0 })
    enableComment: boolean;

    @Column({ comment: '发布时间', nullable: true })
    publishTime: Date;



} 