type PreviewProps = {
  variant: string;
};

const pots = [
  { name: "Jaipur", color: "#c4744a" },
  { name: "Kyoto", color: "#d9a05b" },
  { name: "Oaxaca", color: "#8f4b38" },
];

export default function PotteryTownPreview({ variant }: PreviewProps) {
  return (
    <div className="relative h-full min-h-[240px] w-full overflow-hidden bg-[#f3ebe1]">
      <div className="preview-grain" />
      {variant === "maker" ? (
        <div className="absolute inset-x-[10%] top-[14%] rounded-2xl bg-white p-4 shadow-[0_14px_32px_rgba(90,50,20,0.12)]">
          <div className="flex items-center gap-3">
            <div className="pottery-spin h-12 w-12 rounded-full bg-[#c4744a]" />
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-[#b0894a]">
                Maker
              </p>
              <h3 className="font-serif text-[18px] leading-tight text-[#3a2a1e]">
                Meera Sharma
              </h3>
              <p className="text-[11px] text-[#8a7058]">Blue pottery · Jaipur</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[#6e5846]">
            Fires at dawn. Sells on Fridays. The glaze recipe is her grandmother’s.
          </p>
        </div>
      ) : variant === "story" ? (
        <div className="absolute inset-x-[8%] top-[10%] overflow-hidden rounded-2xl bg-[#3a2a1e] p-4 text-[#f3ebe1]">
          <p className="text-[9px] uppercase tracking-[0.16em] text-[#d9a05b]">
            Process
          </p>
          <h3 className="mt-1 font-serif text-[18px] leading-tight">
            Clay, kiln, hands.
          </h3>
          <div className="mt-4 flex gap-2">
            {["Throw", "Bisque", "Glaze", "Fire"].map((step, index) => (
              <div
                key={step}
                className={`pottery-step pottery-step-${index} flex-1 rounded-lg bg-white/10 px-2 py-3 text-center text-[10px]`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      ) : variant === "square" ? (
        <div className="absolute inset-0 grid grid-cols-2 gap-1.5 p-3">
          {pots.map((pot) => (
            <div
              key={pot.name}
              className="pottery-tile flex flex-col justify-end rounded-xl p-3"
              style={{ background: pot.color }}
            >
              <span className="font-serif text-sm text-white">{pot.name}</span>
            </div>
          ))}
          <div className="flex flex-col justify-end rounded-xl bg-white p-3">
            <p className="text-[9px] uppercase tracking-[0.14em] text-[#b0894a]">
              Town square
            </p>
            <p className="font-serif text-[15px] leading-tight text-[#3a2a1e]">
              24 makers nearby
            </p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-x-[8%] top-[12%] rounded-2xl bg-white p-4 shadow-[0_14px_32px_rgba(90,50,20,0.1)]">
          <p className="text-[9px] uppercase tracking-[0.16em] text-[#b0894a]">
            Pottery Town
          </p>
          <h3 className="mt-1 font-serif text-[18px] leading-tight text-[#3a2a1e]">
            Find the hands behind the form.
          </h3>
          <div className="relative mt-4 h-28 overflow-hidden rounded-xl bg-[#efe0cc]">
            <span className="pottery-pin absolute left-[28%] top-[34%] h-2.5 w-2.5 rounded-full bg-[#c4744a]" />
            <span className="pottery-pin pottery-pin-delay absolute left-[58%] top-[48%] h-2.5 w-2.5 rounded-full bg-[#3d7a74]" />
            <span className="absolute bottom-2 left-3 text-[10px] text-[#8a7058]">
              Jaipur · Kyoto · Oaxaca
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
