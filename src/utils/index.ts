import useClipboard from "vue-clipboard3";

export const copy = async (text: string) => {
  const { toClipboard } = useClipboard();
  try {
    await toClipboard(text); //实现复制
  } catch (e) {
    console.error(e);
  }
};

//随机生成RGB颜色
export const randomRgbaColor = () => {
  var r = Math.floor(Math.random() * 256); //随机生成256以内r值
  var g = Math.floor(Math.random() * 256); //随机生成256以内g值
  var b = Math.floor(Math.random() * 256); //随机生成256以内b值
  return `rgb(${r},${g},${b})`; //返回rgba(r,g,b,a)格式颜色
};
