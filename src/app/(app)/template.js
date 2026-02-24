import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppSidebar from "@/components/layout/AppSidebar";
import { Page } from "@/models/Page";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function AppTemplate({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session.user.email });
  return (
    <>
      <Toaster />
      <main className="md:flex min-h-screen max-w-6xl mx-auto px-4 py-6 gap-6">
        <label
          htmlFor="navCb"
          className="md:hidden mb-4 p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-lg shadow-black/40 inline-flex items-center gap-2 cursor-pointer text-slate-200 hover:bg-slate-800 hover:border-indigo-500/70 transition-colors"
        >
          <FontAwesomeIcon icon={faBars} />
          <span className="text-sm font-medium">Menu</span>
        </label>
        <input id="navCb" type="checkbox" className="hidden peer" />
        <label
          htmlFor="navCb"
          className="fixed inset-0 bg-black/70 z-10 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto md:hidden transition-opacity"
        ></label>
        <aside className="bg-slate-950/90 border-r border-slate-800 w-60 p-5 pt-8 shadow-2xl shadow-black/60 fixed md:static -left-72 top-0 bottom-0 z-20 transition-all duration-200 peer-checked:left-0">
          <div className="sticky top-4">
            <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto border-4 border-slate-800 shadow-lg shadow-black/60">
              <Image
                src={session.user.image}
                width={256}
                height={256}
                alt={"avatar"}
                className="w-full h-full object-cover"
              />
            </div>
            {page && (
              <Link
                target="_blank"
                href={"/" + page.uri}
                className="text-center mt-4 flex gap-1 items-center justify-center text-sm text-slate-300 hover:text-indigo-300 transition-colors"
              >
                <Image
                  src={"/assets/logo.webp"}
                  alt="logo"
                  height={28}
                  width={28}
                />
                <span className="text-lg text-slate-500">/</span>
                <span className="underline-offset-2 hover:underline">{page.uri}</span>
              </Link>
            )}
            <div className="text-center mt-6">
              <AppSidebar />
            </div>
          </div>
        </aside>
        <div className="grow md:ml-0 mt-4 md:mt-0">{children}</div>
      </main>
    </>
  );
}
