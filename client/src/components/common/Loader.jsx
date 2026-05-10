import { Shield, LoaderCircle } from "lucide-react";

export default function Loader({
  fullScreen = true,
  message = "Loading...",
}) {

  // 🔹 Small Inline Loader
  if (!fullScreen) {

    return (

      <div className="flex items-center justify-center py-14">

        <div className="flex flex-col items-center gap-5">

          {/* Spinner */}
          <div className="relative">

            <div
              className="
                h-14 w-14 rounded-2xl
                bg-gradient-to-br
                from-indigo-500/20
                to-cyan-500/20
                border border-indigo-500/20
                flex items-center justify-center
                backdrop-blur-xl
              "
            >

              <LoaderCircle
                size={28}
                className="
                  text-cyan-400
                  animate-spin
                "
              />

            </div>

            {/* Glow */}
            <div
              className="
                absolute inset-0
                rounded-2xl
                bg-cyan-500/10
                blur-xl
                -z-10
              "
            />

          </div>

          {/* Text */}
          <div className="text-center">

            <p className="text-slate-200 font-medium">
              {message}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              AI system processing request...
            </p>

          </div>

        </div>

      </div>
    );
  }

  // 🔥 Full Screen Loader
  return (

    <div
      className="
        fixed inset-0 z-50
        bg-[#020617]/95
        backdrop-blur-xl
        flex items-center justify-center
        overflow-hidden
      "
    >

      {/* Background Glow */}
      <div
        className="
          absolute
          h-72 w-72
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          flex flex-col items-center
          gap-8
        "
      >

        {/* 🔥 Animated Logo */}
        <div className="relative">

          {/* Outer Pulse Ring */}
          <div
            className="
              absolute inset-0
              rounded-[30px]
              border border-cyan-400/20
              animate-ping
            "
          />

          {/* Rotating Ring */}
          <div
            className="
              absolute inset-[-8px]
              rounded-[36px]
              border-2
              border-transparent
              border-t-cyan-400
              border-r-indigo-500
              animate-spin
            "
          />

          {/* Main Box */}
          <div
            className="
              relative
              h-24 w-24
              rounded-[28px]
              bg-gradient-to-br
              from-indigo-600/20
              to-cyan-500/20
              border border-cyan-400/20
              backdrop-blur-xl
              flex items-center justify-center
              shadow-2xl shadow-cyan-900/30
            "
          >

            <Shield
              size={42}
              className="
                text-cyan-400
                drop-shadow-lg
              "
            />

          </div>

        </div>

        {/* 🔥 Dots */}
        <div className="flex items-center gap-2">

          {[0, 1, 2].map((i) => (

            <div
              key={i}
              className="
                h-2.5 w-2.5
                rounded-full
                bg-cyan-400
                animate-bounce
              "
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}

        </div>

        {/* 🔥 Text */}
        <div className="text-center">

          <h1
            className="
              text-2xl font-black
              bg-gradient-to-r
              from-cyan-400
              to-indigo-400
              bg-clip-text
              text-transparent
            "
          >
            PhishGuard AI
          </h1>

          <p className="text-slate-300 mt-3 font-medium">
            {message}
          </p>

          <p className="text-sm text-slate-500 mt-2">
            Initializing cybersecurity engine...
          </p>

        </div>

        {/* Progress Bar */}
        <div
          className="
            w-64 h-1.5
            rounded-full
            bg-slate-800
            overflow-hidden
          "
        >

          <div
            className="
              h-full w-1/2
              bg-gradient-to-r
              from-cyan-400
              to-indigo-500
              animate-pulse
              rounded-full
            "
          />

        </div>

      </div>

    </div>
  );
}