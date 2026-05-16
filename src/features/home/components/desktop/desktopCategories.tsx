"use client";

import Link from "next/link";

const categories = [
    {
        title: "کیف",
        image: "/images/cat-bag.jpg",
        href: "/products/mens/bag",
    },
    {
        title: "کفش",
        image: "/images/cat-shoes.jpg",
        href: "/products/mens/shoes",
    },
    {
        title: "کمربند",
        image: "/images/cat-belt.jpg",
        href: "/products/mens/belt",
    },
    {
        title: "اکسسوری",
        image: "/images/cat-acc.jpg",
        href: "/products/mens/accessory",
    },
];

export default function DesktopCategories() {
    return (
        <section>
            <div className="grid grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Link
                        key={cat.title}
                        href={cat.href}
                        className="group"
                    >
                        <div
                            className="
                                overflow-hidden
                                rounded-[28px]
                                bg-white
                            "
                        >
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition
                                        duration-700
                                        group-hover:scale-105
                                    "
                                />
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg">
                                    {cat.title}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}