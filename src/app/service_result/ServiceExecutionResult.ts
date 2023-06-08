
export interface ServiceExecutionResult {
  /** The execution successful. */
  executionSuccessful: boolean;

  /** The success code. */
  successCode:string;

  /** The error code. */
  errorCode:string;

  /** The message. */
  message: string;
}

