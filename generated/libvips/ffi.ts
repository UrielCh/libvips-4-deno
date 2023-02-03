import * as fncDbuf from "./dbuf.h.ts";
import * as fncGenerate from "./generate.h.ts";
import * as fncVideo from "./video.h.ts";
import * as fncAlmostdeprecated from "./almostdeprecated.h.ts";
import * as fncArithmetic from "./arithmetic.h.ts";
import * as fncImage from "./image.h.ts";
import * as fncRegion from "./region.h.ts";
import * as fncType from "./type.h.ts";
import * as fncIntl from "./intl.h.ts";
import * as fncForeign from "./foreign.h.ts";
import * as fncConversion from "./conversion.h.ts";
import * as fncObject from "./object.h.ts";
import * as fncBasic from "./basic.h.ts";
import * as fncDispatch from "./dispatch.h.ts";
import * as fncMask from "./mask.h.ts";
import * as fncThreadpool from "./threadpool.h.ts";
import * as fncHistogram from "./histogram.h.ts";
import * as fncMosaicing from "./mosaicing.h.ts";
import * as fncGate from "./gate.h.ts";
import * as fncCreate from "./create.h.ts";
import * as fncOperation from "./operation.h.ts";
import * as fncDraw from "./draw.h.ts";
import * as fncSbuf from "./sbuf.h.ts";
import * as fncConnection from "./connection.h.ts";
import * as fncVector from "./vector.h.ts";
import * as fncThread from "./thread.h.ts";
import * as fncBuf from "./buf.h.ts";
import * as fncVips7compat from "./vips7compat.h.ts";
import * as fncFormat from "./format.h.ts";
import * as fncUtil from "./util.h.ts";
import * as fncConvolution from "./convolution.h.ts";
import * as fncResample from "./resample.h.ts";
import * as fncMemory from "./memory.h.ts";
import * as fncMorphology from "./morphology.h.ts";
import * as fncVips from "./vips.h.ts";
import * as fncInterpolate from "./interpolate.h.ts";
import * as fncColour from "./colour.h.ts";
import * as fncError from "./error.h.ts";
import * as fncTransform from "./transform.h.ts";
import * as fncHeader from "./header.h.ts";
import * as fncPrivate from "./private.h.ts";
import * as fncFreqfilt from "./freqfilt.h.ts";

const IMPORTS = {
  ...fncDbuf,
  ...fncGenerate,
  ...fncVideo,
  ...fncAlmostdeprecated,
  ...fncArithmetic,
  ...fncImage,
  ...fncRegion,
  ...fncType,
  ...fncIntl,
  ...fncForeign,
  ...fncConversion,
  ...fncObject,
  ...fncBasic,
  ...fncDispatch,
  ...fncMask,
  ...fncThreadpool,
  ...fncHistogram,
  ...fncMosaicing,
  ...fncGate,
  ...fncCreate,
  ...fncOperation,
  ...fncDraw,
  ...fncSbuf,
  ...fncConnection,
  ...fncVector,
  ...fncThread,
  ...fncBuf,
  ...fncVips7compat,
  ...fncFormat,
  ...fncUtil,
  ...fncConvolution,
  ...fncResample,
  ...fncMemory,
  ...fncMorphology,
  ...fncVips,
  ...fncInterpolate,
  ...fncColour,
  ...fncError,
  ...fncTransform,
  ...fncHeader,
  ...fncPrivate,
  ...fncFreqfilt,
} as const;

export type libShape = ReturnType<typeof Deno.dlopen<typeof IMPORTS>>;

export function getLib(path: string): libShape {
  return Deno.dlopen(path, IMPORTS);
}