import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marca, TopoBackdrop } from "@/components/verde/marca";

const NotFound = () => {
  return (
    <section className="surface-forest relative flex min-h-[70vh] items-center overflow-hidden">
      <TopoBackdrop className="pointer-events-none absolute inset-0 h-full w-full text-[hsl(var(--paper))] opacity-10" />
      <div className="container-page relative py-20">
        <Marca className="h-12 w-12 text-[hsl(var(--moss-bright))]" />
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-[hsl(var(--moss-bright))]">
          Erro 404
        </p>
        <h1 className="display-title mt-3 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] text-[hsl(var(--paper))]">
          Esta página não faz parte do território mapeado
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[hsl(var(--paper)/0.7)]">
          O endereço acessado não existe ou foi movido. Volte à página inicial
          para percorrer os núcleos, o NOC Ambiental e os indicadores do
          programa.
        </p>
        <Button asChild variant="inverseSolid" className="mt-8">
          <Link to="/">
            <ArrowLeft />
            Voltar ao início
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
