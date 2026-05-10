import { FaShieldAlt, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-slate-700/50 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-2">
          <FaShieldAlt size={16} className="text-indigo-400" />
          <span className="text-slate-400 text-xs">
            PhishGuard AI © {new Date().getFullYear()} — Real-Time Phishing Detection
          </span>
        </div>

        {/* Middle */}
        <div className="flex items-center gap-4">
          {["Privacy", "Terms", "Support"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-slate-500 hover:text-indigo-400 transition"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {[
            { Icon: FaGithub, href: "#" },
            { Icon: FaTwitter, href: "#" },
            { Icon: FaLinkedin, href: "#" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}