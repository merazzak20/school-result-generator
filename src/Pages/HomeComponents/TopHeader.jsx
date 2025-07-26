import { PiGraduationCap } from "react-icons/pi";
import Container from "../../Components/Shared/Container";

const TopHeader = () => (
  <Container>
    <div className="bg-blue-600 text-white rounded-t-xl px-6 py-4">
      <h1 className="text-xl font-semibold inline-flex items-center gap-3">
        <PiGraduationCap className="font-bold text-xl" /> Student Report Card
        Generator
      </h1>
    </div>
  </Container>
);

export default TopHeader;
