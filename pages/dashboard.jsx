import Navbar from "./components/navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div
        className="pt-24 w-full h-screen bg-cover"
        style={{ backgroundImage: "url(assets/building.png)" }}
      ></div>
    </>
  );
}
