import { readData, writeData } from "./firebase.js";

export async function getScoreOfSinhVien(name) {
  const scoreOfSinhVien = await readData(
    `examinees/${name}/chandungthulinh/sinhvien`
  );
  return scoreOfSinhVien;
}

export async function getScoreOfBgk(name) {
  const scoreOfBgk = await readData(
    `examinees/${name}/chandungthulinh/giamKhao`
  );
  const score =
  scoreOfBgk.nguyenducnguyen +
  scoreOfBgk.nguyentanvinh +
  scoreOfBgk.ongthingoclinh +
  scoreOfBgk.tranphuongngocthao +
  chandung.sinhvien.vote * 0.5;
return score;
  return scoreOfBgk;
}

export async function getScoreOfChandungthulinh(name) {
  const chandung = await readData(`examinees/${name}/chandungthulinh`);
  const score =
    chandung.giamKhao.nguyenducnguyen +
    chandung.giamKhao.nguyentanvinh +
    chandung.giamKhao.ongthingoclinh +
    chandung.giamKhao.tranphuongngocthao +
    chandung.sinhvien.vote * 0.5;
  return score;
}

// Trả về số điểm, vd: 60
export async function getCurrentPart2Score(name) {
  return await readData(`examinees/${name}/thulinhchinhphuc/currentScore`);
}

export async function getCurrentPart2addScore(name) {
  return await readData(`examinees/${name}/thulinhchinhphuc/plusScore`);
}

export async function setCurrentPart2Score(name, score) {
  await writeData(`examinees/${name}/thulinhchinhphuc/currentScore`, score);
}

export async function setCurrentPart2addScore(name, score) {
  await writeData(`examinees/${name}/thulinhchinhphuc/plusScore`, score);
}
