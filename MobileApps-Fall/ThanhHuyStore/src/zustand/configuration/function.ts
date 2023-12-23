import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import {  IConfiguration } from "@/zustand/configuration/type";
import {  setConfiguration } from "@/zustand/configuration/index";

export const requestConfiguration = async () => {
  try {
    const { data } = await axios.get<IConfiguration>(`https://${BASE_URL}/api/configurations`, {
      headers: {
        "accept": "text/plain"
      }
    });
    batch(() => {
      if (data) {
        setConfiguration(data);
      }
    });
  } catch (error) {
    console.error("Error sending request:", error);
  }
};

