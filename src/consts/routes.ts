import { ChartSplineIcon, FileMinus, Home, List, LucideProps, Settings } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface routePath{
    title:string
    url:string
    icon:ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const routes:Array<routePath> = [
  {
    title: "Inicio  ",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Crear nota",
    url: "order",
    icon: FileMinus,
  },
  {
    title: "Notas de remisión",
    url: "#",
    icon: List,
  },
  {
    title: "Reportes",
    url: "#",
    icon: ChartSplineIcon,
  },
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
  },
]