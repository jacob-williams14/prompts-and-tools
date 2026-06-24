/**
 * Configuration constants. Only values actually used by the surviving code.
 */

export const CONFIG = {
	// Git Processing (used by tools/extractGitData.ts)
	PROCESSED_DATA_DIR: "data/processed",
	MAX_COMMITS_TO_ANALYZE: 500,
	COMMIT_MESSAGE_MAX_LENGTH: 200,
} as const;

// Type for configuration
export type ConfigType = typeof CONFIG;
