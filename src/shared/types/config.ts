import { MainCategoryName , ProductType , ProductTag , Audience } from "./index"

export interface CategoryConfig {
    slug: string;
    label: string;
    description: string;
    image: string;
    allowedTypes: ProductType[];
}

export const CATEGORY_CONFIG: Record<MainCategoryName, CategoryConfig> = {
    men: {
        slug: "mens",
        label: "مردانه",
        description: "کیف، کفش و اکسسوری‌های چرمی مردانه",
        image: "/categories/men.jpg",
        allowedTypes: ["bag", "shoes", "cloths", "belt", "hats"],
    },
    women: {
        slug: "women",
        label: "زنانه",
        description: "کیف، کفش و اکسسوری‌های چرمی زنانه",
        image: "/categories/women.jpg",
        allowedTypes: ["bag", "shoes", "cloths", "belt", "hats"],
    },
    accessory: {
        slug: "accessory",
        label: "اکسسوری",
        description: "اکسسوری‌های چرمی خاص و منحصر به فرد",
        image: "/categories/accessory.webp",
        allowedTypes: ["belt", "wallet", "hats", "other"],
    },
    careTools:{
        slug : "careTools",
        label: "نگهداری از کفش",
        description:"وسایل نگه داری از کفش",
        image: "/categories/accessory.webp",
        allowedTypes: ["shoesWax"],
    },
};
export interface TypeConfig {
    slug: string;
    label: string;
    icon?: string;
    description: string;
    parentCategory?: MainCategoryName[];
}

export const TYPE_CONFIG: Record<ProductType, TypeConfig> = {
    bag: {
        slug: "bag",
        label: "کیف",
        description: "کیف‌های چرمی دستساز",
    },
    shoes: {
        slug: "shoes",
        label: "کفش",
        description: "کفش‌های چرمی با کیفیت",
    },
    cloths: {
        slug: "cloths",
        label: "لباس",
        description: "لباس‌های چرمی",
    },
    belt: {
        slug: "belt",
        label: "کمربند",
        description: "کمربندهای چرمی",
    },
    hats: {
        slug: "hats",
        label: "کلاه",
        description: "کلاه‌های چرمی شیک",
    },
    wallet: {
        slug: "wallet",
        label: "کیف پول",
        description: "کیف پول و کارت‌خوان",
    },
    other: {
        slug: "other",
        label: "سایر",
        description: "سایر محصولات چرمی",
    },
    shoesWax: {
        slug: "shoesWax",
        label:"واکس کفش" ,
        description:"واکس کفش های چرم" ,
    }
};
export interface TagConfig {
    slug: string;
    label: string;
    color?: string;
    description: string;
}

export const TAG_CONFIG: Record<ProductTag, TagConfig> = {
    premium: {
        slug: "premium",
        label: "پیشنهادی",
        description: "محصولات ویژه و پیشنهادی",
    },
    leather: {
        slug: "leather",
        label: "چرم",
        description: "محصولات چرم طبیعی",
    },
    new: {
        slug: "new",
        label: "جدید",
        description: "جدیدترین محصولات",
    },
    hot: {
        slug: "hot",
        label: "داغ",
        description: "محصولات پرفروش",
    },
    summer: {
        slug: "summer",
        label: "تابستونی",
        description: "مناسب فصل تابستان",
    },
};
export interface AudienceConfig {
    slug: string;
    label: string;
    description: string;
}

export const AUDIENCE_CONFIG: Record<Audience, AudienceConfig> = {
    mens: {
        slug: "mens",
        label: "مردانه",
        description: "محصولات مخصوص آقایان",
    },
    women: {
        slug: "women",
        label: "زنانه",
        description: "محصولات مخصوص بانوان",
    },
    unisex: {
        slug: "unisex",
        label: "یونیسکس",
        description: "مناسب برای همه",
    },
};
export const categoriesList = Object.entries(CATEGORY_CONFIG).
map(([name, config]) => ({
    name: name as MainCategoryName,
    ...config,
}));

export const typesList = Object.entries(TYPE_CONFIG).
map(([type, config]) => ({
    type: type as ProductType,
    ...config,
}));

export const tagsList = Object.entries(TAG_CONFIG).
map(([tag, config]) => ({
    tag: tag as ProductTag,
    ...config,
}));

export const audienceList = Object.entries(AUDIENCE_CONFIG).
map(([audience, config]) => ({
    audience: audience as Audience,
    ...config,
}));
export const getCategoryRoute = (category: MainCategoryName) =>
    `/products/${CATEGORY_CONFIG[category].slug}`;

export const getCategoryTypeRoute = (category: MainCategoryName, type: ProductType) =>
    `/products/${CATEGORY_CONFIG[category].slug}/${TYPE_CONFIG[type].slug}`;

export const getProductRoute = (category: MainCategoryName, productId: string) =>
    `/products/${CATEGORY_CONFIG[category].slug}/${productId}`;

export const getTypeRoute = (type: ProductType) =>
    `/products/types/${TYPE_CONFIG[type].slug}`;

export const getTagRoute = (tag: ProductTag) =>
    `/products/tags/${TAG_CONFIG[tag].slug}`;