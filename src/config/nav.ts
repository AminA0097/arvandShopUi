import {
    House,
    ShoppingBag,
    User,
    ShoppingCart,
    Gem,
    Footprints,
    Flame,
    Grid2X2,
} from "lucide-react";

export const desktopNavItems = [
    {
        label: "کیف",
        href: "/bags",
        icon: ShoppingBag,
    },
    {
        label: "کفش",
        href: "/shoes",
        icon: Footprints,
    },
    {
        label: "اکسسوری",
        href: "/accessories",
        icon: Gem,
    },
    {
        label: "کلاه",
        href: "/hot",
        icon: Flame,
    },
    {
        label: "محصولات",
        href: "/products",
        icon: Grid2X2,
    },
];

export const mobileNavItems = [
    {
        label: "خانه",
        href: "/",
        icon: House,
    },
    {
        label: "محصولات",
        href: "/products",
        icon: ShoppingBag,
    },
    {
        label: "سبد خرید",
        href: "/cart",
        icon: ShoppingCart,
    },
    {
        label: "کاربری",
        href: "/profile",
        icon: User,
    },
];