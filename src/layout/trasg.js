import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Card, Typography, Icon, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../index.css";
const CardHome = ({
  icon,
  num,
  bgIcon = "",
  translation,
  bgCard = "white",
  filterCall = "",
  todayCall = "",
  colorIcon = "",
}) => {
  const [t] = useTranslation("common");
  const navigate = useNavigate("");
  const [bgColor, setBgColor] = useState("");
  const parentRef = useRef(null);
  const handleHover = () => {
    const itemDashboard = parentRef.current.querySelector(".itemDashboard");
    const computedStyle = getComputedStyle(itemDashboard);
    const backgroundColor = computedStyle.background;
    setBgColor(backgroundColor);
  };
  return (
    <div
      className="dark:highlight-white/5 light relative  mx-auto flex max-w-md items-center justify-between gap-6 overflow-hidden rounded-xl shadow-lg   ring-1 ring-black/5 hover:cursor-pointer dark:bg-slate-800"
      style={{
        background: bgColor,
        transition: " 0.3s ease-in-out",
      }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setBgColor("")}
      ref={parentRef}
      onClick={() =>
        filterCall ? navigate("/voip/logs", { state: filterCall }) : () => {}
      }
    >
      {/* <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: "scale(1.5)", opacity: 0.5 }}
      >
        <rect
          x="180.52"
          y="200"
          width="100"
          height="150"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill={bgIcon}
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: "scale(1.5)", opacity: 0 }}
      >
        <rect
          x="125"
          y="200"
          width="10"
          height="50"
          rx="8"
          // transform="rotate(-45 159.52 175)"
          fill={bgIcon}
        />
      </svg>
      <div
        className="absolute bottom-0 left-0 -mb-24 ml-3 block h-0 w-0"
        style={{
          background: "radial-gradient(black, transparent 60%)",
          transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
          opacity: 0.2,
        }}
      ></div> */}

      <div
        className={`itemDashboard absolute -left-6 flex h-28 w-28 items-center justify-center rounded-full shadow-lg`}
        style={{ background: bgIcon }}
      >
        {icon}
      </div>
      <div className="min-w-0 py-3 pl-24 pr-5 2xl:pl-28">
        <div
          className={`  truncate font-semibold dark:text-slate-200 md:text-base  lg:text-[13px]  xl:text-[16px] 2xl:text-[17px] 2xl:leading-[26px]	 `}
        >
          {t(`dashboard.${translation}`, {
            plural: num > 1 ? "s" : "",
            pluriel: num > 1 ? "x" : "",
          })}
        </div>
        <div
          className={`flex items-center  truncate text-xl font-semibold  leading-tight  dark:text-slate-400`}
        >
          {num}

          {todayCall && todayCall > 0 ? (
            <Typography.Text
              // type="secondary"
              className={`ml-1 flex items-center rounded-md px-1  text-xs   `}
            >
              <Typography.Text className="text-md mr-1 ">
                {" "}
                ({todayCall}
              </Typography.Text>
              {t(`dashboard.unreturnedMissedCalls`, {
                plural: num > 1 ? "s" : "",
              })}
              )
            </Typography.Text>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* {filterCall ? (
        <Typography.Link
          className="m-3 flex cursor-pointer items-center space-x-2 self-start truncate "
          onClick={() => navigate("/voip/logs", { state: filterCall })}
        >
          <span className="xl:hidden 2xl:block">
            {t(`dashboard.goToCalls`)}{" "}
          </span>
          <HiArrowNarrowRight className="hover:opacity-7  ml-1 xl:text-2xl 2xl:text-lg" />
        </Typography.Link>
      ) : (
        ""
      )} */}
      {/* <BsFillArrowRightCircleFill className="mr-2 text-xl hover:cursor-pointer" /> */}
    </div>
  );
  {
    /* 
    <Card
      bordered={true}
      style={{ boxShadow: "0 5px 10px rgba(0,0,0,.12)", background: bgCard }}
      // cover={<div className="rounded-lg  p-0.5"></div>}
    >
      <div className="flex items-center justify-between">
        <div className="">
          <Typography.Text className=" font-medium text-slate-800 first-letter:capitalize xl:text-sm 2xl:text-lg">
            {t(`dashboard.${translation}`, {
              plural: num > 1 ? "s" : "",
              pluriel: num > 1 ? "x" : "",
            })}
          </Typography.Text>
          <Typography.Title
            style={{ margin: 0 }}
            className="text-lg font-medium text-slate-800 first-letter:capitalize"
          >
            {num}{" "}
          </Typography.Title>
        </div>
        <div
          style={{
            width: "48px",
            height: "48px",
            position: "absolute",
            top: "0",
            bottom: "0",
            right: "16px",
            margin: "auto",
            backgroundColor: bgIcon,
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,.12)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </div>
      </div> 
      <div className="dark:highlight-white/5 relative mx-auto flex max-w-md items-center gap-6 overflow-hidden  bg-white   ring-black/5 dark:bg-slate-800">
        <div
          className={`absolute -left-6 flex h-28 w-28 items-center justify-center rounded-full shadow-lg`}
          style={{ background: bgIcon }}
        >
          {icon}
        </div>
        <div className="min-w-0 py-5 pl-28 pr-5">
          <div className="truncate font-medium text-slate-900 dark:text-slate-200 sm:text-base xl:text-sm 2xl:text-lg">
            {t(`dashboard.${translation}`, {
              plural: num > 1 ? "s" : "",
              pluriel: num > 1 ? "x" : "",
            })}
          </div>
          <div className="truncate font-medium leading-tight text-slate-500 dark:text-slate-400 sm:text-base xl:text-sm 2xl:text-xl">
            {num}
          </div>
        </div>
      </div>
    </Card> */
  }
};

export default CardHome;
