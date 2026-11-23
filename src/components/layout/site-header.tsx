import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Marca } from "@/components/verde/marca";
import { ThemeToggle } from "@/components/verde/theme-toggle";
import { navegacao } from "@/data/conteudo";
import { cn } from "@/lib/utils";

const classeLink = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative px-3 py-2 text-[13px] tracking-tight transition-colors",
    isActive
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground",
  );

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);
  const local = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-3">
          <Marca className="h-9 w-9 text-moss transition-transform duration-500 group-hover:rotate-6" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[18px] tracking-tight">
              Verde Nexia
            </span>
            <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
              CACC · Inteligência ambiental
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navegacao.map((item) => (
            <NavLink key={item.href} to={item.href} className={classeLink}>
              {({ isActive }) => (
                <span className="flex items-center gap-1.5">
                  {item.rotulo}
                  {isActive && (
                    <span className="h-1 w-1 rounded-full bg-moss" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link to="/contato">
              Contato
              <ArrowUpRight />
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/area-tecnica">
              <LockKeyhole />
              Área técnica
            </Link>
          </Button>

          <Sheet open={aberto} onOpenChange={setAberto}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] max-w-sm">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-3 font-display text-xl font-normal">
                  <Marca className="h-8 w-8 text-moss" />
                  Verde Nexia
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col">
                {navegacao.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center justify-between border-b border-border/70 py-3.5 text-[15px]",
                          isActive ? "text-moss" : "text-foreground",
                        )
                      }
                    >
                      {item.rotulo}
                      <ArrowUpRight className="h-4 w-4 opacity-40" />
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-2">
                <SheetClose asChild>
                  <Button asChild>
                    <Link to="/contato">Falar com o programa</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="outline">
                    <Link to="/area-tecnica">
                      <LockKeyhole />
                      Área técnica
                    </Link>
                  </Button>
                </SheetClose>
              </div>

              <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
                {local.pathname === "/"
                  ? "Mesquita · Rio de Janeiro"
                  : "CACC · Programa Verde Nexia"}
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
