import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import Error from "../ui/Error";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";

export default function Video() {
  const { videoId } = useParams();
  // const {
  //   data: video,
  //   isLoading,
  //   isError,
  // } = useGetVideoQuery(videoId, {
  //   refetchOnMountOrArgChange: 5,
  // });
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

  // decide what to render
  let content = null;
  if (isLoading)
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    );

  if (!isLoading && isError)
    content = <Error message="Something happened. there is an error" />;

  if (!isLoading && !isError && !video?.id)
    content = <Error message="Video not found" />;

  if (!isLoading && !isError && video?.id) {
    const { title, link } = video || {};
    content = (
      <>
        <Player title={title} link={link} />
        <Description video={video} />
      </>
    );
  }

  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          {video?.id ? (
            <RelatedVideos title={video.title} />
          ) : isLoading ? (
            <>
              <RelatedVideoLoader />
              <RelatedVideoLoader />
              <RelatedVideoLoader />
              <RelatedVideoLoader />
            </>
          ) : (
            <>
              <Error message="there was an error" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
