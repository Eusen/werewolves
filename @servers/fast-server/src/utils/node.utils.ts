export const $fs = require('fs');
export const $path = require('path');
export const $os = require('os');

export function getArg(name: string | number) {
  if (typeof name == "number") {
    return process.argv[name + 2];
  } else {
    for (let i = 2; i < process.argv.length; i++) {
      const arg = process.argv[i];
      if (arg.startsWith(`--${name}=`)) {
        return arg.replace(`--${name}=`, '');
      }

      if (arg.startsWith(`--${name}`)) {
        return process.argv[i + 1];
      }
    }
  }
}

export function hasArg(name: string) {
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith(`--${name}=`)) {
      return arg.replace(`--${name}=`, '') === 'true';
    }

    if (arg.startsWith(`--${name}`)) {
      return true;
    }
  }
  return false;
}
