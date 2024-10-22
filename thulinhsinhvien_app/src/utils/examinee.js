import { readData } from "./firebase.js";

export async function getScoreOfSinhVien(name) {
  const scoreOfSinhVien = await readData(`examinees/${name}/chandungthulinh/sinhvien`);
  return scoreOfSinhVien;
}

export async function getScoreOfBgk(name) {
  const scoreOfBgk = await readData(`examinees/${name}/chandungthulinh/giamKhao`);
  return scoreOfBgk;
}

export async function getTotalScore(name) {
  const scoreOfBgk = await readData(`examinees/${name}/totalScores`);
  return scoreOfBgk;
}

export async function getScoreOfChandungthulinh(name) {
  const chandung = await readData(`examinees/${name}/chandungthulinh`);
  const score = chandung.giamKhao + chandung.sinhvien.vote * 0.5;
  return score;
}

export async function getCurrentPart2Score(name) {

}

export async function getCurrentPart2addScore(name) {
  
}


export async function setCurrentPart2Score(name) {

}

export async function setCurrentPart2addScore(name) {
  
}

