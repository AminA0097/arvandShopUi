import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Replace with your actual database query
        // const activeCount = await prisma.event.count({
        //     where: {
        //         endDate: { gt: new Date() }
        //     }
        // });

        // Mock count for now
        const activeCount = 4;

        return NextResponse.json({ activeCount });
    } catch (error) {
        console.error('Error fetching events count:', error);
        return NextResponse.json(
            { activeCount: 0, error: 'Failed to fetch count' },
            { status: 500 }
        );
    }
}