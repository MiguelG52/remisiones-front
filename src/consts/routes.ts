import { ChartSplineIcon, FileMinus, Home, List, LucideProps, Settings, ShieldUser, UserCog, Users } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface routePath{
    title:string
    url:string
    icon:ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const routes:Array<routePath> = [
  {
    title: "Inicio  ",
    url: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clients?page=1",
    icon: Users,
  },
  {
    title: "Crear nota",
    url: "/order",
    icon: FileMinus,
  },
  {
    title: "Notas de remisión",
    url: "/orders-list?page=1",
    icon: List,
  },
  {
    title: "Reportes",
    url: "#",
    icon: ChartSplineIcon,
  },
  {
    title: "Administrador",
    url: "/administrator",
    icon: ShieldUser,
  },
]