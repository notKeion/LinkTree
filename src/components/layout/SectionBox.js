export default function SectionBox({children}) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl m-4 md:m-6 p-4 md:p-6 shadow-xl shadow-black/40">
      {children}
    </div>
  );
}