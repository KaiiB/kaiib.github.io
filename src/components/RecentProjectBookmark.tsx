// src/components/SklearnBookmark.tsx
export const RecentProjectBookmark = () => {
  return SklearnBookmark();
}

const SklearnBookmark = () => {
  return (
    <a
      href="https://ml-under-the-hood-site.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-6 right-4 z-40 group"
    >
      <div
        className="
          relative
          bg-red-600 text-white
          px-4 py-2
          text-xs font-semibold tracking-[0.2em]
          uppercase
          shadow-lg
          rounded-t-md
          transition-transform duration-200
          group-hover:-translate-y-0.5
          after:content-['']
          after:absolute
          after:left-1/2
          after:-translate-x-1/2
          after:-bottom-2
          after:border-x-[10px]
          after:border-b-[8px]
          after:border-x-transparent
          after:border-b-red-700
        "
      >
        New • 
      </div>
    </a>
  );
};

