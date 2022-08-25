import Navbar from "../components/navbar";
import Foto from "./foto/foto";
import Video from "./video/video";

export default function Berita() {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Foto />
        <Video/>
      </div>
    </>
  );
}
