const BlogSkeleton = () => {
  return (
    <article className="rounded-lg shadow-lg w-[50%] border border-gray py-5 px-7 animate-pulse">
      <header className="flex justify-between items-start">
        <hgroup className="mb-5">
          <h2 className="h-5 bg-gray-300 rounded w-[200px] mb-2"></h2>
          <p className="h-4 bg-gray-300 rounded w-[300px]"></p>
        </hgroup>

        <div className="flex gap-2">
          <button type="button">
            <div className="h-4 w-5 bg-gray-300 rounded"></div>
          </button>
          <button type="button">
            <div className="h-4 w-5 bg-gray-300 rounded"></div>
          </button>
        </div>
      </header>
      <footer className="flex justify-between items-baseline mb-1">
        <div className="flex gap-2">
          <div className="h-4 w-24 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-300 rounded-full"></div>
        </div>
        <button className="h-4 w-24 bg-gray-300 rounded-full"></button>
      </footer>
    </article>
  );
};

export default BlogSkeleton;
