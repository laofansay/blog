import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 博客模块-文章
 */
@Entity('blog_tag')
export class BlogTagEntity extends BaseEntity {

    @Index()
    @Column({ comment: 'tag名称', length: 50 })
    name: string;

    @Column({ comment: 'tag编码', nullable: true })
    code: string;

    @Column({ comment: 'tag图标', nullable: true })
    icon: string;

    @Column({ comment: '状态 0-禁用 1-启用', default: 1 })
    status: number;

} 