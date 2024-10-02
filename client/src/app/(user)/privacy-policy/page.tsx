"use client";
import {useAppSelector} from "@/app/redux/hooks";
import Footer from "@/components/Footer";
import {useRouter} from "next/navigation";
import {IoSearchOutline} from "react-icons/io5";

export default function Home () {
  const user = useAppSelector( ( state: any ) => state.contributor?.currentUser );
  const router = useRouter();

  return (
    <div className="lg:ml-52 ">
      <div className="flex sm:flex-row flex-col lg:w-[90%] m-auto lg:gap-1 sm:gap-8 lg:px-1 sm:px-6 px-4">
        <div className="w-full lg:mr-5">
          <div className="lg:w-[80%] m-auto py-8">
            <div>
              <h1 className="text-4xl">Privacy Policy</h1>
              <div className=" flex flex-col gap-6 text-[#ADADAD] ">
                <p className="mt-2 ">
                  Welcome to BlockTour.org. We are committed to protecting the
                  privacy and security of our users. This Privacy Policy
                  outlines how we collect, use, disclose, and safeguard your
                  information when you visit our website BlockTour.org (the
                  “Site”). Please read this privacy policy carefully. If you do
                  not agree with the terms of this privacy policy, please do not
                  access the site.
                </p>

                <div>
                  <h1 className="text-lg text-white ">
                    1. Information We Collect
                  </h1>
                  <p className="mt-2 ">
                    We may collect personal information that you voluntarily
                    provide to us when registering on the Site, expressing an
                    interest in obtaining information about us or our products
                    and services, participating in activities on the Site, or
                    otherwise contacting us. The personal information that we
                    collect depends on the context of your interactions with us
                    and the Site, the choices you make, and the products and
                    features you use. The personal information we collect can
                    include the following:
                  </p>
                </div>

                <p>
                  <span className="text-white">Personal Data:</span> Personally
                  identifiable information, such as your name, shipping address,
                  email address, and telephone number, and demographic
                  information, such as your age, gender, hometown, and
                  interests, that you voluntarily give to us when you register
                  with the Site or when you choose to participate in various
                  activities related to the Site, such as online chat and
                  message boards.
                </p>

                <p>
                  <span className="text-white"> Derivative Data: </span>
                  Information our servers automatically collect when you access
                  the Site, such as your IP address, your browser type, your
                  operating system, your access times, and the pages you have
                  viewed directly before and after accessing the Site.
                </p>

                <div>
                  <h1 className="text-lg text-white">
                    2. Use of Your Information
                  </h1>
                  <p className="mt-1">
                    Having accurate information about you permits us to provide
                    you with a smooth, efficient, and customized experience.
                    Specifically, we may use information collected about you via
                    the Site to:
                  </p>
                  <div className="mt-2 ml-2">
                    <li>Create and manage your account.</li>
                    <li>
                      Deliver targeted advertising, newsletters, and other
                      information regarding promotions and the Site to you.
                    </li>
                    <li>Email you regarding your account or order.</li>
                    <li>
                      Fulfill and manage purchases, orders, payments, and other
                      transactions related to the Site.
                    </li>
                    <li>
                      Generate a personal profile about you to make future
                      visits to the Site more personalized.
                    </li>
                    <li>Increase the efficiency and operation of the Site.</li>
                    <li>
                      Monitor and analyze usage and trends to improve your
                      experience with the Site.
                    </li>
                    <li>
                      Offer new products, services, and/or recommendations to
                      you.
                    </li>
                    <li>Perform other business activities as needed.</li>
                  </div>
                </div>

                <div>
                  <h1 className="text-white">
                    3. Disclosure of Your Information
                  </h1>
                  <p className="mt-1">
                    We may share information we have collected about you in
                    certain situations. Your information may be disclosed as
                    follows:
                  </p>
                </div>

                <p>
                  <span className="text-white">
                    By Law or to Protect Rights:{" "}
                  </span>{" "}
                  If we believe the release of information about you is
                  necessary to respond to legal process, to investigate or
                  remedy potential violations of our policies, or to protect the
                  rights, property, and safety of others, we may share your
                  information as permitted or required by any applicable law,
                  rule, or regulation.
                </p>

                <p>
                  <span className="text-white">
                    Third-Party Service Providers:{" "}
                  </span>{" "}
                  We may share your information with third parties that perform
                  services for us or on our behalf, including payment
                  processing, data analysis, email delivery, hosting services,
                  customer service, and marketing assistance.
                </p>

                <div>
                  <h1 className="text-lg text-white">
                    4. Cookies and Web Beacons
                  </h1>
                  <p className="mt-1">
                    We may use cookies,web beacons, tracking pixels,and other
                    tracking technologies on the Site to help customize the Site
                    and improve your experience.When you access the Site, your
                    personal information is not collected through the use of
                    tracking technology.Most browsers are set to accept cookies
                    by default. You can remove or reject cookies, but be aware
                    that such action could affect the availability and
                    functionality of Site.
                  </p>
                </div>

                <div>
                  <h1 className="text-lg text-white">
                    5. Security of Your Information
                  </h1>
                  <p className="mt-1">
                    We use administrative, technical, and physical security
                    measures to help protect your personal information. While we
                    have taken reasonable steps to secure the personal
                    information you provide to us, please be aware that despite
                    our efforts, no security measures are perfect or
                    impenetrable, and no method of data transmission can be
                    guaranteed against any interception or other type of misuse.
                    Any information disclosed online is vulnerable to
                    interception and misuse by unauthorized parties. Therefore,
                    we cannot guarantee complete security if you provide
                    personal information.
                  </p>
                </div>

                <div>
                  <h1 className="text-lg text-white">6. Policy for Children</h1>
                  <p className="mt-1">
                    We do not knowingly solicit information from or market to
                    children under the age of 13. If you become aware of any
                    data we have collected from children under age 13, please
                    contact us using the contact information provided below.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[35%] sm:w-[50%] lg:pl-8 mt-4 sm:block hidden">
          <div className="relative border border-[#28272D] rounded flex justify-between">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#0A090F] text-[#7B7A7F] lg:w-80 sm:w-full w-40 px-4 py-2 rounded border-none focus:outline-none"
            />
            <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>
          {!user ? (
            <div className="  flex items-center justify-between   py-6">
              <button className="py-3.5 lg:px-12 px-4 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg">
                Join for free
              </button>
              <p className="text-lg hover:underline">Sign In</p>
            </div>
          ) : (
            <div className="  flex items-center justify-end gap-8 py-6 cursor-pointer" onClick={() => router.push( "/view-profile" )}>
              <p className="text-lg font-semibold">{user?.name}</p>
              <img src={user?.profileImage} alt="" className="w-10 h-10 rounded-full" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
