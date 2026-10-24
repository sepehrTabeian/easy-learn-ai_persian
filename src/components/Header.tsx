/**
 * Header · سبک Mailchimp-Freddie
 * نوار باریک metadata زرد در بالا + ناوبری با پس‌زمینه سفید + دکمه‌های سبک stamp
 */

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Youtube, MessageCircle } from "lucide-react";
import { NavigationItem, SocialLink } from "../types";

const navigationItems: NavigationItem[] = [
  { name: "دانش بصری", path: "/ai-knowledge" },
  { name: "مقالات", path: "/ai-article" },
  { name: "پرامپت‌ها", path: "/ai-prompts" },
  { name: "آثار", path: "/ai-application" },
  { name: "مدل‌ها", path: "/ai-model" },
  { name: "ارزیابی", path: "/ai-benchmark" },
  { name: "آموزش‌ها", path: "/ai-tutorial" },
  { name: "سیاره", path: "/knowledge-planet" },
];

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: "Github",
    url: "https://github.com/ConardLi/easy-learn-ai",
  },
  { name: "Bilibili", icon: "Youtube", url: "https://space.bilibili.com/474921808" },
  { name: "WeChat", icon: "MessageCircle", url: "#" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [showWeChatQR, setShowWeChatQR] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="w-[18px] h-[18px]" strokeWidth={2} />;
      case "Youtube":
        return <Youtube className="w-[18px] h-[18px]" strokeWidth={2} />;
      case "MessageCircle":
        return (
          <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
        );
      default:
        return null;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-400 ease-editorial ${
        scrolled
          ? "border-b-2 border-ink shadow-soft"
          : "border-b-2 border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="relative w-10 h-10 flex items-center justify-center bg-butter border-2 border-ink rounded-2xl shadow-stamp transition-transform duration-250 ease-spring group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:[box-shadow:6px_6px_0_0_#241C15]">
              <span className="font-sans font-extrabold text-[18px] text-ink leading-none">
                E
              </span>
            </div>
            <span className="font-sans font-extrabold text-[22px] text-ink tracking-tight">
              Easy AI
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const active =
                location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-full font-sans font-semibold text-[14px] transition-all duration-250 ease-spring ${
                    active
                      ? "bg-ink text-white"
                      : "text-ink hover:bg-butter"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <div key={link.name} className="relative">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full text-ink hover:bg-butter transition-colors duration-250 ease-spring"
                  onMouseEnter={() =>
                    link.name === "WeChat" && setShowWeChatQR(true)
                  }
                  onMouseLeave={() =>
                    link.name === "WeChat" && setShowWeChatQR(false)
                  }
                  onClick={(e) => link.name === "WeChat" && e.preventDefault()}
                  aria-label={link.name}
                >
                  {getIcon(link.icon)}
                </a>

                {link.name === "WeChat" && showWeChatQR && (
                  <div className="absolute top-full end-0 mt-3 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg z-50 min-w-max">
                    <div className="flex flex-col items-center p-4">
                      <img
                        src="/imgs/gzh.jpg"
                        alt="کد QR حساب رسمی WeChat"
                        className="w-40 h-40 object-cover rounded-xl"
                      />
                      <p className="font-sans text-[12px] font-semibold text-ink mt-3 text-center whitespace-nowrap">
                        برای دنبال کردن حساب رسمی اسکن کنید ←
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
