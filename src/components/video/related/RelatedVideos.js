import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ title }) {
  const {
    data: relatedVideos,
    isLoading,
    isError,
  } = useGetRelatedVideosQuery({ title });

  // decide what to render
  let content = null;
  if (isLoading)
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );

  if (!isLoading && isError) content = <Error message="There was an error" />;

  if (!isLoading && !isError && relatedVideos?.length) {
    content = <Error message="no related videos found" />;
  }

  if (!isLoading && !isError && relatedVideos?.length) {
    content = relatedVideos.map((relatedVideo) => (
      <RelatedVideo key={relatedVideo?.id} video={relatedVideo} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
