import React from "react";
import Card from "../card";
import News_small_card from "./News_small_card";

export default function DetailPage() {
  const [items, setItem] = React.useState([]);

  const getData = async () => {
    const url =
      "https://newsapi.org/v2/top-headlines?country=id&apiKey=7297761692414b5388644c4a35899ab3";
    try {
      let respond = await axios.get(url);
      console.log(respond.data.articles);
      setItem(respond.data.articles);
    } catch (error) {}
  };
  React.useEffect(() => {
    document.title = "Detail";
    const ac = new AbortController();
    getData();

    return () => {
      ac.abort();
    };
  });
  console.log(items);
  const [more, setMore] = React.useState(false);

  return (
    <>
      <div className=" items-center flex h-full flex-col pb-10">
        {/* Banner */}
        <div
          className="flex w-2/3 h-full px-10 py-10 bg-no-repeat bg-cover justify-center rounded-3xl"
          style={{
            backgroundImage:
              "url(https://akcdn.detik.net.id/visual/2019/05/08/6824f661-c2d9-4b41-a61b-ae80e9f8d62c_169.jpeg?w=1050)",
          }}
        >
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left pt-64 text-white">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium ">
              Banper Infrastruktur Ekraf
            </h1>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
              vero.
              <br /> Rem consequuntur hic corporis cumque accusantium quos
              asperiores blanditiis voluptas, <br />
              minima aut et autem commodi dolorem quidem quam iste. Ipsa.
            </p>
          </div>
        </div>
        {/* Banner */}
        {/* Content */}
        <div className="relative pt-16 w-2/3 flex justify-between ">
          <div className="content-left w-11/12 flex flex-col">
            {/* detail text */}
            <div className="w-11/12 text-lg pb-10">
              <h1 className="">
                <span className="capitalize font-bold">
                  Maros, 23 November 2021
                </span>{" "}
                - Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Libero, maxime consequuntur tenetur dolorum, aliquam molestias
                facilis voluptate possimus eligendi commodi ipsam laudantium
                accusamus dolor similique recusandae aliquid nihil, qui veniam
                aperiam vitae veritatis voluptatibus magni? Culpa repellendus
                possimus dicta eveniet, voluptate exercitationem. Doloremque
                aspernatur eveniet porro repellat. Fugit corrupti molestiae
                libero minima laudantium aliquid quisquam, mollitia saepe.
                Deleniti ad fugiat possimus libero voluptate eos voluptatibus,
                officiis placeat, aut commodi eum non accusantium nobis fuga. At
                deserunt vitae quo incidunt, recusandae doloribus ea tenetur
                totam nam fugiat quibusdam laudantium blanditiis, quasi
                accusamus cum sapiente voluptatem sit reiciendis iusto delectus
                hic dolore.
              </h1>
              <h1 className="pt-14">Why Do We Use It?</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Architecto sed porro dicta sunt veniam officiis eius, voluptatum
                nam incidunt distinctio illo asperiores, tenetur sint facere
                labore qui necessitatibus repellendus velit ipsa accusantium
                assumenda minus! Tempora odio vero dolor, eum laboriosam soluta
                incidunt quibusdam accusantium quos delectus iusto molestias hic
                neque.
              </p>
              <img
                className="mt-12 rounded-3xl"
                src="https://akcdn.detik.net.id/visual/2019/05/08/6824f661-c2d9-4b41-a61b-ae80e9f8d62c_169.jpeg?w=1050"
                alt=""
              />
              <h1 className="pt-14">Why Do We Use It?</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Architecto sed porro dicta sunt veniam officiis eius, voluptatum
                nam incidunt distinctio illo asperiores, tenetur sint facere
                labore qui necessitatibus repellendus velit ipsa accusantium
                assumenda minus! Tempora odio vero dolor, eum laboriosam soluta
                incidunt quibusdam accusantium quos delectus iusto molestias hic
                neque.
              </p>
            </div>
            {/* detail text */}
          </div>
          <div className="content-right w-1/4 flex flex-col ">
            <div className="space-y-5">
              {items?.slice(0, 3).map((data, index) => (
                <News_small_card data={data} key={index}></News_small_card>
              ))}
            </div>
          </div>
        </div>
        {/* Content */}
        {/* bottom content */}
        <div className="flex flex-col justify-center pt-20 items-center mx-auto w-11/12">
          <h1 className="font-bold text-blue-900 text-3xl underline underline-offset-8 decoration-yellow-500">
            Berita Terkait
          </h1>
          {more === false ? (
            <>
              <div className="pt-16  grid grid-cols-4 lg:gap-x-1 gap-x-4 pb-16">
                {" "}
                {items?.slice(0, 4).map((data, index) => (
                  <Card data={data} key={index}></Card>
                ))}
              </div>
              <div
                onClick={() => {
                  if (items.length < 9) {
                    alert("Content is max");
                  } else {
                    setMore(true);
                    return;
                  }
                }}
              >
                {" "}
                <h1 className="flex justify-center items-center text-blue-900 underline  cursor-pointer">
                  More
                </h1>
              </div>
            </>
          ) : (
            <>
              <div className="pt-16 grid grid-cols-4 lg:gap-x-1 gap-x-4 gap-y-5 pb-16">
                {" "}
                {items?.map((data, index) => (
                  <Card data={data} key={index}></Card>
                ))}
              </div>
              <h1
                className="flex justify-center items-center cursor-pointer text-blue-900 underline "
                onClick={() => {
                  setMore(false);
                }}
              >
                Less
              </h1>
            </>
          )}
        </div>
        {/* bottom content */}
      </div>
    </>
  );
}
