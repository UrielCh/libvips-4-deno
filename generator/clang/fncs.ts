import { libclang } from "./ffi.ts";
import { cxstringToString } from "./utils.ts";

/**
 * When called with `true`, installs error handler that prints error message
 * to stderr and calls abort(). This replaces the currently installed error
 * handler (if any).
 *
 * When called with `false`, removes the currently installed error handler (if any).
 * If no error handler is intalled, the default strategy is to print error
 * message to stderr and call exit(1).
 */
export const setAbortOnFatalError = (value: boolean): void => {
    if (value) {
        if ("clang_install_aborting_llvm_fatal_error_handler" in libclang.symbols) {
            libclang.symbols.clang_install_aborting_llvm_fatal_error_handler();
        }
    } else {
        if ("clang_uninstall_llvm_fatal_error_handler" in libclang.symbols) {
            libclang.symbols.clang_uninstall_llvm_fatal_error_handler();
        }
    }
};

/**
 * Return a version string, suitable for showing to a user, but not
 * intended to be parsed (the format is not guaranteed to be stable).
 *
 * @example
 * "clang version 14.0.6"
 */
export const getClangVersion = (): string =>
    cxstringToString(libclang.symbols.clang_getClangVersion());
/**
 * Return the timestamp for use with Clang's
 * `-fbuild-session-timestamp=` option.
 */
export const getBuildSessionTimestamp = (): bigint =>
    BigInt(libclang.symbols.clang_getBuildSessionTimestamp());

/**
 * Enable/disable crash recovery.
 *
 * @param isEnabled Flag to indicate if crash recovery is enabled.
 */
export const toggleCrashRecovery = (isEnabled: boolean) =>
    libclang.symbols.clang_toggleCrashRecovery(Number(isEnabled));
/** for debug/testing */
export const enableStackTraces = () =>
    libclang.symbols.clang_enableStackTraces();

