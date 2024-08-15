import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import MobHome from "../../components/messages/mobile/MobHome";
const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, []);
//   const isMobile = true;

  return (
    <div>
      {!isMobile ? (
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <Sidebar />
          <MessageContainer />
        </div>
      ) : (
        <div>
          <div className=' h-screen overflow-hidden rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <MobHome />
        </div>
        </div>
      )}
    </div>
  );
};
export default Home;
