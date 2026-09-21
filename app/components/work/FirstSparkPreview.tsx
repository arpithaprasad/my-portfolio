type PreviewProps = {
  variant: string;
};

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-1/2 top-[7%] w-[74%] max-w-[250px] -translate-x-1/2 rounded-[30px] bg-[#2a241c] p-[5px] shadow-[0_18px_40px_rgba(70,50,20,0.18)]">
      <div className="relative overflow-hidden rounded-[25px] bg-[#fbf7f0]">
        <div className="flex items-center justify-between px-4 pt-2.5 text-[8px] tracking-wide text-[#8a7d6c]">
          <span>9:41</span>
          <span className="absolute left-1/2 top-1.5 h-2.5 w-16 -translate-x-1/2 rounded-full bg-[#2a241c]" />
          <span>5G</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function FirstSparkPreview({ variant }: PreviewProps) {
  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden bg-[#efe6d6]">
      <div className="preview-grain" />
      <Phone>
        {variant === "checklist" ? (
          <div className="px-4 pb-6 pt-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#b0894a]">
              Your first 90 days
            </p>
            <h3 className="mt-1 font-serif text-[17px] leading-tight text-[#2a241c]">
              One list. No jargon.
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "Social security walkthrough",
                "Build credit without a history",
                "Lease-ready documents",
                "Send money home",
              ].map((item, index) => (
                <li
                  key={item}
                  className={`spark-check spark-check-${index} flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-[11px] text-[#2a241c]`}
                >
                  <span className="spark-check-mark flex h-4 w-4 items-center justify-center rounded-full bg-[#3d7a74] text-[8px] text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : variant === "transfer" ? (
          <div className="px-4 pb-6 pt-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#b0894a]">
              Send home
            </p>
            <h3 className="mt-1 font-serif text-[17px] leading-tight text-[#2a241c]">
              $240 to Bangalore
            </h3>
            <div className="mt-5 rounded-2xl bg-white p-3">
              <div className="flex items-end justify-between">
                <span className="text-[10px] text-[#8a7d6c]">Arrives Thursday</span>
                <span className="font-serif text-xl text-[#3d7a74]">$240</span>
              </div>
              <div className="spark-route mt-4 flex items-center justify-between text-[10px]">
                <span className="rounded-full bg-[#efe6d6] px-2 py-1">Chase</span>
                <span className="spark-dot h-px flex-1 bg-[#d7c9b3]" />
                <span className="rounded-full bg-[#3d7a74] px-2 py-1 text-white">
                  HDFC
                </span>
              </div>
            </div>
            <div className="mt-3 rounded-2xl bg-[#3d7a74] px-3 py-2.5 text-center text-[11px] text-white">
              Confirm in plain English
            </div>
          </div>
        ) : variant === "calm" ? (
          <div className="flex flex-col items-center px-5 pb-8 pt-8 text-center">
            <div className="spark-pulse mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3d7a74] text-lg text-white">
              ✓
            </div>
            <h3 className="font-serif text-[18px] leading-tight text-[#2a241c]">
              You opened your first U.S. account.
            </h3>
            <p className="mt-2 text-[11px] leading-relaxed text-[#8a7d6c]">
              Emergency fund started. Next: a credit file that belongs to you.
            </p>
          </div>
        ) : (
          <div className="px-4 pb-6 pt-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#b0894a]">
              FirstSpark
            </p>
            <h3 className="mt-1 font-serif text-[18px] leading-tight text-[#2a241c]">
              Your first dollar,
              <br />
              explained.
            </h3>
            <div className="mt-5 rounded-2xl bg-white p-3">
              <p className="text-[10px] text-[#8a7d6c]">Emergency fund</p>
              <p className="font-serif text-[26px] leading-none text-[#2a241c]">
                $2,480
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#efe6d6]">
                <span className="spark-bar block h-full rounded-full bg-[#3d7a74]" />
              </div>
              <p className="mt-2 text-[10px] text-[#3d7a74]">72% to three months</p>
            </div>
          </div>
        )}
      </Phone>
    </div>
  );
}
