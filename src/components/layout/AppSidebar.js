'use client';
import LogoutButton from "@/components/buttons/LogoutButton";
import {faFileLines} from "@fortawesome/free-regular-svg-icons";
import {faArrowLeft, faChartLine} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();
  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-slate-300">
      <Link
        href={'/account'}
        className={
          "flex gap-4 p-2 rounded-xl transition-colors "
          + (path === '/account'
            ? 'bg-slate-900 text-indigo-300 border border-indigo-500/60'
            : 'text-slate-300 hover:text-indigo-300 hover:bg-slate-900/60')
        }>
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className={'w-6 h-6'}
        />
        <span className="">My Page</span>
      </Link>
      <Link
        href={'/analytics'}
        className={
          "flex gap-4 p-2 rounded-xl transition-colors "
          + (path === '/analytics'
            ? 'bg-slate-900 text-indigo-300 border border-indigo-500/60'
            : 'text-slate-300 hover:text-indigo-300 hover:bg-slate-900/60')
        }>
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className={'w-6 h-6'}
        />
        <span className="">Analytics</span>
      </Link>
      <LogoutButton
        iconLeft={true}
        className={'flex gap-4 items-center text-slate-400 p-2 hover:text-indigo-300 transition-colors'}
        iconClasses={'w-6 h-6'}
      />
      <Link href={'/'} className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-800 pt-4 hover:text-indigo-300 transition-colors">
        <FontAwesomeIcon icon={faArrowLeft} className={'w-3 h-3'} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}
