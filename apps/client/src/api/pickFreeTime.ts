
import { http } from "./base";

export const pickFreeTime = (timeId: number, userId: number) => http.post("/pick-free-time", {
    timeId,
    userId,
});