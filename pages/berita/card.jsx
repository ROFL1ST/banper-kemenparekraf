/* eslint-disable @next/next/no-img-element */
const MAX_LENGTH = 95;

export default function Card({ data }) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <>
      <div className="bg-gray-100 w-full h-80 rounded-2xl">
        <div
          className="w-full h-1/2 bg-cover rounded-t-2xl bg-center"
          style={{
            backgroundImage: `url(${data.urlToImage})`,
          }}
        ></div>
        <div className="px-5 py-1">
          <small className="text-xs font-bold text-gray-500">
            {formatter.format(Date.parse(data.publishedAt))}
          </small>
          {data.title.length > MAX_LENGTH ? (
            <h3 className="my-3 font-bold capitalize text-ellipsis">
              {`${data.title.substring(0, MAX_LENGTH)}    ....`}
              <a href="" className="text-blue-600">
                Read more
              </a>
            </h3>
          ) : (
            <h3 className="my-3 font-bold capitalize text-ellipsis">
              {data.title}
            </h3>
          )}
          <small className="text-xs font-bold text-blue-900">
            Kota Makassar
          </small>
        </div>
      </div>
    </>
  );
}
