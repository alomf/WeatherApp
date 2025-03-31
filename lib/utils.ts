import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes
 * intelligently to avoid conflicts.
 *
 * This utility function leverages `clsx` to conditionally join class names and
 * `twMerge` to handle Tailwind CSS class merging, ensuring that conflicting
 * classes are resolved correctly.
 *
 * @param inputs - An array of class values that can include strings, arrays, or objects
 *                 where the keys are class names and the values are conditions.
 * @returns A single string containing the merged and resolved class names.
 *
 * @example
 * ```typescript
 * const className = cn('bg-red-500', 'text-white', { 'p-4': true, 'm-2': false });
 * // Result: 'bg-red-500 text-white p-4'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
