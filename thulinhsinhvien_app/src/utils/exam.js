import { readData, writeData } from "./firebase"

export async function updateIndexQuestion(index) {
    try {
        await writeData("questionIndex", index);
    } catch (error) {
        console.log("Lỗi khi cập nhật câu hỏi")
    }
}