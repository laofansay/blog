import { IBlog } from "@/api/model/blog.model";
import Card from "./Card";
import ProfileCard from "./ProfileCard";
import ProfileStat from "./ProfileDate";
import ProfileCategory from "./ProfileCategory";
import ProfileTags from "./ProfileTags";
import { Button } from "@nextui-org/react";
import { useEffect, useState, useCallback, memo, useRef } from "react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

const ITEMS_PER_PAGE = 10;

const CardList = memo(({ data }: { data: IBlog[] }) => {
  CardList.displayName = "CardList";
  const [showTopButton, setShowTopButton] = useState(false);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const scrollableRef = useRef<HTMLDivElement>(null);
 
 

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowTopButton(scrollTop > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-wrap md:flex-no-wrap relative z-10">
      <div className="bg-gray-100 my-2 mb-8 w-full md:w-1/4 mr-2 md:mr-0 hidden md:block">
        <ProfileCard />
        <ProfileCategory />
        <ProfileTags />
        <ProfileStat />
      </div>
      <div
        className="bg-gray-100 my-2 mb-8 w-full md:w-3/4 ml-2 md:ml-0 md:pl-2 md:pr-2"
        ref={scrollableRef}
      >
        <div className="flex flex-col">
          {data?.slice(0, visibleItems).map((item) => (
            <Card key={item.id as number} item={item} />
          ))}
        </div>

        {showTopButton && (
          <div className="flex flex-col justify-between items-end py-2">
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              onClick={scrollToTop}
            >
              回到顶部
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

export default memo(CardList);
