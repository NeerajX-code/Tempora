import { nanoid } from "nanoid";
import { motion } from "framer-motion";

const HourlyForcast = ({ data, isBlack }) => {
  const renderData = data?.slice(2, 7).map((val) => {
    const dt = new Date(val.dt_txt);
    const datePart = dt.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
    const timePart = dt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <motion.div
        key={nanoid()}
        variants={card}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`w-full rounded-xl p-2 flex flex-col items-center shadow-md hover:shadow-lg transition-all duration-300 ${
          !isBlack
            ? "bg-gradient-to-br from-rose-400 via-orange-300 to-amber-200 text-white"
            : "bg-gradient-to-br from-blue-100 via-cyan-100 to-emerald-100 text-gray-800"
        }`}
      >
        {/* Temperature */}
        <div
          className={`${
            !isBlack ? "text-gray-700" : "text-blue-700"
          } font-bold mb-2`}
          style={{ fontSize: "clamp(16px,2vw,1.2rem)" }}
        >
          {val.main.temp.toFixed(1)}°C
        </div>

        {/* Icon */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-inner ${
            !isBlack
              ? "bg-white/30 backdrop-blur-md"
              : "bg-gradient-to-br from-indigo-300 to-blue-400"
          }`}
        >
          <span role="img" aria-label="weather" className="text-xl">
            🌤️
          </span>
        </motion.div>

        {/* Time + Date */}
        <div
          className="flex flex-col items-center justify-center text-gray-700 font-semibold"
          style={{ fontSize: "clamp(8px,2vw,1rem)" }}
        >
          <p className="w-full text-center">{timePart}</p>
          <p className="w-full text-center">{datePart}</p>
        </div>
      </motion.div>
    );
  });

  return (
    <motion.div
      className="w-full grid grid-cols-[repeat(auto-fit,minmax(60px,1.5fr))] gap-2 pt-2"
      variants={wrapper}
      initial="hidden"
      animate="show"
    >
      {renderData}
    </motion.div>
  );
};

export default HourlyForcast;

const wrapper = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};
