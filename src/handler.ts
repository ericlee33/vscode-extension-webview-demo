import { spawn } from 'child_process';
import * as vscode from 'vscode';
import { Status } from './utils';

function getWorkspaceRootPath() {
  const folders = vscode.workspace.workspaceFolders;
  if (folders && folders.length > 0) {
    return `${folders[0].uri.fsPath}`;
  }
  return '';
}

export const test = () => {
  return new Promise<string>((resolve, reject) => {
    const child = spawn('npm', ['run', 'test'], {
      cwd: getWorkspaceRootPath(),
    });
    child.stdout.on('data', (data: any) => {
      const dataString = data?.toString() || '';
      if (dataString.includes(Status.Success)) {
        resolve('Success');
      }
    });
    child.stderr.on('data', (data: any) => {
      reject(Status.Fail);
    });
    child.on('close', (code: any) => {
      if (code !== 0) {
        reject(Status.Fail);
      }

      resolve(Status.Success);
    });
  });
};
