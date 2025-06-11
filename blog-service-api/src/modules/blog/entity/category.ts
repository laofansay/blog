import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../base/entity/base';
/**
 * 博客模块-分类
 */
@Entity('blog_category')
export class BlogCategoryEntity extends BaseEntity {
  @Index()
  @Column({ comment: '分类名称', length: 50 })
  name: string;

  @Column({ comment: '图标', default: 0 })
  icon: string;

  @Column({ comment: '排序', default: 0 })
  orderNum: number;

  @Column({ comment: '分类的排序值 被使用的越多数值越大', nullable: true })
  rank: number;

  @Column({ comment: '状态 0-禁用 1-启用', default: 1 })
  status: number;
}
