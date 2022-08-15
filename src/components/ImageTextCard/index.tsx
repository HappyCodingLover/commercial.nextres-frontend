interface IImageTextCard {
  img: string
  title?: string
  content: string
}
export const ImageTextCard = ({ img, title = '', content }: IImageTextCard) => {
  return (
    <div className="image-text-card-container bg-sky-50 rounded-2xl	p-4 md:p-10 w-full mb-5 z-40">
      <div className="img-container h-24">
        <img src={img} alt="image-card-img" />
      </div>
      {title.length > 0 && (
        <div className="title-container pt-4 font-bold text-shade-blue text-[20px] md:text-[32px]">{title}</div>
      )}
      <div className="content-container pt-6 md:text-[20px]">{content}</div>
    </div>
  )
}
