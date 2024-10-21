import { readData, writeData } from "./firebase";

export async function updateIndexProcess(name) {
  if (name == "hoaikhanh") await writeData("process/index", 0);
  else if (name == "haiyen") await writeData("process/index", 1);
  else if (name == "dinhphong") await writeData("process/index", 2);
  else if (name == "hoainam") await writeData("process/index", 3);
  else if (name == "thaovi") await writeData("process/index", 4);
  else if (name == "ngocquy") await writeData("process/index", 5);
  else if (name == "done") await writeData("process/index", -1);
}

export async function getIndexProcess() {
  return await readData("process/index");
}

export async function getRemainingTime(name) {
  let index;
  if (name == "hoaikhanh") index = 0;
  else if (name == "haiyen") index = 1;
  else if (name == "dinhphong") index = 2;
  else if (name == "hoainam") index = 3;
  else if (name == "thaovi") index = 4;
  else if (name == "ngocquy") index = 5;

  return await readData(`process/steps/${index}/remainingTime`);
}

export async function updateRemainingTime(name, remainingTime) {
  let index;
  if (name == "hoaikhanh") index = 0;
  else if (name == "haiyen") index = 1;
  else if (name == "dinhphong") index = 2;
  else if (name == "hoainam") index = 3;
  else if (name == "thaovi") index = 4;
  else if (name == "ngocquy") index = 5;

  // Cập nhật remainingTime trong Firebase
  await writeData(`process/steps/${index}/remainingTime`, remainingTime);
}

export async function updateIsProcessing(isRun) {
  const process = await readData(`process`);
  const index = process.index
  await writeData(`process/steps/${index}/isProcessing`, isRun)
}

// Load trang => load remainingTime 
// Ấn enter thì đếm ngược, câpj nhật isProcessing thành true
// Vừa đếm ngược vừa up lại lên db
// Ấn enter lần nữa thì dừng đếm ngược, câpj nhật isProcessing thành fasle
// Hết giờ thì giữ nguyên giao diện

