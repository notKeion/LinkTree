import Header from "@/components/Header";
import { Lato } from "next/font/google";
import "../../globals.css";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

const defaultMetadata = {
  title: "LinkTri Clone",
  description:
    "Share your links, social profiles, contact info and more on one page",
};

export async function generateMetadata({ params }) {
  const uri = params?.uri;

  if (!uri) {
    return defaultMetadata;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const page = await Page.findOne({ uri });
    if (!page) {
      return defaultMetadata;
    }

    const user = await User.findOne({ email: page.owner });

    const displayName = page.displayName || user?.name || "LinkTri User";
    const bio = page.bio ||
      "View this user's profile and shared links on LinkTri.";

    return {
      title: displayName,
      description: bio,
    };
  } catch (e) {
    return defaultMetadata;
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={lato.className}>
    <main>
      {children}
    </main>
    <footer className="text-center text-gray-500 text-sm py-4">
      &copy; {new Date().getFullYear()} Vectro LinkTree. Open Source | Get your own account for free <a href="https://linktree.vectro.us" className="text-blue-500 hover:underline">here</a>. 
    </footer>
    </body>
    </html>
  )
}
