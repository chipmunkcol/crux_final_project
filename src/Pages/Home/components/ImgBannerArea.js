import 메인광고배너 from "../../../Image/메인광고배너.png"

const ImgBannerArea = () => {
    return(
        <div style={{width:'1920px', height:'1000px', backgroundColor:'gray', color:'white'}}>
            <img src={메인광고배너} style={{width:'100%', height:'100%'}}/>
        </div>
    )
}

export default ImgBannerArea;