import earbuds from "../assets/images/product_images/earbuds.png";
import laptop from "../assets/images/product_images/laptop.png";
import portableSpeaker from "../assets/images/product_images/portable_speaker.png";
import smartphone from "../assets/images/product_images/smartphone.png";
import smartwatch from "../assets/images/product_images/smartwatch.png";
import tablet from "../assets/images/product_images/tablet.png";
import webcam from "../assets/images/product_images/webcam.png";
import smartAssistant from "../assets/images/product_images/smart_assistant.png";
const productImages = {
  earbuds: earbuds,
  laptop: laptop,
  "portable speaker": portableSpeaker,
  smartphone: smartphone,
  smartwatch: smartwatch,
  tablet: tablet,
  "web camera": webcam,
  "smart assistant": smartAssistant,
};

export const enrichProduct = (product) => {
  return { ...product, image: productImages[product.title.toLowerCase()] };
};
