"use client"

import { useState, useEffect, Fragment } from "react";
import { useAtomValue } from "jotai";
import { homePageMessage } from "@/contexts/messages";

export default function Page() {
  const message = useAtomValue(homePageMessage);
  const [contextMessage, setContextMessage] = useState("");

  useEffect(() => {
    if (message) {
        contextMessageHandler(message);
      }
    }, [message])

  const contextMessageHandler = (message: string) => {
    setContextMessage(message);
    setTimeout(() => {
        setContextMessage("");
    }, 6000)
  }

  return (
    <Fragment>
      {contextMessage && <div>
                <p className="bg-green-600 text-white p-3 rounded-lg mt-3 md:w-max">{contextMessage}</p>
          </div>}
      <div className="gradient md:mx-auto md:w-2/3 h-96 p-2 space-y-2 rounded-lg animate-wiggle shadow-black shadow-2xl mt-8">
        <h1 className="dark:text-black text-4xl font-bold text-white">Insert your contact</h1>
        <p className="dark:text-black text-white">In this platform you can search for every contact with their phone numbers,names and addresses...</p>
        <div className="flex justify-center">
          <button className="dark:text-black dark:hover:bg-purple-200 mt-10 transition active:scale-75 cursor-pointer bg-white text-indigo-800 hover:bg-indigo-100 py-3 px-6 rounded-full ">Add contact</button>
        </div>
      </div>
    </Fragment>
  )
}
