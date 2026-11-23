import { Suspense, lazy } from "react";
import { SiteLayout } from "./components/layout/site-layout";

const Inicio = lazy(() => import("./pages/Inicio"));
const Programa = lazy(() => import("./pages/Programa"));
const Projetos = lazy(() => import("./pages/Projetos"));
const ProjetoDetalhe = lazy(() => import("./pages/ProjetoDetalhe"));
const Noc = lazy(() => import("./pages/Noc"));
const Governanca = lazy(() => import("./pages/Governanca"));
const Cronograma = lazy(() => import("./pages/Cronograma"));
const Indicadores = lazy(() => import("./pages/Indicadores"));
const Contato = lazy(() => import("./pages/Contato"));
const AreaTecnica = lazy(() => import("./pages/AreaTecnica"));
const NotFound = lazy(() => import("./pages/NotFound"));

const carregando = (
  <div className="container-page flex min-h-[60vh] items-center justify-center">
    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      Carregando…
    </span>
  </div>
);

export const routers = [
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        index: true,
        name: "home",
        element: (
          <Suspense fallback={carregando}>
            <Inicio />
          </Suspense>
        ),
      },
      {
        path: "programa",
        name: "programa",
        element: (
          <Suspense fallback={carregando}>
            <Programa />
          </Suspense>
        ),
      },
      {
        path: "projetos",
        name: "projetos",
        element: (
          <Suspense fallback={carregando}>
            <Projetos />
          </Suspense>
        ),
      },
      {
        path: "projetos/:slug",
        name: "projeto",
        element: (
          <Suspense fallback={carregando}>
            <ProjetoDetalhe />
          </Suspense>
        ),
      },
      {
        path: "noc",
        name: "noc",
        element: (
          <Suspense fallback={carregando}>
            <Noc />
          </Suspense>
        ),
      },
      {
        path: "governanca",
        name: "governanca",
        element: (
          <Suspense fallback={carregando}>
            <Governanca />
          </Suspense>
        ),
      },
      {
        path: "cronograma",
        name: "cronograma",
        element: (
          <Suspense fallback={carregando}>
            <Cronograma />
          </Suspense>
        ),
      },
      {
        path: "indicadores",
        name: "indicadores",
        element: (
          <Suspense fallback={carregando}>
            <Indicadores />
          </Suspense>
        ),
      },
      {
        path: "contato",
        name: "contato",
        element: (
          <Suspense fallback={carregando}>
            <Contato />
          </Suspense>
        ),
      },
      {
        path: "area-tecnica",
        name: "area-tecnica",
        element: (
          <Suspense fallback={carregando}>
            <AreaTecnica />
          </Suspense>
        ),
      },
      /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
      {
        path: "*",
        name: "404",
        element: (
          <Suspense fallback={carregando}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
