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

export const desktopNavItems = [
    {
        label: "مردانه",

        href: "/mens",

        children: [
            {
                label: "کیف",
                href: "/mens/bag",
                icon: BriefcaseBusiness,
            },

            {
                label: "کفش",
                href: "/mens/shoes",
                icon: Footprints,
            },

            {
                label: "لباس",
                href: "/mens/cloths",
                icon: Shirt,
            },
        ],
    },

    {
        label: "زنانه",

        href: "/womens",

        children: [
            {
                label: "کیف",
                href: "/womens/bag",
                icon: Handbag,
            },

            {
                label: "کفش",
                href: "/womens/shoes",
                icon: Footprints,
            },

            {
                label: "لباس",
                href: "/womens/cloths",
                icon: Shirt,
            },
        ],
    },

    {
        label: "اکسسوری",

        href: "/accessory",

        children: [
            {
                label: "کمربند",
                href: "/accessory/belt",
                icon: BriefcaseBusiness,
            },

            {
                label: "کلاه",
                href: "/accessory/hats",
                icon: Crown,
            },

            {
                label: "سایر",
                href: "/accessory/other",
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