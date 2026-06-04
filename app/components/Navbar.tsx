const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="px-6 py-8 md:px-12">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <a
          href="#"
          className="text-base font-medium tracking-tight transition-opacity hover:opacity-70"
        >
          Arpitha Prasad
        </a>
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
