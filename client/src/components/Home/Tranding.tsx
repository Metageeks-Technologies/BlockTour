import {useAppSelector} from "@/app/redux/hooks";
import React from "react";
type CardData = {
  id: number;
  imgSrc: string;
  title: string;
  category: string;
  date: string;
  description: string;
};

const cardData: CardData[] = [
  {
    id: 1,  
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/005f/4736/6495135ba9397ac4a60079d072ea26c5?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GUKMONuuHSE7ZI3pH~pSbVNwfeoRLSf2s-FVRIlxF8tqHnpA-DAIWDNCyTptSwdjsiqEkyt-~mECz7ybBDxRhqhY2MRFy4awwSufxSPb1LK94KuFC4ZR2uzUIlsVX0YYaEHRfruFVzJectt0lQf3ejgdU3pqJhUr3wnlXcvu5CxkBmD1x9gFrITNb1Y~FgTNMQIJGJ9fjB134snW6u34LMf8IHG5E6i-B6RzdfYzY4Rp1gz3mzcKrOkLpp2EHNoDZZ9pA9fCCuNDiRdQrfJyw3hzW5lLL9xilhSfBg7DgTUPo5hwVNHA47tL-wgzywli0hkyKEa7xUvD3rxL5B-tuw__",
    title:
      "Is Crypto on the Brink of a Bull Market or Bear Market? Utilizing Consensus 2024 as a Gauge",
    category: "Crypto",
    date: "May 29, 2024",
    description:
      "Consensus 2024: Market Sentiment in Question Bitcoin ETFs Lead to Market Speculation At Consensus 2024, the prevailing question on everyone's…",
  },
  {
    id: 1,
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/c57b/e6aa/5741ee0e5a86f1971e61e2b66d13c10e?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aKyxpeeapwncPJFj9oeay16LiCx8GOjSqWQO1LCXTR-X4zvdgpJX8OjGeFuDCV6R9Irw7UproeYHuCFZ9SSSG0OoVGImKp8wG6~mf8kcPRmnnxD4VFxwIBe052Boo8dxv685l5ODZG6P20kZDY9sfPiKOUKF8BGd656quzUb-lIznHri4CpOVFH--63k3kpE5QFaL5Gai2YZKDI~O1Ug2f9RSI7c04Fny1V80XsJs5YrjNbMmz1png-EONiwJAwv489EFmRx64pZtByGFgjkLS~pNpaCuePqQtZPz4Cv7Sx27SPdZVgYmCgsjKVHV6YRF0zvtg0cZrUcQ-Glr5EpFw__",
    title: "College Campus Protests Exploited by Russian Influence Campaign",
    category: "NFT",
    date: "May 17, 2024",
    description:
      "Covert Doppelganger Campaign Echoes Russian Narratives The covert Doppelganger campaign, believed to be originating from Russia, has been spreading disinformation around the ongoing campus protests in the United States...",
  },
  {
    id: 1,
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/0496/07ff/6e0f7abc0558dc5948fdb1910f880f9e?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UTaGqrTDAApO6PaCq5DP9uiCHalkOUXzX~AnSEl18KavaKOXelA5ZHn5dTn9THJw0d-WqqblPuBJFbXWRrxh-jPMCQx1G7NCy54S1nI0E4~XeBluWaCuE5B1x3UWo6Y5oYJVuixv2sBE3vMCVDhqlpIXYjG7DWuf6KDHTu0TO70f9mmtzjqxIJLWKQzasA4DpF231wBTKRwJQwsdOHtfnJ3kahSRgcuOQpru7OymGC6uS6tEiSfHSa0taRoWHEamjdAt8jCfRhLQX6GYWW86l450oJp7NwZ68dou1JRH6uVQeo47iB6AAMDxthgjr71NY35QbY70NsPXRc5W7bZweg__",
    title: "Coinbase Veterans Raise $21M For NPC Labs Gaming Startup ",
    category: "Blockchain",
    date: "july 29, 2024",
    description:
      "Covert Doppelganger Campaign Echoes Russian Narratives The covert Doppelganger campaign, believed to be originating from Russia, has been spreading disinformation around the ongoing campus protests in the United States...",
  },
  {
    id: 1,
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/2505/edd4/ccae0c6963d23eebf918276146b8c765?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bxZ3uN~Vnpb-Gpavg1Zq9YAlWeCAEL4Oc8fADS4D3B--1x31lIgUXVuXbFW~fctA1F6mpybS6JPSukoTewe6GRPPECWsPrpsGA9broNQMsnwa-49AsjBnQeHfFJtyBz~nwDvKcOOwgrzjn5vlCcIs~JzQsNZRJ3r3oO48LTEPs99en1IfOH~s59boqF1GTTJxkmQWuZoMGoxBYSjcgqFtyAISDMyz6RhgWhpprVbEtgPWwDjWowuvX5iJuAVsLb929ax8-XZ3zIA~xJ9LV~MH7kMZDRQNgj80V3tpUMcAbH~YsyPC6nVdmZD6ggR~VjzBlZiv995OEKH~pBxFZh36w__",
    title:
      "The changing role of Ethereum faucets within an expanding blockchain environment",
    category: "Crypto",
    date: "May 29, 2024",
    description:
      "Ethereum faucets have been an integral part of the Ethereum network since its inception, providing beginners with a small amount of Ether for free...",
  },
];

const Trending = () => {
  const posts = useAppSelector( ( state: any ) => state.post.posts )
  const publishedPosts = posts.filter( ( post: any ) => post.status.toLowerCase() === "published" ).reverse().slice( 0, 4 ); 

  return (
    <div className="flex lg:flex-row md:flex-row flex-col gap-5  ">
      <div className="flex flex-col gap-y-10 lg:w-[69%] md:w-[60%]">
        {publishedPosts.map((card:any) => (
          <div key={card._id} className="flex lg:flex-row md:flex-col flex-col gap-8 w-full" >
            <img
              loading="lazy"
              srcSet={card.previewImageUrl}
              className="h-56 lg:w-80 md:w-full object-cover"
              alt={card.title}
            />

            <div>
              <h1 className="text-2xl text-white font-semibold">
                {card?.title}
              </h1>
              <div className="mt-1 flex gap-3 items-center">
                <button className="bg-[#DF841C] py-0.5 px-3">
                  {card?.category.join(", ")}
                </button>
                <p className="text-sm text-neutral-400">{card?.date}</p>
              </div>
              {/* <p className="text-neutral-400 mt-5 ">{card?.description}</p> */}
              <div className="text-neutral-400 mt-5 line-clamp-6" dangerouslySetInnerHTML={{__html: card?.description}} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col ml-5 lg:w-[31%]  md:w-[40%]  max-md:ml-0 max-md:w-full">
        <div className="flex flex-col w-full max-md:mt-10 ">
          <div className="flex gap-5 justify-between  max-w-full text-sm font-medium leading-3 whitespace-nowrap rounded   text-neutral-400 w-[344px]">
            {/* <div className="my-auto">Search</div> */}
            <input
              className="w-full bg-black py-2.5 border border-neutral-700 rounded px-2 "
              type="text"
              placeholder="Search"
            />
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f439eeadc013a05c688f7fdad970586d9debabf3b7fc7ed520e45904d3d33836?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
              className="object-contain shrink-0 rounded-none aspect-[0.96] w-[43px]"
            /> */}
          </div>
          <div className="lg:h-72 md:h-60 h-72 w-full mt-10 bg-[#604C4C] flex justify-center items-center">
            <h1 className="text-white text-xl">Advertisement</h1>
          </div>

          <div className="flex gap-5 mt-12 max-md:mt-10 ">
            <div className="flex flex-col grow shrink-0 items-start max-w-full text-sm font-medium leading-5 basis-0 text-zinc-300 w-fit">
              <div className="flex items-center gap-3 text-2xl leading-none whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c364e963ecf4f9b9435046d8cb1e86ecee84bb3fae94bbdc414cfe8d18edfd3c?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 aspect-square w-[34px]"
                />
                <div>Crypto</div>
              </div>

              <div className="flex gap-5 mt-5 justify-between items-center">
                <div>
                  <p className="text-sm text-white ">
                    Crypto Company Genesis, Despite Failure, Given Permission...
                  </p>
                  <p className="text-neutral-400 mt-3">September 29, 2019</p>
                </div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/1d2b/2694/c29be394869f2aec5cc549653971251c?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EmHxg0UtiQyDAf8XR-iKQxuIpWRVs8iAMQti1hltFxFDMDS3WPrw22FEMauzx7aUUz51zE03xhqzyppmah4qxmaysO~QPhrmu5eqp5gM605mGdvOInUIhxLJQuXxZVLZSv3ECxFJejCEupSGsuD2U~FjiwefrxUqi-EckEaa3U3dr~bnB-HhuG9HllDUiC~WKI-Pi6PK8Imdv0SQl3OA55QjiiQQX91EUrfio5DkN2SWf0Sk02AtwPV3ywRJRWdcvQ8Gt8xhs1GIYn2D7X1BRasdcXAUuAdxBiN3uH5s9sn6TIuQrq33kNZ296V3FWyDSfQ5vkD20H-CieVe5la~XQ__"
                  alt=""
                  className="w-20 h-20 object-cover"
                />
              </div>

              <div className="flex gap-5  mt-8 justify-between items-center">
                <div>
                  <p className="text-sm text-white ">
                    International money transfers hit $613 billion this year...
                  </p>
                  <p className="text-neutral-400 mt-3">September 29, 2019</p>
                </div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/5211/93ed/58b7ea8bb9822317ffb8cff4fdbc5a9f?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EI5rRnGBWSlto3n5XkL7CzQKroX2YDUVVnh5kZOpQSxlUaxvzA~ePyZ2q8s2oUsVE7n8BOchfOv9iZzCpoM7X9bdavGyg~En25d4kdwQo5Hnb5OATFsofA223MDoHbkfEzhTVD1ccV70cZcfQk4SNi6m8o7RofGhDri8JZS4NEDdXhVcR6RlkRRCxOBgWaDABn92AbcaCEi2mrJ2J5s~MA1ZU3d9bM7HUOoxuCwOouifkArAejvqE5qBxYfHHGzAYH5LmHRTMkDGNHkIXXDgcbq1nbSAFflYy4Gf1KAY6eJc8HdNKJM8ni8SUTPSGJmJHMxA9UZjcH-88EqVsqseSA__"
                  alt=""
                  className="w-20 h-20 object-cover"
                />
              </div>

              <div className="flex gap-2.5 mt-14 text-2xl leading-none whitespace-nowrap text-neutral-400 max-md:mt-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbad551b5d1e5f98b3e806a182129342acdfbf5eb25799461069eb4eabd2b47?placeholderIfAbsent=true&apiKey=edd8c588fa7b4e2c93b6125029a35184"
                  className="object-contain shrink-0 w-9 aspect-[1.29]"
                />
                <div className="my-auto">Web3</div>
              </div>

              <div className="flex gap-5 mt-5 justify-between items-center">
                <div>
                  <p className="text-sm text-white ">
                    NYDFS Releases Updated for Consumer Complaints...
                  </p>
                  <p className="text-neutral-400 mt-3">September 29, 2019</p>
                </div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/e9ee/77e6/ad6a735f4c07ed449247fe043319fb17?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AKhYMZe3BzxnWRsDsMuMaDB5FgObEHQqVml4xAdoqKj9sX8Du3pl1Ow03w4x6ZHKl2cLcEAheBnUIFpBrCkmvQV6pRb271L~fxEB8jIhqjs2fwcRKTxhSBJar2pQO~VcjUio-X2O4ZaPivWm4PXfKrFpVKiIqnbFQpeTKWmNWijosKAYFn1BbMLWMSaJjrnxUvnicm0bfU7f2tOfpe~PiWxZtv--96u9BthxsPh4kWgnEm1mq25kYQTUKOhWt7mFZX4USBut8VAni~JukkmYOl-6yE3ArBIkoL6T0yxL2VWt-fOhCSMVpK~IGMix4OyZcR9D0BtWqjvt-HarJMDItA__"
                  alt=""
                  className="w-20 h-20 object-cover"
                />
              </div>

              <div className="flex gap-5  mt-8 justify-between items-center">
                <div>
                  <p className="text-sm text-white ">
                    Trump could hit France with more tariffs in battle over
                    taxes on big tech
                  </p>
                  <p className="text-neutral-400 mt-3">September 29, 2019</p>
                </div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/16e6/7e49/b239deb21d07c55b49e3a78ff6f1c2a0?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=at0n4Wnb-F21bj0lBeJtmTBw5CioAjLUAuvx5EtYEaBcgs6l77DmOCnocS2G2hZRjiVQs7rQsJAhMChVhRrjrGBtcoKM9XGQv0kH7KVTIPi5ZtIEOTCDdwcN7lcFNMBJEYlXrMT7wbv31-dmp5ooLMguinNJ7SlNY2mmgtVZOXQTvfCEarqxBfq7iEEXxzu8yIzDWtoFz1mKIE~od9C4iqEawXgiIy-R5HBBeoaJ6b4jTvpfnOiroudFd-WIPq0CTrJcdzzuHV1K3O2ahY5bdZ52CnKqAgFoLATmM5nkzWLjs5m4HE13wE1RB0ZPgifLghU3xM8kYo3FqUDI8CxhtA__"
                  alt=""
                  className="w-20 h-20 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Trending;
