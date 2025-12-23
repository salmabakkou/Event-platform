import api from "./axiosConfig";

export const addEvent=(eventData)=>{
    return api.post("/events",eventData);
};