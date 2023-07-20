import ContentLoader from "react-content-loader";

const SkeletonLoader = (props) => (
  <ContentLoader
    speed={2}
    width={350}
    height={250}
    viewBox="0 0 450 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#c7d2e0"
    {...props}>
    <rect x="25" y="4" rx="0" ry="0" width="318" height="197" />
    <rect x="28" y="212" rx="0" ry="0" width="171" height="21" />
    <rect x="239" y="207" rx="8" ry="8" width="101" height="35" />
  </ContentLoader>
);

export default SkeletonLoader;

