import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
const createBuffer = require("./fileContent");

const log = (str: string) => {
  vscode.window.showWarningMessage(str, { modal: true });
};

export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  let commandOfGeneraterComp = vscode.commands.registerCommand(
    "generaterComp",
    (uri) => {
      const dirPath = uri.path.substring(1);
      fs.stat(dirPath, async (err: any, stats: any) => {
        if (err) {
          log(`获取文件时遇到错误了${err}!!!`);
        }
        if (stats.isFile()) {
          log("是文件,请重新选择");
        }
        if (stats.isDirectory()) {
          const compName = await vscode.window.showInputBox({
            placeHolder: "请输入组件名称",
          });
          if (compName) {
            const compDir = path.resolve(dirPath, `./${compName}`);
            fs.mkdir(compDir, (err) => {
              if (err) {
                return;
              }
              const tsxPath = path.resolve(
                dirPath,
                `./${compName}/${compName}.tsx`
              );
              const tsPath = path.resolve(dirPath, `./${compName}/index.ts`);
              const lessPath = path.resolve(
                dirPath,
                `./${compName}/${compName}.less`
              );
              fs.writeFileSync(tsxPath, createBuffer.createTsxBuffer(compName));
              fs.writeFileSync(tsPath, createBuffer.createTsBuffer(compName));
              fs.writeFileSync(lessPath, createBuffer.createLessBuffer());
            });
          }
        }
      });
    }
  );

  // 将命令放入其上下文对象中，使其生效
  context.subscriptions.push(commandOfGeneraterComp);
}

// this method is called when your extension is deactivated
export function deactivate() {}
