import pino from "pino";

export const logger = pino({
  name: "tfs-app",
  level: "debug",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:standard" },
        }
      : undefined,
});

globalThis.console = {
  ...console,
  log: (...args) => logger.info(...args),
  info: (...args) => logger.info(...args),
  warn: (...args) => logger.warn(...args),
  error: (...args) => logger.error(...args),
  debug: (...args) => logger.debug(...args),
};
