import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const CategoryList = () => {

    const cats = [{
        "slug": "new",
        "url": "https://images.pexels.com/photos/1236523/pexels-photo-1236523.jpeg?auto=compress&cs=tinysrgb&w=800",
        "name": "生活",
    },
    {
        "slug": "move",
        "url": "https://images.pexels.com/photos/158734/bird-nest-eggs-blue-158734.jpeg?auto=compress&cs=tinysrgb&w=800",
        "name": "技术",

    },
    {
        "slug": "move",
        "url": "https://images.pexels.com/photos/3764579/pexels-photo-3764579.jpeg?auto=compress&cs=tinysrgb&w=800",
        "name": "技术",

    },
    {
        "slug": "move",
        "url": "https://images.pexels.com/photos/923556/pexels-photo-923556.jpeg?auto=compress&cs=tinysrgb&w=800",
        "name": "技术",

    },
    {
        "slug": "move",
        "url": "https://images.pexels.com/photos/3036405/pexels-photo-3036405.jpeg?auto=compress&cs=tinysrgb&w=800",
        "name": "技术",

    },
    {
        "slug": "move",
        "url": "https://images.pexels.com/photos/749567/pexels-photo-749567.jpeg?auto=compress&cs=tinysrgb&w=800",
        "name": "技术",

    },

    ];

    return (
        <div className="px-4 overflow-x-scroll scrollbar-hide">
            <div className="flex gap-4 md:gap-1">
                {cats.map((item, key) => (
                    <Link
                        href={`/list?cat=${item.slug}`}
                        className="flex-shrink-0 w-full sm:w-1/ lg:w-1/5 xl:w-1/5"
                        key={key}
                    >
                        <h1 className="mt-8 font-light text-xl tracking-wide">
                            {item.name}
                        </h1>
                        <div className="relative bg-slate-100 w-full h-96">
                            <Image
                                src={item.url || "cat.png"}
                                alt=""
                                fill
                                sizes="20vw"
                                className="object-cover"
                            />
                        </div>

                    </Link>
                ))}
            </div>
        </div>


        // <div className="px-4 overflow-x-scroll scrollbar-hide">
        // <div className="flex flex-wrap gap-4 md:gap-8">
        //     {cats.map((item) => (
        //     <Link
        //         href={`/list?cat=${item.slug}`}
        //         className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        //         key={item._id}
        //     >
        //         <h1 className="mt-8 font-light text-xl tracking-wide">
        //         {item.name}
        //         </h1>
        //         <div className="relative bg-slate-100 w-full h-96">
        //         <Image
        //             src={item.url || "cat.png"}
        //             alt=""
        //             fill
        //             sizes="20vw"
        //             className="object-cover"
        //         />
        //         </div>
        //     </Link>
        //     ))}
        // </div>
        // </div>

    );
};

export default CategoryList     