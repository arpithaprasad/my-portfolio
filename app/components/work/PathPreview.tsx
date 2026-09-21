type PreviewProps = {
  variant: string;
};

function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-[6%] top-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(40,55,80,0.12)]">
      <div className="flex items-center gap-1.5 border-b border-[#e8eaf0] bg-[#f6f7fb] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d0d5e2]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#d0d5e2]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#d0d5e2]" />
        <span className="ml-2 text-[9px] tracking-wide text-[#8b93a7]">
          path.app / your-next-step
        </span>
      </div>
      {children}
    </div>
  );
}

export default function PathPreview({ variant }: PreviewProps) {
  return (
    <div className="relative h-full min-h-[220px] w-full overflow-hidden bg-[#e8edf4]">
      <div className="preview-grain" />
      <Window>
        {variant === "guide" ? (
          <div className="grid grid-cols-[0.9fr_1.1fr] gap-3 p-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-[#7a84a0]">
                Check-in
              </p>
              <h3 className="mt-1 font-serif text-[16px] leading-tight text-[#1d2433]">
                You are not starting from zero.
              </h3>
            </div>
            <div className="path-slide rounded-xl bg-[#1d2433] p-3 text-[11px] leading-relaxed text-[#e8edf4]">
              “Architecture already taught you systems thinking. Let’s name the roles that want that.”
            </div>
          </div>
        ) : variant === "timeline" ? (
          <div className="p-4">
            <p className="text-[9px] uppercase tracking-[0.14em] text-[#7a84a0]">
              Eight weeks
            </p>
            <div className="relative mt-5 flex justify-between">
              {["Map", "Proof", "Talks", "Offer"].map((label, index) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span
                    className={`path-node path-node-${index} h-2.5 w-2.5 rounded-full bg-[#3d7a74]`}
                  />
                  <span className="text-[10px] text-[#1d2433]">{label}</span>
                </div>
              ))}
              <span className="path-line absolute left-4 right-4 top-[5px] h-px bg-[#c5cedd]" />
            </div>
          </div>
        ) : variant === "offer" ? (
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-[#3d7a74]">
                Next step
              </p>
              <h3 className="mt-1 font-serif text-[18px] leading-tight text-[#1d2433]">
                Product design
                <br />
                intern, NYC
              </h3>
            </div>
            <div className="path-slide rounded-xl border border-[#d7dde8] bg-[#f6f7fb] px-4 py-3 text-right">
              <p className="text-[10px] text-[#7a84a0]">You can say it</p>
              <p className="font-serif text-lg text-[#1d2433]">out loud.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 p-4">
            <div className="path-card-a rounded-xl bg-[#1d2433] p-3 text-[#e8edf4]">
              <p className="text-[9px] uppercase tracking-[0.14em] text-[#9aa6c0]">
                Stay close
              </p>
              <p className="mt-1 font-serif text-[15px] leading-tight">
                Spatial / systems design
              </p>
            </div>
            <div className="path-card-b rounded-xl bg-white p-3 text-[#1d2433] shadow-sm">
              <p className="text-[9px] uppercase tracking-[0.14em] text-[#7a84a0]">
                Stretch
              </p>
              <p className="mt-1 font-serif text-[15px] leading-tight">
                Digital product roles
              </p>
            </div>
          </div>
        )}
      </Window>
    </div>
  );
}
