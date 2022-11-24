import { customAlphabet } from "nanoid"
const ENTROPY = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
/**
 * Generate a size 9 unique ID
 */
export const nanoid = customAlphabet(ENTROPY, 9)
