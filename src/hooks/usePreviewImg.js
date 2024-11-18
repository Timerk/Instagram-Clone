import { useState } from "react"
import useShowToast from "./useShowToast"

const usePreviewImg = () => {
    const[ selectedFile, setSelectedFile] = useState(false)
    const maxFileSize = 2 * 1024 * 1024
    const showToast = useShowToast()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSize) {
                showToast("Error", "File must be smaller than 2 MB", "error")
                setSelectedFile(null)
                return
            }

            const reader = new FileReader()

            reader.onload = () => {
                setSelectedFile(reader.result)
            }

            reader.readAsDataURL(file)

        }else{
            showToast("Error", "Please slect an image file", "error")
            setSelectedFile(null)
        }
    }

    return { selectedFile, handleImageChange, setSelectedFile }
}

export default usePreviewImg
