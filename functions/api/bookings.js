import { handleLeadOptions, handleLeadSubmission } from "../_lib/lead-handler.js";

export const onRequestPost = handleLeadSubmission;
export const onRequestOptions = handleLeadOptions;
