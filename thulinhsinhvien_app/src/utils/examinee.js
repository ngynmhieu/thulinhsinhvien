import { readData } from "./firebase.js";

export async function getScoreOfSinhVien(name) {
  const scoreOfSinhVien = await readData(`examinees/${name}/sinhvien`);
  return scoreOfSinhVien;
}

export async function getScoreOfBgk(name) {
  const scoreOfBgk = await readData(`examinees/${name}/giamKhao`);
  //const scoreOfBgk = readData(`exmaniees`);
  return scoreOfBgk;
}

export async function getTotalScore(name) {
  const scoreOfBgk = await readData(`examinees/${name}/totalPoints`);
  return scoreOfBgk;
}

export async function login(username, password) {
  try {
    // Đọc dữ liệu từ Firebase
    const accounts = await readData("accounts");

    // Kiểm tra dữ liệu có tồn tại không
    if (!accounts || typeof accounts !== "object") {
      console.log("Xảy ra lỗi khi đọc dữ liệu về tài khoản");
      return false;
    }

    const accountList = Object.values(accounts);

    // Tìm kiếm tài khoản
    const isValid = accountList.some(
      (account) =>
        account.username === username && account.password === password
    );

    // Trả về kết quả
    return isValid;
  } catch (error) {
    console.error(`Xảy ra lỗi trong quá trình đăng ký: ${username}`, error);
    return false;
  }
}
