/**
 * Installs error handler that prints error message to stderr and calls abort().
 * Replaces currently installed error handler (if any).
 */
// deno-lint-ignore no-unused-vars
const clang_install_aborting_llvm_fatal_error_handler = {
  parameters: [],
  result: "void",
} as const;

/**
 * Removes currently installed error handler (if any).
 * If no error handler is intalled, the default strategy is to print error
 * message to stderr and call exit(1).
 */
// deno-lint-ignore no-unused-vars
const clang_uninstall_llvm_fatal_error_handler = {
  parameters: [],
  result: "void",
} as const;
