import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import Handlebars from 'handlebars';

const makeUriAsWebviewUri = (
  context: vscode.ExtensionContext,
  webviewView: vscode.WebviewView,
  uri: string
) => {
  return webviewView!.webview
    .asWebviewUri(vscode.Uri.file(path.resolve(context.extensionPath, uri)))
    .toString();
};

/**
 * inject params to template
 */
export const getHtmlForWebview = (
  context: vscode.ExtensionContext,
  webviewView: vscode.WebviewView,
  bundleName: string
) => {
  const htmlTemplateUri = path.resolve(
    context.extensionPath,
    './dist/index.html'
  );
  const content = fs.readFileSync(htmlTemplateUri, 'utf-8');

  const template = Handlebars.compile(content);

  const sidebarBundleWebViewUri = makeUriAsWebviewUri(
    context,
    webviewView,
    `./dist/${bundleName}.bundle.js`
  );

  const html = template({
    scriptUris: [sidebarBundleWebViewUri],
  });

  return html;
};

export enum Status {
  Success = 'Success',
  Fail = 'Fail',
}
