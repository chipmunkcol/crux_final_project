import NavSlider from './components/NavSlider'
import CrewArea from './components/CrewArea';
import GymArea from './components/GymArea';
import ImgBannerArea from './components/ImgBannerArea';
import GalaryArea from './components/GalaryArea';
import Navbar from './components/Navbar'
import MainBanner from './components/MainBanner';
import Footer from '../../Shared/Footer';
import styled from 'styled-components';


function Home() {


  return (
    <Container>
        <Navbar />

        <NavSlider />

      {/* 메인 배너 */}
        <MainBanner />

        <CrewArea />

        <GymArea />

        <ImgBannerArea />

        <GalaryArea />

        <Footer />

    </Container>
  );
}

const Container = styled.div`
width: 192rem;
`

export default Home;