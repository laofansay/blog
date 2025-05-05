import Link from "next/link";
import Image from "next/image";
import { formatCreatedTime } from '@/api/config/constants';
import { IBlog } from '@/api/model/blog.model';
import { useRouter } from "next/navigation";
import { marked } from 'marked';
import { memo } from 'react';

const Card = memo(({ item }: { item: IBlog }) => {
  Card.displayName = "Card";
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/posts/${item.id}`);
  }

  const markdownToHtml = (markdown: string) => {
    return { __html: marked.parse(markdown.substring(0, 150)) as string };
  };

  return (
    <div className="bg-white rounded-md shadow-sm  px-3 py-2 " onClick={handleDetail}>
      <div className="flex flex-wrap md:flex-no-wrap">

        <div className="flex flex-col float-start pl-2 pt-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 ">
          <div className="relative min-h-[180px] min-w-[180px] mr-3 rounded-md overflow-hidden">
            <Image
              src={item.imageUrl || '/default-image.png'}
              alt={item.title || 'Blog image'}
              fill
              sizes="180px"
              className="object-cover transition-opacity duration-200 ease"
              loading="lazy"
              quality={75}
            />
          </div>
        </div>

        <div className="flex flex-col float-end min-h-1 pt-2 pl-3 pr-3 w-full md:w-1/2 lg:w-2/3 xl:w-3/4">
          <div className="block transition-opacity duration-200 ease-in-out text-gray-700 no-underline max-w-full">
            <h1 className="text-4xl font-bold mb-2 mt-0 leading-tight">
              {item.title}
            </h1>
            <p className="text-xl mb-0 mt-0 leading-relaxed">
              {item.shortDescription}
            </p>
          </div>

          <div className="mt-2 mb-2">
            <div className="inline-block mr-2 text-gray-600 text-xs leading-5 tracking-wider">{formatCreatedTime(item.createdTime)}</div>
            <div className="inline-block mr-2 text-gray-600 text-xs leading-5 tracking-wider">|</div>
            <div className="inline-block mr-2 text-gray-600 text-xs leading-5 tracking-wider">
              <Link className="inline ml-2 transition-color duration-200 ease-in-out font-lato text-gray-600 text-sm leading-6 underline"
                href={`/list?category=${item.category?.name}`}>
                {item.category?.name}
              </Link>
            </div>
          </div>
          <div>
            <p className="inline text-gray-600 text-sm leading-6" dangerouslySetInnerHTML={markdownToHtml(item?.topic || '')} />
            <Link
              className="inline ml-2 transition-colors duration-200 ease-in-out font-lato text-gray-600 text-sm leading-6 underline"
              href={`/posts/${item.id}`}>
              进入阅读
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});  

export default memo(Card);
