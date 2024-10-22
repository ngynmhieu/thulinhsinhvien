import { readData, writeData } from "./firebase"

// Khi chuyển trang câu hỏi bằng các phím mũi tên (-> bà <-), cập nhật lại chỉ số câu hỏi
// Bắt đầu từ 0
export async function updateIndexQuestion(index) {
    try {
        await writeData("exam/questionIndex", index);
    } catch (error) {
        console.log("Lỗi khi cập nhật câu hỏi")
    }
}

// Khi chuyển trang câu hỏi bằng các phím mũi tên (-> bà <-), cập nhật isRun thành false
// Khi ấn show câu hỏi => cập nhật isRun thành true
export async function updateIsRun(option) {
    try {
        await writeData("exam/isRun", option);
    } catch (error) {
        console.log("Lỗi khi cập nhật isRun")
        return null;
    }
}

