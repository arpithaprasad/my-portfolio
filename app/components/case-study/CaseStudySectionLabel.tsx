type CaseStudySectionLabelProps = {
  children: string;
};

export default function CaseStudySectionLabel({
  children,
}: CaseStudySectionLabelProps) {
  return (
    <p className="text-[13px] italic text-[#1A1A1A]/45">{children}</p>
  );
}
