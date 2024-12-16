import { useState } from "react"
import useShowToast from "./useShowToast"

const useLoadImages = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const showToast = useShowToast() 

    const loadImages = async ({posts}) => {
        if (!posts) return
        try {    
            await Promise.all(    
                posts.map(post => {
                    return new Promise((resolve, reject) => {
                        const img = new Image()
                        img.src = post.imageURL
                        img.onload = resolve
                        img.onerror = resolve 
                    })
                })
            )
            setImagesLoaded(true)    
        } catch (error) {
            showToast("Error", "Some images could not be loaded", "error")
            setImagesLoaded(true) 
        }
    }

    return { imagesLoaded, loadImages }
}

export default useLoadImages