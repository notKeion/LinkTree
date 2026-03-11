import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faMobile,
  faFile,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives";
import Image from "next/image";
import Link from "next/link";
import QRCode from "@/components/QRCode";
import ShareButton from "@/components/ShareButton";


export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
  linkedIn: faLinkedin
};

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}

export default async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });

  // Check if the page was not found
  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 px-6">
        <p className="text-2xl font-semibold text-center tracking-tight">
          Page Not Found
        </p>
      </div>
    );
  }

  const user = await User.findOne({ email: page.owner });

  // Optionally, also check if the user was not found
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 px-6">
        <p className="text-2xl font-semibold text-center tracking-tight">
          User Not Found
        </p>
      </div>
    );
  }
  await Event.create({ uri: uri, page: uri, type: "view" });
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50">
      <div
        className="h-40 md:h-48 bg-gray-900 bg-cover bg-center relative overflow-hidden"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-slate-950" />
      </div>
      <div className="relative max-w-md mx-auto -mt-20 mb-8 px-6">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-slate-950/70 backdrop-blur border border-slate-800 shadow-xl shadow-black/40 pt-8 pb-6 px-6">
          <div className="aspect-square w-28 h-28 md:w-32 md:h-32 -mt-14 mb-2">
            <Image
              className="rounded-full w-full h-full object-cover border-4 border-slate-800 shadow-lg shadow-black/40"
              src={user.image}
              alt="avatar"
              width={256}
              height={256}
            />
          </div>
          {/* <div className="aspect-square w-28 h-28 md:w-32 md:h-32 -mt-14 mb-2">
            <QRCode text={process.env.URL + page.uri} colors={{ dark: '#FFFFFF', light: page.bgColor }} />
          </div> */}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center">
            {page.displayName}
          </h2>
          <h3 className="text-sm md:text-base flex gap-2 justify-center items-center text-slate-400">
            <FontAwesomeIcon className="h-4" icon={faLocationDot} />
            <span>{page.location}</span>
          </h3>
          <div className="max-w-xs text-center mt-1 text-sm text-slate-300">
            <p>{page.bio}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-1 mb-6 px-4">
        {Object.keys(page.buttons).map((buttonKey) => (
          <Link
            key={buttonKey}
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
            className="rounded-full bg-slate-900/70 text-slate-100 p-2.5 flex items-center justify-center border border-slate-700/80 hover:bg-slate-800 hover:border-indigo-400/80 transition-colors transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            <FontAwesomeIcon
              className="w-5 h-5"
              icon={buttonsIcons[buttonKey]}
            />
          </Link>
        ))}

          <ShareButton url={process.env.NEXTAUTH_URL + "/" + page.uri} pageName={page.displayName} userImage={user?.image} />
      </div>
      <div className="max-w-2xl mx-auto grid md:grid-cols-1 gap-4 p-4 px-6 md:px-8 pb-12">
        {page.links.map((link) => (
          <Link
            key={link.url}
            target="_blank"
            ping={
              process.env.URL +
              "api/click?url=" +
              btoa(link.url) +
              "&page=" +
              page.uri
            }
            className="group flex items-center gap-3 md:gap-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-400/80 hover:bg-slate-900 transition-colors duration-200 shadow-md shadow-black/40 hover:shadow-xl hover:shadow-indigo-500/25 px-4 py-3 md:px-5 md:py-4"
            href={link.url}
          >
            <div className="relative -left-6 md:-left-8">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-800/80 aspect-square relative flex items-center justify-center rounded-full border-2 border-slate-700/80 group-hover:border-indigo-400/80 group-hover:scale-105 group-hover:-translate-y-0.5 transition-transform duration-150 ease-out overflow-hidden">
                {link.icon && (
                  <Image
                    className="w-full h-full object-cover rounded-full"
                    src={link.icon}
                    alt={"icon"}
                    width={64}
                    height={64}
                  />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={link.isFile ? faFile : faLink} className="w-8 h-8 text-indigo-300" />
                )}

              </div>
            </div>
            <div className="flex items-center shrink grow overflow-hidden">
              <div>
                <h3 className="font-semibold tracking-tight text-slate-50 group-hover:text-indigo-100">
                  {link.title}
                </h3>
                <p className="text-sm text-slate-400 overflow-hidden group-hover:text-slate-300">
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
