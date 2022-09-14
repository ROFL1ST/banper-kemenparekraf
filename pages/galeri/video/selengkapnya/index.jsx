import axios from "axios";
import React from "react";
import { getGaleri } from "../../../api/restApi";
import Footer from "../../../components/footer";
import Modal from "../../../components/modal";
import Navbar from "../../../components/navbar";
import CardVideo from "../cardVideo";
import Loading from "../loading";

export default function Selengkapnya() {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  const [videoData, setVideoData] = React.useState({ data: {}, loading: true });
  async function getVideo() {
    try {
      await getGaleri("video?offset=0&limit=10").then((result) => {
        setVideoData((s) => ({ ...s, data: result.data.data, loading: false }));
      });
    } catch (error) {
      console.log(error);
      setVideoData((s) => ({ ...s, loading: true }));
    }
  }
  // console.log(videoData.data);

  React.useEffect(() => {
    const ac = new AbortController();
    getVideo();

    return () => {
      ac.abort();
    };
  }, []);
  const { data, loading } = videoData;
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />

      <div className="pt-24 lg:px-20 px-8">
        <div className="grid xl:grid-cols-3 mb-10 gap-4  mt-10">
          {data && !loading ? (
            videoData.data.map((i, key) => <CardVideo key={key} data={i} />)
          ) : (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
        </div>
      </div>
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      ></Modal>
    </>
  );
}
