import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Globe,
  Mail,
  Zap,
  ArrowRight,
  Shield,
  Sparkles,
  Lock,
} from "lucide-react";

import Footer from "../components/common/Footer";

export default function LandingPage() {

  const features = [
    {
      icon: Globe,
      title: "URL Scanner",
      desc: "Analyze suspicious links instantly before opening dangerous websites.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Mail,
      title: "Email Analysis",
      desc: "Detect phishing emails using AI-powered threat intelligence.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Real-Time Detection",
      desc: "Get instant threat analysis with confidence scoring and alerts.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10">

        <div
          className="
            absolute top-0 left-0
            h-96 w-96
            bg-cyan-500/10
            blur-3xl rounded-full
          "
        />

        <div
          className="
            absolute bottom-0 right-0
            h-96 w-96
            bg-indigo-500/10
            blur-3xl rounded-full
          "
        />

      </div>

      {/* 🔥 NAVBAR */}
      <header
        className="
          sticky top-0 z-50
          backdrop-blur-xl
          border-b border-white/5
          bg-[#020617]/70
        "
      >

        <div
          className="
            max-w-7xl mx-auto
            flex items-center justify-between
            px-6 py-4
          "
        >

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div
              className="
                h-11 w-11 rounded-2xl
                bg-gradient-to-br
                from-cyan-500/20
                to-indigo-500/20
                border border-cyan-500/20
                flex items-center justify-center
              "
            >
              <Shield className="text-cyan-400" size={22} />
            </div>

            <div>

              <h1 className="font-black text-xl tracking-tight">
                PhishGuard AI
              </h1>

              <p className="text-xs text-slate-500">
                Intelligent Threat Detection
              </p>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="
                px-4 py-2 rounded-xl
                text-slate-300
                hover:text-white
                hover:bg-white/5
                transition
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-5 py-2.5 rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-indigo-500
                hover:opacity-90
                font-semibold
                transition
                shadow-lg shadow-cyan-500/20
              "
            >
              Get Started
            </Link>

          </div>

        </div>

      </header>

      {/* 🚀 HERO */}
      <section
        className="
          relative
          max-w-7xl mx-auto
          px-6
          pt-24
          pb-28
        "
      >

        <div className="text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              border border-cyan-500/20
              bg-cyan-500/10
              text-cyan-300 text-sm
              mb-8
            "
          >

            <Sparkles size={16} />
            AI Powered Cybersecurity Protection

          </div>

          {/* Heading */}
          <h1
            className="
              text-5xl md:text-7xl
              font-black
              leading-tight
              tracking-tight
            "
          >

            Detect Phishing
            <br />

            <span
              className="
                bg-gradient-to-r
                from-cyan-400
                via-indigo-400
                to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              Before It Attacks
            </span>

          </h1>

          {/* Description */}
          <p
            className="
              mt-8
              text-lg md:text-xl
              text-slate-400
              max-w-2xl mx-auto
              leading-relaxed
            "
          >

            Advanced AI analyzes suspicious URLs, emails,
            and cyber threats in real-time to keep
            you protected online.

          </p>

          {/* Buttons */}
          <div
            className="
              mt-10
              flex flex-col sm:flex-row
              justify-center
              gap-4
            "
          >

            <Link
              to="/register"
              className="
                group
                px-7 py-4 rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-indigo-500
                hover:scale-[1.03]
                transition
                font-semibold
                flex items-center justify-center gap-2
                shadow-xl shadow-cyan-500/20
              "
            >

              Start Scanning

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </Link>

            <Link
              to="/login"
              className="
                px-7 py-4 rounded-2xl
                border border-white/10
                bg-white/5
                hover:bg-white/10
                transition
                font-semibold
              "
            >
              Login
            </Link>

          </div>

          {/* Stats */}
          <div
            className="
              mt-16
              grid grid-cols-2 md:grid-cols-4
              gap-5
            "
          >

            {[
              ["99.9%", "Threat Accuracy"],
              ["24/7", "Real-Time Protection"],
              ["10K+", "Threats Detected"],
              ["AI", "Powered Analysis"],
            ].map(([value, label]) => (

              <div
                key={label}
                className="
                  p-5 rounded-2xl
                  border border-white/5
                  bg-white/[0.03]
                  backdrop-blur-xl
                "
              >

                <h3 className="text-2xl font-black text-cyan-400">
                  {value}
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  {label}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ⚡ FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-black">
            Powerful Security Features
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Intelligent threat detection designed for modern cyber attacks.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-7">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="
                  group
                  relative
                  p-8
                  rounded-3xl
                  border border-white/5
                  bg-white/[0.03]
                  backdrop-blur-xl
                  hover:border-cyan-500/20
                  hover:-translate-y-1
                  transition-all duration-300
                  overflow-hidden
                "
              >

                {/* Glow */}
                <div
                  className={`
                    absolute inset-0 opacity-0
                    group-hover:opacity-100
                    transition
                    bg-gradient-to-br ${feature.color}
                  `}
                  style={{
                    filter: "blur(120px)",
                  }}
                />

                {/* Icon */}
                <div
                  className={`
                    relative
                    h-16 w-16 rounded-2xl
                    bg-gradient-to-br ${feature.color}
                    flex items-center justify-center
                    shadow-lg
                  `}
                >

                  <Icon size={28} />

                </div>

                <h3 className="relative mt-6 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="relative mt-3 text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* 🔥 CTA */}
      <section className="px-6 pb-24">

        <div
          className="
            relative
            max-w-6xl mx-auto
            overflow-hidden
            rounded-[40px]
            border border-cyan-500/10
            bg-gradient-to-br
            from-cyan-500/10
            via-indigo-500/10
            to-purple-500/10
            backdrop-blur-2xl
            p-14
            text-center
          "
        >

          {/* Glow */}
          <div
            className="
              absolute inset-0
              bg-cyan-500/10
              blur-3xl
            "
          />

          <div className="relative">

            <div
              className="
                mx-auto
                h-20 w-20 rounded-3xl
                bg-gradient-to-br
                from-cyan-500
                to-indigo-500
                flex items-center justify-center
                shadow-xl shadow-cyan-500/20
              "
            >

              <ShieldCheck size={38} />

            </div>

            <h2 className="mt-8 text-4xl font-black">
              Protect Yourself Today
            </h2>

            <p
              className="
                mt-5
                text-slate-300
                max-w-2xl mx-auto
                text-lg
              "
            >

              Stay ahead of phishing attacks with
              intelligent AI-powered protection.

            </p>

            <Link
              to="/register"
              className="
                inline-flex items-center gap-2
                mt-10
                px-8 py-4 rounded-2xl
                bg-white
                text-black
                font-bold
                hover:scale-[1.03]
                transition
              "
            >

              Create Free Account

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </section>

      {/* 🔥 SECURITY STRIP */}
      <section className="px-6 pb-24">

        <div
          className="
            max-w-6xl mx-auto
            grid md:grid-cols-3 gap-5
          "
        >

          {[
            "Advanced AI Detection",
            "Secure Cloud Protection",
            "Instant Threat Alerts",
          ].map((item, index) => (

            <div
              key={index}
              className="
                p-5 rounded-2xl
                border border-white/5
                bg-white/[0.03]
                flex items-center gap-3
              "
            >

              <Lock className="text-cyan-400" size={20} />

              <span className="text-slate-300">
                {item}
              </span>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}