import type { NextPage } from "next";
import { PageContainer } from "../components/page-container";
import Image from "next/image";
import bgImage from "../components/404.png";
const FourOhFour: NextPage = () => (
  <PageContainer>
    <Image src={bgImage} alt="404 baby!" />
    <p>I don&apos;t know what this picture is, but it seems suitable.</p>
  </PageContainer>
);

export default FourOhFour;
