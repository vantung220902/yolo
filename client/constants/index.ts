import img1 from "../assets/slider/slide_1.png"
import img2 from "../assets/slider/slide_2.png"
import img3 from "../assets/slider/slide_3.png"
export const API_END_POINT = 'http://localhost:4000/api/';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const LIMIT_LOAD_PRODUCT = 4

export const sliderData = [
    {
        title: "Polo women Pima High-grade",
        description: " Referring to level of customer, it is impossible not to mention the pima fabric line. It creates the best quality for any fashion product. The pima yarn is twice as long and thicker than regular cotton yarn thanks to advanced weaving technology. That makes the structure of the polo shirt strong, durable, minimizes ruffles, smooth, colorfast, extremely ensuring the user's health.",
        img: img1,

        path: "/catalog/ao-thun-dinosaur-01"
    },
    {
        title: "Polo Women Smoothly Modal",
        description: "Modal women's polo shirt uses high-quality environmentally friendly fabric technology to produce exclusive anti-shrink fabric, modal women's polo shirt is a suitable product for those of you who have today's dynamic working environment.",
        img: img2,
        path: "/catalog/ao-thun-dinosaur-02",
    },
    {
        title: "Polo Women Coolmax Lacoste",
        description: "Women's polo shirt model is made of coolmax material that feels cool to wear. This coolmax polo shirt design features an ultra-comfortable fit. Creating neatness promises to be a very hot polo shirt model in the near future",
        img: img3,
        path: "/catalog/ao-thun-dinosaur-03",
    }
]
export const listColor = ['red', 'green', 'white', 'pink', 'yellow', 'orange', 'blue', 'brown', 'violet']
export const listColor2 = ['red', 'green', 'white', 'pink']
export const listSize = ['S','m','l','xl','xxl']