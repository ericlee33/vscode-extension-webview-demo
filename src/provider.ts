import * as vscode from 'vscode';
import { getHtmlForWebview } from './utils';
import { test } from './handler';

export interface Message {
  type: string;
  payload?: Record<string, any>;
}

export class SidebarProvider implements vscode.WebviewViewProvider {
  constructor(protected context: vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = getHtmlForWebview(
      this.context,
      webviewView,
      'sidebar'
    );

    webviewView.webview.onDidReceiveMessage(async (message: Message) => {
      let msg = '';

      switch (message.type) {
        case 'test': {
          msg = await test();
          break;
        }
      }

      webviewView.webview.postMessage({
        type: message.type,
        payload: {
          message: msg,
        },
      });
    });
  }
}
