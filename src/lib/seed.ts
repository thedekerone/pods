import { PrismaClient, ChartType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed Widgets Data
    const widgetData = [
        {
            name: 'Market Trends',
            description: 'Bar chart showing market trends over time',
            chartType: ChartType.BAR,
            data: {
                categories: ['2021', '2022', '2023'],
                series: [{ name: 'Sales', data: [100, 200, 300] }]
            }
        },
        {
            name: 'User Growth',
            description: 'Line chart representing user growth per month',
            chartType: ChartType.LINE,
            data: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr'],
                series: [{ name: 'Users', data: [1000, 1500, 1800, 2000] }]
            }
        },
        {
            name: 'Product Distribution',
            description: 'Pie chart showing product distribution in different regions',
            chartType: ChartType.PIE,
            data: {
                labels: ['North America', 'Europe', 'Asia'],
                values: [40, 30, 30]
            }
        }
    ];

    // Create Widgets and collect their IDs
    const widgetIds = [];
    for (const widget of widgetData) {
        const createdWidget = await prisma.widget.create({ data: widget });
        widgetIds.push(createdWidget.id);
    }

    // Seed Sources Data with reference to the created Widgets
    const sourcesData = [
        { name: 'Financial Times', url: 'https://www.ft.com', widgetId: widgetIds[0] },
        { name: 'Data World', url: 'https://data.world', widgetId: widgetIds[1] },
        { name: 'Statista', url: 'https://www.statista.com', widgetId: widgetIds[2] }
    ];

    // Seeding process for Sources
    for (const source of sourcesData) {
        await prisma.sources.createMany({
            data: {
                name: source.name,
                url: source.url,
                widgetId: source.widgetId!
            }
        });
    }
    await prisma.$disconnect();

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
