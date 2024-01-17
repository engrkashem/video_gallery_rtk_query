// import { useEffect, useState } from "react";
import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // const { data: videos, isLoading, isError, isFetching, refetch, isSuccess, isUninitialized } = useGetVideosQuery();

 /**
 
  const [request, setRequest] = useState(false);
  const {
    data: videos,
    isLoading,
    isError,
  } = useGetVideosQuery(undefined, {
    skip: !request,
  });
  useEffect(() => {
    setRequest(true);
  }, []);

  */

 /**
  *  const { data: videos, isLoading, isError } = useGetVideosQuery(undefined,{
    refetchOnFocus:false,//default
    refetchOnReconnect:true, // default
    refetchOnMountOrArgChange:false,//default, it is used mostly
    pollingInterval:0,// default is 0ms. it is on ms
  });
  */

  // decide what to render
  let content = null;

  if (isLoading)
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );

  if (!isLoading && isError) content = <Error message="There is an error" />;

  if (!isLoading && !isError && !videos?.length)
    content = <Error message="No videos found" />;

  if (!isLoading && !isError && videos?.length) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return content;
}
