import { useDispatch, useSelector } from "react-redux"
import { getasyncWeather } from "./store/actions/weatherActions";
import { useEffect, useMemo, useState } from "react";
import { getasyncforcast } from "./store/actions/forcastActions";
import { Moon, RotateCcw, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun } from "lucide-react";
import ForcastChart from "./components/ForcastChart";
import HourlyForcast from "./components/HourlyForcast";
import { useForm } from "react-hook-form"
import { Rain, Clear, Clouds, Drizzle, Thunderstorm, Snow, Mist, Tornado, Smoke, Haze, Fog, Dust, Sand, Ash, Squall } from "./components/weatherIcons";

const App = () => {
  const weather = useSelector((state) => state.weatherSlice.weather)
  const forcast = useSelector((state) => state.forcastSlice.forcast);
  const [isBlack, setBlack] = useState(false);



  const iconStyle = { transform: "translate(0px, -16px)" };

  const Icons = {
    "clear": <Clear style={iconStyle} />,
    "clouds": <Clouds style={iconStyle} />,
    "rain": <Rain style={iconStyle} />,
    "drizzle": <Drizzle style={iconStyle} />,
    "thunderstorm": <Thunderstorm style={iconStyle} />,
    "snow": <Snow style={iconStyle} />,
    "mist": <Mist style={iconStyle} />,
    "smoke": <Smoke style={iconStyle} />,
    "haze": <Haze style={iconStyle} />,
    "dust": <Dust style={iconStyle} />,
    "fog": <Fog style={iconStyle} />,
    "sand": <Sand style={iconStyle} />,
    "ash": <Ash style={iconStyle} />,
    "squall": <Squall style={iconStyle} />,
    "tornado": <Tornado style={iconStyle} />,
  };

  const [weatherDesc, setWeatherDesc] = useState("clear")

  const weatherMain = useMemo(
    () => weatherDesc.split(" ").join("").toLowerCase(),   // "brokenclouds"
    [weatherDesc]
  );


  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    let res = await dispatch(getasyncWeather(data?.city?.trim()));
    dispatch(getasyncforcast(data?.city?.trim()));
    if ((!res?.success && res?.status === 404)) {
      reset({
        city: res?.statusText
      })
    }
    else {
      reset({
        city: ""
      });
    }

  }

  const refreshHandler = () => {
    const storedCity = JSON.parse(localStorage.getItem("city")) || "delhi";
    dispatch(getasyncWeather(storedCity));
    dispatch(getasyncforcast(storedCity));
    setTime(new Date());
  }

  const [time, setTime] = useState(new Date());


  useEffect(() => {
    const storedCity = JSON.parse(localStorage.getItem("city")) || "delhi";
    dispatch(getasyncforcast(storedCity));
    dispatch(getasyncWeather(storedCity));
  }, [])

  useEffect(() => {
    if (weather?.weather?.length) {
      const desc = weather.weather[0].main;
      setWeatherDesc(desc);
    }
  }, [weather])


  const page = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.25 } }
  };

  const rise = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 14 } }
  };

  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } }
  };

  const tap = { whileTap: { rotate: 90, scale: 0.82 } };

  /* ─────────────────── theme helpers ─────────────────── */
  const THEMES = {
    dark: {
      gradient: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      text: "white",
    },
    light: {
      gradient: "linear-gradient(135deg,#a1c4fd,#c2e9fb)",
      text: "black",
    },
  };

  const statsLabels = (w) => [
    `Humidity: ${w?.main?.humidity}%`,
    `Wind: ${w?.wind?.speed} km/h`,
    `Visibility: ${w?.visibility}`,
    `Pressure: ${w?.main?.pressure} hPa`,
  ];

  /* ───────────────────────── UI ───────────────────────── */
  return (
    <AnimatePresence mode="wait">
      {weather && (
        <motion.div
          key={isBlack ? "dark" : "light"}
          variants={page}
          initial="hidden"
          animate="show"
          exit="exit"
          className="w-full h-[100vh] overflow-auto p-2 flex flex-col gap-[10px] items-center bg-[length:300%_300%]"
          style={{
            fontFamily: "Comfortaa",
            background: THEMES[isBlack ? "dark" : "light"].gradient,
            color: THEMES[isBlack ? "dark" : "light"].text,
          }}
        >
          {/* NAVBAR */}
          <motion.nav
            variants={rise}
            className="w-[98%] max-w-[520px] mt-2 flex justify-between items-center gap-[12px]"
          >
            <div className="w-full relative">
              <form onSubmit={handleSubmit(submitHandler)} className="w-full">
                <input
                  {...register("city")}
                  className="w-full outline-none bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 rounded-2xl px-[20px] pl-[40px] py-[10px]"
                  type="text"
                  placeholder="Search Your Cities"
                />
              </form>
              <Search className="absolute top-[10px] left-[10px]" />
            </div>

            {/* theme toggle */}
            <motion.button
              {...tap}
              className="p-[8px] rounded-2xl"
              onClick={() => setBlack((p) => !p)}
              style={{ background: isBlack ? "grey" : "white" }}
            >
              {isBlack ? <Sun color="white" /> : <Moon color="black" fill="black" />}
            </motion.button>
          </motion.nav>

          {/* MAIN SECTION */}
          <motion.section variants={fade} className="w-full max-w-[520px]">
            {/* City name */}
            <motion.h2
              variants={rise}
              className="w-full truncate"
              style={{
                fontSize: "clamp(3rem,12vw,5rem)",
                lineHeight: "1.15",
              }}
            >
              {weather?.name}
            </motion.h2>

            {/* Card */}
            <motion.div
              variants={rise}
              className="w-full bg-white/30 rounded-2xl backdrop-blur-lg flex flex-col"
              style={{ padding: "clamp(1vw,1rem,1.2rem)" }}
            >
              <div className="flex items-center justify-between">
                <span>{Icons[weatherMain || "clear"]}</span>

                <div className="flex flex-col ">
                  <motion.h2
                    variants={fade}
                    className="leading-[60px]"
                    style={{ fontSize: "clamp(2.8rem,4vw,4rem)" }}
                  >
                    {`${weather?.main?.temp?.toFixed(1)}°C`}
                  </motion.h2>
                  <p>{weather?.weather[0]?.main}</p>
                </div>

                <motion.p
                  variants={fade}
                  className="flex items-cente self-baseline gap-1 font-['Red_Rose']"
                  style={{ fontSize: "clamp(8px,2vw,.8rem)" }}
                >
                  <span>
                    Last Updated:&nbsp;
                    {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                  </span>
                  <RotateCcw onClick={refreshHandler} size={18} className="cursor-pointer" />
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div
                variants={page}
                className="grid justify-start max-[520px]:justify-center"
                style={{ gridTemplateColumns: "repeat(auto-fit,minmax(140px,1.5fr))" }}
              >
                {statsLabels(weather).map((txt) => (
                  <motion.p
                    key={txt}
                    variants={rise}
                    style={{ fontSize: "clamp(10px,1rem,1.4rem)" }}
                  >
                    {txt}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Hourly forecast */}
            <motion.div variants={rise}>
              <HourlyForcast isBlack={isBlack} data={forcast?.list} />
            </motion.div>

            {/* 5‑Day heading */}
            <motion.h2
              variants={rise}
              className="pt-2"
              style={{ fontSize: "clamp(2vw,2rem,4.2rem)" }}
            >
              5-Day Forecast
            </motion.h2>

            {/* Chart */}
            <motion.div variants={fade}>
              <ForcastChart isBlack={isBlack} data={forcast?.list} />
            </motion.div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App