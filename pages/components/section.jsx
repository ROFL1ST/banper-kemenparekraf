export default function Section({ text, color }) {
  return (
    <>
      <div className="text-center text-blue-900 capitalize text-2xl font-bold">
        {text}
      </div>
      <div
        className={`flex mx-auto my-3 h-0.5 w-44 ${
          color === undefined ? "bg-yellow-400" : color
        }`}
      ></div>
    </>
  );
}
