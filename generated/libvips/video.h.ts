import {
  buf,
  cstringT,
  int,
} from "./typeDefinitions.ts";

export const im_video_test = {
  parameters: [
    buf(int), // im
    int, // brightness
    int, // error
  ],
  result: int,
} as const;

export const im_video_v4l1 = {
  parameters: [
    buf(int), // im
    cstringT, // device
    int, // channel
    int, // brightness
    int, // colour
    int, // contrast
    int, // hue
    int, // ngrabs
  ],
  result: int,
} as const;
