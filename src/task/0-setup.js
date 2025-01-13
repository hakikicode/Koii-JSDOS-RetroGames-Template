import { namespaceWrapper } from "@_koii/namespace-wrapper";
import { KoiiStorageClient } from "@_koii/storage-task-sdk";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import open from "open";

export async function setup() {
  console.log("CUSTOM SETUP");

  const files = [
    { cid: "bafybeidmakt2gll7skn344whg4pekslc7oekauswan7efgsu5a2yjfdy2a", name: "main.html" },
    { cid: "bafybeieik7mttaubfmsqeaofshvzwzg35ckdqlprudnq5lqzzyeiae46ki", name: "bundle.jsdos" },
    { cid: "bafybeiatydrn6mnqqf425nhnieqif2lamcqzjwlwtbndhta7e4l7vmw6pa", name: "js-dos.js" },
    { cid: "bafybeie36usyziyly3qlhkvcikmwozcz3e2btomu7pm63fw4ryf3cbn26e", name: "js-dos.css" },
  ];

  const basePath = await namespaceWrapper.getBasePath();
  const projectPrefix = path.join(basePath, "gamedir");

  try {
    if (!existsSync(projectPrefix)) mkdirSync(projectPrefix, { recursive: true });
    else console.log("Folder already exists.");
  } catch (error) {
    console.error("Error creating folder:", error);
    return;
  }

  const client = new KoiiStorageClient(undefined, undefined, true);
  for (const file of files) {
    const filePath = path.join(projectPrefix, file.name);

    if (!existsSync(filePath)) {
      try {
        console.log(`Downloading ${file.name}...`);
        const blob = await client.getFile(file.cid, file.name);
        const data = file.name.endsWith(".html") || file.name.endsWith(".js") || file.name.endsWith(".css")
          ? await blob.text()
          : Buffer.from(await blob.arrayBuffer());
        writeFileSync(filePath, data);
        console.log(`Downloaded ${file.name}`);
      } catch (error) {
        console.error(`Error downloading ${file.name}:`, error);
      }
    } else {
      console.log(`${file.name} already exists.`);
    }
  }

  const taskId = process.argv[3];
  if (taskId) {
    console.log(`Opening URL for Task ID: ${taskId}`);
    open(`http://localhost:30017/task/${taskId}/main.html`);
  }
}
