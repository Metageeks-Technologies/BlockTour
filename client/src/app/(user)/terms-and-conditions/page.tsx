"use client";
import {useAppSelector} from "@/app/redux/hooks";
import Footer from "@/components/Footer";
import {useRouter} from "next/navigation";
import {IoSearchOutline} from "react-icons/io5";

export default function Home () {
  const user = useAppSelector( ( state: any ) => state.contributor?.currentUser );
  const router = useRouter();
  return (
    <div className=" lg:ml-52">
      <div className=" flex w-[90%] m-auto ">

        <div className="w-full lg:mr-5">

          <div className="w-[80%] m-auto py-8">
            <h1 className="text-4xl mt-2">Terms and Conditions</h1>

            <div className=" flex flex-col gap-6 text-[#ADADAD] ">
              <div className="mt-2">
                <h1 className="text-white text-lg">Welcome to blocktour.org!</h1>
                <p className="mt-1">
                  These terms and conditions outline the rules and regulations for
                  the use of bloktour’s Website, located at
                  https://blocktour.org/. By accessing this website we assume you
                  accept these terms and conditions. Do not continue to use
                  blocktour.org if you do not agree to take all of the terms and
                  conditions stated on this page.
                </p>
              </div>

              <p>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                “Client”, “You” and “Your” refers to you, the person log on this
                website and compliant to the Company’s terms and conditions. “The
                Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our
                Company. “Party”, “Parties”, or “Us”, refers to both the Client
                and ourselves. All terms refer to the offer, acceptance and
                consideration of payment necessary to undertake the process of our
                assistance to the Client in the most appropriate manner for the
                express purpose of meeting the Client’s needs in respect of
                provision of the Company’s stated services, in accordance with and
                subject to, prevailing law of in. Any use of the above terminology
                or other words in the singular, plural, capitalization and/or
                he/she or they, are taken as interchangeable and therefore as
                referring to same.
              </p>

              <div>
                <h1 className="text-lg text-white ">Cookies</h1>
                <p className="mt-1">
                  We employ the use of cookies. By accessing blocktour.org, you
                  agreed to use cookies in agreement with the bloktour’s Privacy
                  Policy. Most interactive websites use cookies to let us retrieve
                  the user’s details for each visit. Cookies are used by our
                  website to enable the functionality of certain areas to make it
                  easier for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.
                </p>
              </div>

              <div>
                <h1 className="text-lg text-white ">License</h1>
                <p className="mt-1">
                  Unless otherwise stated, bloktour and/or its licensors own the
                  intellectual property rights for all material on blocktour.org.
                  All intellectual property rights are reserved. You may access
                  this from blocktour.org for your own personal use subjected to
                  restrictions set in these terms and conditions.
                </p>
              </div>

              <div>
                <h1 className="text-lg text-white">You must not:</h1>
                <div className="mt-2 ml-2">
                  <li>Republish material from blocktour.org</li>
                  <li>Sell, rent or sub-license material from blocktour.org</li>
                  <li>
                    Reproduce, duplicate or copy material from blocktour.org
                  </li>
                  <li>Redistribute content from blocktour.org</li>
                </div>
                <p className="mt-2">
                  Parts of this website offer an opportunity for users to post and
                  exchange opinions and information in certain areas of the
                  website. bloktour does not filter, edit, publish or review
                  Comments prior to their presence on the website. Comments do not
                  reflect the views and opinions of bloktour,its agents and/or
                  affiliates. Comments reflect the views and opinions of the
                  person who post their views and opinions. To the extent
                  permitted by applicable laws, bloktour shall not be liable for
                  the Comments or for any liability, damages or expenses caused
                  and/or suffered as a result of any use of and/or posting of
                  and/or appearance of the Comments on this website.
                </p>
              </div>

              <p>
                bloktour reserves the right to monitor all Comments and to remove
                any Comments which can be considered inappropriate, offensive or
                causes breach of these Terms and Conditions.
              </p>

              <div>
                <h1 className="text-lg text-white">
                  You warrant and represent that:
                </h1>
                <div className="mt-2 ml-2">
                  <li>
                    You are entitled to post the Comments on our website and have
                    all necessary licenses and consents to do so;
                  </li>
                  <li>
                    The Comments do not invade any intellectual property right,
                    including without limitation copyright, patent or trademark of
                    any third party;
                  </li>
                  <li>
                    The Comments do not contain any defamatory, libelous,
                    offensive, indecent or otherwise unlawful material which is an
                    invasion of privacy
                  </li>
                  <li>
                    The Comments will not be used to solicit or promote business
                    or custom or present commercial activities or unlawful
                    activity.
                  </li>
                </div>
                <p className="mt-4">
                  You hereby grant bloktour a non-exclusive license to use,
                  reproduce, edit and authorize others to use, reproduce and edit
                  any of your Comments in any and all forms, formats or media.
                </p>
              </div>

              <div>
                <h1 className="text-lg text-white">
                  Hyperlinking to our Content
                </h1>
                <p className="mt-2">
                  The following organizations may link to our Website without
                  prior written approval:
                </p>
                <div className="mt-2 ml-2">
                  <li>Government agencies;</li>
                  <li>Search engines;</li>
                  <li>News organizations;</li>
                  <li>
                    Online directory distributors may link to our Website in the
                    same manner as they hyperlink to the Websites of other listed
                    businesses; and
                  </li>
                  <li>
                    System wide Accredited Businesses except soliciting non-profit
                    organizations, charity shopping malls, and charity fundraising
                    groups which may not
                  </li>
                </div>
                <p className="mt-5">
                  We will approve link requests from these organizations if we
                  decide that: (a) the link would not make us look unfavorably to
                  ourselves or to our accredited businesses; (b) the organization
                  does not have any negative records with us; (c) the benefit to
                  us from the visibility of the hyperlink compensates the absence
                  of bloktour; and (d) the link is in the context of general
                  resource information.
                </p>
              </div>

              <p>
                These organizations may link to our home page so long as the link:
                (a) is not in any way deceptive; (b) does not falsely imply
                sponsorship, endorsement or approval of the linking party and its
                products or services; and (c) fits within the context of the
                linking party’s site.
              </p>

              <p>
                If you are one of the organizations listed in paragraph 2 above
                and are interested in linking to our website, you must inform us
                by sending an e-mail to bloktour. Please include your name, your
                organization name, contact information as well as the URL of your
                site, a list of any URLs from which you intend to link to our
                Website, and a list of the URLs on our site to which you would
                like to link. Wait 2-3 weeks for a response.
              </p>

              <div className="mt-2 ml-2">
                <p>
                  Approved organizations may hyperlink to our Website as follows:
                </p>
                <div className="mt-5">
                  <li>Government agencies;</li>
                  <li>Search engines;</li>
                  <li>News organizations;</li>
                  <li>
                    Online directory distributors may link to our Website in the
                    same manner as they hyperlink to the Websites of other listed
                    businesses; and
                  </li>
                  <li>
                    System wide Accredited Businesses except soliciting non-profit
                    organizations, charity shopping malls, and charity fundraising
                    groups which may not
                  </li>
                </div>
              </div>

              <div>
                <h1 className="text-lg text-white ">iFrames</h1>
                <p className="mt-1">
                  Without prior approval and written permission, you may not
                  create frames around our Webpages that alter in any way the
                  visual presentation or appearance of our Website.
                </p>
              </div>

              <div>
                <h1 className="text-lg text-white ">Content Liability</h1>
                <p className="mt-1">
                  We shall not be hold responsible for any content that appears on
                  your Website. You agree to protect and defend us against all
                  claims that is rising on your Website. No link(s) should appear
                  on any Website that may be interpreted as libelous, obscene or
                  criminal, or which infringes, otherwise violates, or advocates
                  the infringement or other violation of, any third party rights.
                </p>
              </div>

              <div>
                <h1 className="text-lg text-white ">Reservation of Rights</h1>
                <p className="mt-1">
                  We reserve the right to request that you remove all links or any
                  particular link to our Website. You approve to immediately
                  remove all links to our Website upon request. We also reserve
                  the right to amen these terms and conditions and it’s linking
                  policy at any time. By continuously linking to our Website, you
                  agree to be bound to and follow these linking terms and
                  conditions.
                </p>
              </div>

              <div>
                <h1 className="text-lg text-white ">
                  Removal of links from our website
                </h1>
                <p className="mt-1">
                  If you find any link on our Website that is offensive for any
                  reason, you are free to contact and inform us any moment. We
                  will consider requests to remove links but we are not obligated
                  to or so or to respond to you directly.
                </p>
              </div>

              <p>
                We do not ensure that the information on this website is correct,
                we do not warrant its completeness or accuracy; nor do we promise
                to ensure that the website remains available or that the material
                on the website is kept up to date.
              </p>

              <div>
                <h1 className="text-lg text-white ">Disclaimer</h1>
                <p className="mt-1">
                  To the maximum extent permitted by applicable law, we exclude
                  all representations, warranties and conditions relating to our
                  website and the use of this website. Nothing in this disclaimer
                  will:
                </p>

                <div className="mt-4 ml-2">
                  <li>
                    limit or exclude our or your liability for death or personal
                    injury;
                  </li>
                  <li>
                    limit or exclude our or your liability for fraud or fraudulent
                    misrepresentation;
                  </li>
                  <li>
                    limit any of our or your liabilities in any way that is not
                    permitted under applicable law; or
                  </li>
                  <li>
                    exclude any of our or your liabilities that may not be
                    excluded under applicable law..
                  </li>
                </div>
              </div>

              <p>
                The limitations and prohibitions of liability set in this Section
                and elsewhere in this disclaimer: (a) are subject to the preceding
                paragraph; and (b) govern all liabilities arising under the
                disclaimer, including liabilities arising in contract, in tort and
                for breach of statutory duty.
              </p>

              <p>
                As long as the website and the information and services on the
                website are provided free of charge, we will not be liable for any
                loss or damage of any nature.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[35%] lg:pl-8 mt-4 ">
          <div className="relative border border-[#28272D] rounded flex justify-between">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#0A090F] text-[#7B7A7F] sm:w-80 w-40 px-4 py-2 rounded border-none focus:outline-none"
            />
            <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>
          {!user ? (
            <div className="  flex items-center justify-between   py-6">
              <button className="py-3.5 px-12 bg-[#DF841C] hover:bg-[#1C1C1D] rounded-lg">
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
