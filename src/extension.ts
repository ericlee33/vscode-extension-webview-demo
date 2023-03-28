import * as vscode from 'vscode';
import { SidebarProvider } from './provider';

/**
 * entry -> register webview
 */
export function activate(context: vscode.ExtensionContext) {
  const sidebarPanel = new SidebarProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('vs-sidebar-view', sidebarPanel)
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
