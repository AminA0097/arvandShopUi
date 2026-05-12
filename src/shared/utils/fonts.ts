import localFont from 'next/font/local';

export const shabnam = localFont({
    src: [
        {
            path: '../../../public/fonts/Shabnam.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-shabnam',
    display: 'swap',
});

export const tanha = localFont({
    src: [
        {
            path: '../../../public/fonts/Tanha.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-tanha',
    display: 'swap',
});
export const mosalas = localFont({
    src: [
        {
            path: '../../../public/fonts/A-Mosalas.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-mosalas',   // was '--font-tanha'
    display: 'swap',
});

export const tanhaFD = localFont({
    src: [
        {
            path: '../../../public/fonts/Tanha-FD.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-tanha-fd',
    display: 'swap',
});
