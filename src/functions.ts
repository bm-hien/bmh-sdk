import type { BotContext, BotFlowFunction, BotHandler } from './types';

export function defineFlowFunction(name: string, handler: BotHandler): BotFlowFunction {
  const functionName = String(name ?? '').trim();
  if (!functionName || functionName.length > 64) throw new Error('A flow function name must be 1-64 characters.');
  if (typeof handler !== 'function') throw new Error('A flow function requires a handler.');
  return Object.freeze({ __bmhFlowFunction: true as const, name: functionName, handler });
}

export function isFlowFunction(value: unknown): value is BotFlowFunction {
  return Boolean(value && typeof value === 'object'
    && (value as Partial<BotFlowFunction>).__bmhFlowFunction === true
    && typeof (value as Partial<BotFlowFunction>).name === 'string'
    && typeof (value as Partial<BotFlowFunction>).handler === 'function');
}

export async function runFlowFunction(flowFunction: BotFlowFunction, context: BotContext) {
  if (!isFlowFunction(flowFunction)) throw new Error('ctx.run() requires a function created with defineFlowFunction().');
  return flowFunction.handler(context);
}
