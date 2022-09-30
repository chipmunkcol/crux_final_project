import NavSlider from './components/NavSlider'
import CrewArea from './components/CrewArea';
import GymArea from './components/GymArea';
import ImgBannerArea from './components/ImgBannerArea';
import GalaryArea from './components/GalaryArea';
import Navbar from './components/Navbar'
import MainBanner from './components/MainBanner';

function Home() {


  return (
    <div>
      <Navbar />

      <NavSlider />

    {/* 메인 배너 */}
      <MainBanner />

      <CrewArea />

      <GymArea />

      <ImgBannerArea />

      <GalaryArea />

    </div>
  );
}

export default Home;