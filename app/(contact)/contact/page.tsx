import ContactPage from "@/components/Contact";
import { Particles } from "@/components/ui/particle";

const page = () => {
  return (
    <div className="relative">
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={10}
        color="#ffffff"
        refresh
      />
      <ContactPage />
    </div>
  );
};

export default page;
