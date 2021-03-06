import { Collection } from 'discord.js';
import { ICommand } from '../classes/Command';
import { CommandInfo } from '../classes/CommandInfo';
import { perms } from '../config';

export const commands: Collection<string, ICommand> = new Collection();
export const commandGroups: Collection<string, ICommand[]> = new Collection();
export const commandInfos: Collection<string, CommandInfo> = new Collection();

export function findCommand(query: string): ICommand | undefined {
  let command = commands.get(query.toLowerCase());
  if (!command) {
    const cmdArray = commands.array();
    command = cmdArray.find(
      cmd => cmd.aliases && cmd.aliases.find(al => al.toLowerCase() === query.toLowerCase())
    );
  }

  return command;
}

export function getCommandOverride(query: string): ICommand | undefined {
  const info = commandInfos.find(
    cmd_info => cmd_info.name.toLowerCase() === query || cmd_info.aliases.includes(query.toLowerCase())
  );

  if (info) {
    if (!info.override) return;
    const grp = findCommandGroup(info.name);
    if (grp) return grp.find(cmd => cmd.name.toLowerCase() === info.override.toLowerCase());
  }
}

export function findCommandGroup(query: string) {
  let grp = commandGroups.get(query);
  if (!grp) {
    const info = getInfo(query);
    if (info) grp = info.commands;
  }
  return grp;
}

export function findCommandInfo(query: string) {
  return getInfo(query);
}

function getInfo(query: string): CommandInfo {
  return commandInfos.find(
    info => info.name.toLowerCase() === query.toLowerCase() || info.aliases.includes(query.toLowerCase())
  );
}

export function hasPerms(userId: string, query: string): boolean {
  //Get ID's
  const permsFound = findCommandInfo(query)?.perms || findCommand(query)?.perms;

  //If none set then this command does not require permissions to use
  if (!permsFound || permsFound.length === 0) return true;

  for (let i = 0; i < permsFound.length; i++) {
    const permName = permsFound[i].toLowerCase();
    const perm = perms.find(p => p.name.toLowerCase() === permName);
    if (perm?.users.includes(userId)) return true;
  }

  return false;
}

export function getUserPerms(userId: string) {
  return perms.filter(p => p.users.includes(userId));
}

export function userHasPerm(userId: string, permName: string) {
  const userPerms = getUserPerms(userId)
  return userPerms.find(p => p.name === permName)
}
