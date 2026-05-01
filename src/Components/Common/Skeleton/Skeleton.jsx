import "./Skeleton.scss";

export const Skeleton = ({ className = "", children, ...props }) => {
  return (
    <div className={`skeleton ${className}`} aria-hidden="true" {...props}>
      {children}
    </div>
  );
};

export const SkeletonLine = ({ className = "" }) => (
  <span className={`skeleton-line ${className}`} aria-hidden="true" />
);

export const ProjectCardSkeleton = () => (
  <Skeleton className="project-card-skeleton">
    <div className="skeleton-media" />
    <div className="skeleton-content">
      <SkeletonLine className="wide" />
      <div className="skeleton-pills">
        <span />
        <span />
        <span />
      </div>
      <SkeletonLine className="button" />
    </div>
  </Skeleton>
);

export const BlogCardSkeleton = ({ index = 0 }) => (
  <Skeleton
    className="blog-card-skeleton"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="skeleton-media" />
    <div className="skeleton-content">
      <SkeletonLine className="wide" />
      <SkeletonLine />
      <SkeletonLine className="short" />
      <div className="skeleton-row">
        <SkeletonLine className="date" />
        <SkeletonLine className="button" />
      </div>
    </div>
  </Skeleton>
);

export const BlogDetailsSkeleton = () => (
  <article className="blog-details skeleton-page" aria-label="Loading blog">
    <div className="container">
      <Skeleton className="details-hero-skeleton">
        <SkeletonLine className="title" />
        <SkeletonLine className="subtitle" />
        <div className="skeleton-row">
          <SkeletonLine className="date" />
          <SkeletonLine className="button" />
        </div>
      </Skeleton>

      <div className="details-body details-body-skeleton">
        <Skeleton className="skeleton-hero-image" />
        <Skeleton className="skeleton-article-copy">
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine className="wide" />
          <SkeletonLine />
          <SkeletonLine className="short" />
        </Skeleton>
      </div>
    </div>
  </article>
);

export const ProjectDetailsSkeleton = () => (
  <main className="project-details skeleton-project-details" aria-label="Loading project">
    <div className="container">
      <header className="project-header">
        <SkeletonLine className="project-title" />
        <div className="skeleton-pills centered">
          <span />
          <span />
          <span />
          <span />
        </div>
      </header>

      <Skeleton className="screenshots-skeleton">
        <div />
      </Skeleton>

      <div className="skeleton-actions">
        <SkeletonLine className="button" />
        <SkeletonLine className="button" />
      </div>

      <Skeleton className="description-skeleton">
        <SkeletonLine className="heading" />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine className="short" />
      </Skeleton>
    </div>
  </main>
);

export const TableSkeleton = ({ rows = 5, columns = 2 }) => (
  <div className="table-skeleton" aria-label="Loading table">
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div className="table-skeleton-row" key={rowIndex}>
        {Array.from({ length: columns }).map((__, columnIndex) => (
          <SkeletonLine
            key={columnIndex}
            className={columnIndex === columns - 1 ? "table-action" : "table-cell"}
          />
        ))}
      </div>
    ))}
  </div>
);
