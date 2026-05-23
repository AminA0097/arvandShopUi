// config/nav.ts
import {
    House,
    ShoppingBag,
    User,
    ShoppingCart,
    BriefcaseBusiness,
    Footprints,
    Shirt,
    Handbag,
    Crown,
    Grid2X2,
} from "lucide-react";

// config/nav.ts
export const desktopNavItems = [
    {
        label: "مردانه",
        href: "/products/mens",
        children: [
            {
                label: "کیف",
                href: "/products/mens/bag",  // مسیر جدید
                icon: BriefcaseBusiness,
            },
            {
                label: "کفش",
                href: "/products/mens/shoes",
                icon: Footprints,
            },
            {
                label: "لباس",
                href: "/products/mens/cloths",
                icon: Shirt,
            },
        ],
    },
    {
        label: "زنانه",
        href: "/products/women",
        children: [
            {
                label: "کیف",
                href: "/products/womens/bag",
                icon: Handbag,
            },
            {
                label: "کفش",
                href: "/products/womens/shoes",
                icon: Footprints,
            },
            {
                label: "لباس",
                href: "/products/womens/cloths",
                icon: Shirt,
            },
        ],
    },
    {
        label: "اکسسوری",
        href: "/products/accessory",
        children: [
            {
                label: "کمربند",
                href: "/products/accessory/belt",
                icon: BriefcaseBusiness,
            },
            {
                label: "کلاه",
                href: "/products/accessory/hats",
                icon: Crown,
            },
            {
                label: "سایر",
                href: "/products/accessory/other",
                icon: Grid2X2,
            },
        ],
    },
];

export const mobileNavItems = [
    {
        label: "خانه",
        href: "/",
        icon: House,
    },
    {
        label: "دسته بندی",
        href: "/categories",
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